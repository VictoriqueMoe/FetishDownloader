import {FetishImage} from "FetishImage";
import {Parser} from "Parser";
import {AjaxUtils, MathUtil, QueryString} from "Utils";
import * as JSZip from "JSZip";

export class Main {
    private static _isInit: boolean = false;
    private static _images: FetishImage[] = [];

    private constructor() {
        throw new TypeError();
    }

    private static doDownload(): void {
        let zip: JSZip = new JSZip();
        for (let img of Main._images) {
            zip.file(img.title, img.image);
        }
        zip.generateAsync({type: "blob"}).then(function (blob: Blob): void {
            saveAs(blob, QueryString.tags + ".zip");
            Main.setLabel();
        });
    }

    private static setLabel(str: string = "Download all your fetishes"): void {
        document.getElementById("fetishAnchor").innerText = str;
    }

    public static init(): void {
        if (Main._isInit) {
            return;
        }
        buildUI();

        function buildUI(): void {
            function buildAnchor(): void {
                let ulSideBar: HTMLUListElement = document.getElementById("subnavbar") as HTMLUListElement;
                let node: HTMLLIElement = document.createElement("LI") as HTMLLIElement;
                let textnode: Text = document.createTextNode("");
                let aTag: HTMLAnchorElement = document.createElement("a");
                aTag.id = "fetishAnchor";
                aTag.appendChild(textnode);
                aTag.href = "#";
                node.appendChild(aTag);
                ulSideBar.appendChild(node);
            }

            buildAnchor();
            Main.setLabel();
            let idDownloading:boolean = false;
            document.getElementById("fetishAnchor").addEventListener("click", async e => {
                if(idDownloading){
                    return;
                }
                if (Main._isInit) {
                    Main.doDownload();
                } else {
                    idDownloading = true;
                    Main.setLabel("Parsing pages... Please wait");
                    Main._images = Main._images.concat(Parser.parse(document.getElementById("post-list-posts") as HTMLUListElement));
                    let allPages: NodeListOf<HTMLAnchorElement> = document.querySelectorAll("#paginator a:not(.next_page)");
                    let arrOfPageA: HTMLAnchorElement[] = Array.from(allPages);

                    let firstPage: HTMLAnchorElement = arrOfPageA[0];
                    let lastPage: HTMLAnchorElement = arrOfPageA[arrOfPageA.length - 1];
                    let firstPageNumber: number = Number.parseInt(firstPage.text);
                    let lastPageNumber: number = Number.parseInt(lastPage.text);
                    let rangeBetween: Array<number> = MathUtil.range(firstPageNumber, lastPageNumber);
                    let baseUrl: string = window.location.href;
                    let urls: Array<string> = [];
                    let currentPage: string = QueryString.page === undefined ? 1 : QueryString.page;
                    for (let i: number = 0; i < rangeBetween.length; i++) {
                        let num: string = String(rangeBetween[i]);
                        if (num == currentPage) {
                            continue;
                        }
                        let newUrl: string = AjaxUtils.addParameter(baseUrl, "page", num.toString(), true);
                        urls.push(newUrl);
                    }

                    async function delay(ms: number): Promise<void> {
                        return new Promise((resolve) => {
                            setTimeout(resolve, ms);
                        });
                    }

                    let count:number = 0;
                    for (let url of urls) {
                        count++;
                        const response: Response = await fetch(url);
                        const html: string = await response.text();
                        let parser: DOMParser = new DOMParser();
                        let doc: Document = parser.parseFromString(html, "text/html");
                        let d: HTMLUListElement = doc.getElementById("post-list-posts") as HTMLUListElement;
                        Main._images = Main._images.concat(Parser.parse(d));
                        let percent:number = Math.floor(100 * count / urls.length);
                        Main.setLabel(`Parsing pages ${percent.toString()}% done`);
                    }
                    if(Main._images.length > 100){
                        let f:boolean = confirm(`Warning, you are about to mass download ${Main._images.length} images, this can cause issues; your browser running out of memory, or konachan going down as Cloudflare might think this is a DOS attack. \nThere is no guarantee that all images will be downloaded without error, continue?`);
                        if(!f){
                            Main.setLabel();
                            idDownloading = false;
                            return;
                        }
                    }
                    count= 0;
                    for (let im of Main._images) {
                        if (!im.isInit) {
                            count++;
                            await delay(100);
                            await im.loadImage();
                            let percent:number = Math.floor(100 * count / Main._images.length);
                            Main.setLabel(`Downloading images ${percent.toString()}% done (${count} out of ${Main._images.length} done)`);
                        }
                    }
                    Main.setLabel("compressing");
                    Main._isInit = true;
                    Main.doDownload();
                    idDownloading = false;
                }
            });
        }
    }
}

Main.init();