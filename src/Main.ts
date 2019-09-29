import {FetishImage} from "FetishImage";
import {QueryString} from "Utils";
import * as JSZip from "JSZip";
import {FetishSiteFactory} from "./FetishSite";

export module Main {
    let _isInit: boolean = false;
    let _images: FetishImage[] = [];

    function doDownloadZip(files: FetishImage[], title?: string): Promise<void> {
        setLabel("compressing");
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
            setLabel();
        });
    }

    export function setLabel(str: string = "Download all your fetishes"): void {
        document.getElementById("fetishAnchor").innerText = str;
    }

    export function  init(): void {
        if (_isInit) {
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
            setLabel();
            let idDownloading: boolean = false;
            document.getElementById("fetishAnchor").addEventListener("click", async e => {
                if (idDownloading) {
                    return;
                }
                if (_isInit) {
                    doDownloadZip(_images);
                    return;
                }
                idDownloading = true;
                setLabel("Parsing pages... Please wait");
                let site = FetishSiteFactory.getSite(window.document);
                let pages = await site.pages;
                for(let page of pages){
                    _images = _images.concat(page.images);
                }
                async function delay(ms: number): Promise<void> {
                    return new Promise((resolve) => {
                        setTimeout(resolve, ms);
                    });
                }

                let batchLimit: number = 1000;

                async function doDownload(images: FetishImage[]): Promise<void> {
                    let failedImages: FetishImage[] = [];
                    for (let im of images) {
                        if (!im.isInit) {
                            try {
                                count++;
                                await delay(50);
                                await im.loadImage();
                                setLabel(`${count} out of ${images.length} done`);
                                if (isBatch) {
                                    batch.push(im);
                                    if (count % batchLimit === 0) {
                                        let rounded: number = Math.round(count / batchLimit) * batchLimit;
                                        let batchNum: string = rounded.toString()[0];
                                        let of: number = Math.floor(Math.round(images.length / batchLimit) * batchLimit);
                                        let ofStr: string = of.toString()[0];
                                        if (images.length % batchLimit !== 0 && images.length % batchLimit > batchLimit) {
                                            ofStr = String(parseInt(ofStr) + 1);
                                        }
                                        await doDownloadZip(batch, `${batchNum} of ${ofStr}`);
                                        for (let i: number = 0; i < batch.length; i++) {
                                            batch[i].unloadImage();
                                        }
                                        batch = [];
                                    }
                                }
                            } catch (e) {
                                failedImages.push(im);
                                await delay(4000);
                            }
                        }
                    }
                    if (failedImages.length > 0) {
                        count = 0;
                        setLabel("Re-retrying failed images...");
                        await doDownload(failedImages);
                        failedImages = [];
                    }
                }

                if (_images.length > 100) {
                    let f: boolean = confirm(`Warning, you are about to mass download ${_images.length} images, this can cause issues; your browser running out of memory, or konachan going down as Cloudflare might think this is a DOS attack. \nThere is no guarantee that all images will be downloaded without error, continue?`);
                    if (!f) {
                        setLabel();
                        idDownloading = false;
                        return;
                    }
                }
                let count = 0;
                let isBatch: boolean = _images.length > batchLimit;
                let batch: FetishImage[] = [];
                await doDownload(_images);
                if (isBatch && batch.length > 0) {
                    // download the rest of the batch
                    await doDownloadZip(batch, "final");
                    // inti is not true, as batches remove images as they are downloaded
                } else {
                    await doDownloadZip(_images);
                    _isInit = true;
                }
                idDownloading = false;
            });
        }
    }
}

Main.init();