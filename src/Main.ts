import {FetishImage} from "FetishImage";
import {QueryString} from "Utils";
import * as JSZip from "JSZip";
import {ImageContainerTyping} from "Typings";

export class Main {
    private static _isInit: boolean = false;
    private static _images: FetishImage[] = [];

    private constructor() {
        throw new TypeError();
    }

    private static doDownload(files: FetishImage[], title?: string): Promise<void> {
        Main.setLabel("compressing");
        let zip: JSZip = new JSZip();
        for (let img of files) {
            zip.file(img.title, img.image);
        }
        return zip.generateAsync({type: "blob"}).then(function (blob: Blob): void {
            if (!title) {
                title = QueryString.tags;
            } else {
                title = `${QueryString.tags} (${title})`;
            }
            saveAs(blob, title + ".zip");
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
            let idDownloading: boolean = false;
            document.getElementById("fetishAnchor").addEventListener("click", async e => {
                let tags: { [tag: string]: any } = QueryString.tags;
                fetch(`https://konachan.net/post.json?limit=10000000&tags=${tags}`).then(resp => {
                    return resp.json();
                }).then(json => {
                    // title = `${aNameTag.href.substr(aNameTag.href.lastIndexOf('/') + 1)}.${url.split(".").pop()}`;

                    for (let jsonObj of json) {
                        let url: string = jsonObj.jpeg_url;
                        let res:string = `${jsonObj.height}x${jsonObj.width}`;
                        let title:string = `${jsonObj.tags.split(" ").join("_")}.jpg`;
                        let info: ImageContainerTyping = {
                            url: url,
                            res: res,
                            title: title
                        };
                        Main._images.push(new FetishImage(info));
                    }
                    return Promise.all(Main._images.map(im => im.loadImage()));
                }).then(() => {
                    Main.doDownload(Main._images).then(() => {
                        alert("done");
                    });
                });
            });
        }
    }
}

Main.init();