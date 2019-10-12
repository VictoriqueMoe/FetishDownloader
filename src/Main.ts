import {FetishImage} from "FetishImage";
import {DomUtil, QueryString} from "Utils";
import * as JSZip from "JSZip";
import {FetishSiteFactory} from "./FetishSite";
import {UIFactory} from "./UI";
import * as Awesomplete from "Awesomplete";
import {Suggestion} from "awesomplete";
import "awesomplete/awesomplete.base.css";
import "awesomplete/awesomplete.css";
import "awesomplete/awesomplete.theme.css";
import {ImageLoader} from "./ImageLoader";
import "css/custom.css";

export module Main {
    let _isInit: boolean = false;
    let _images: FetishImage[] = [];
    type FilterObject = {
        excludeTags?: string[],
    };

    export function doDownloadZip(files: FetishImage[], title?: string): Promise<void> {
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

    export function init(): void {
        if (_isInit) {
            return;
        }
        buildUI();

        function buildUI(): void {
            function displayOptions(bool: boolean): void {
                let opParent = document.getElementById("fetishDownloadOptions").parentElement;
                opParent.style.display = bool ? "inline" : "none";
            }

            let uiMaker = UIFactory.getUI(document);
            uiMaker.createUI();
            setLabel();
            let idDownloading: boolean = false;
            let anchor = document.getElementById("fetishAnchor");
            anchor.addEventListener("click", async e => {
                if (idDownloading) {
                    return;
                }
                if (_isInit) {
                    doDownloadZip(_images);
                    return;
                }
                let options = document.getElementById("fetishDownloadOptions");
                displayOptions(false);
                idDownloading = true;
                setLabel("Parsing pages... Please wait");
                let site = FetishSiteFactory.getSite(window.document);
                let pages = await site.pages;
                for (let page of pages) {
                    _images = _images.concat(page.images);
                }

                setLabel(`Click to download ${_images.length} images`);
                let inEvent = false;

                let awComp: Awesomplete;

                function createOptionsModal(): void {
                    type Sections = "exclude";
                    let id = "fetishDownloadOptionsModal";
                    let modal = DomUtil.createModal({
                        id: id,
                        body: (function (): string {
                            let html: string = "";
                            html += '<label for="tagInput">Exclude tags: </label>';
                            html += '<input id="tagInput" />';
                            html += "<div class='filterOptionSection' data-type='exclude' id='excludeFilterSection'></div>";
                            return html;
                        }()),
                        title: "Download Options",
                        modalBodyStyle: {
                            "height": "500px",
                            "overflow": "auto"
                        },
                        footer: `<button class="button blackButton fetishOptionsConfirm apply">Apply</button>`
                    });
                    let exists = document.getElementById(id) !== null;
                    if (exists) {
                        document.getElementById(id).remove();
                    }
                    let el: HTMLElement = document.body;
                    el.insertAdjacentElement("beforeend", modal);
                    modal.getElementsByClassName("fetishOptionsConfirm")[0].addEventListener("click", evt => {
                        setLabel(`Click to download ${_images.length} images`);
                        let filters: FilterObject = {
                            excludeTags: []
                        };

                        // build filters
                        modal.querySelectorAll(".filterOptionSection").forEach(section => {
                            let el = section as HTMLElement;
                            let type: Sections = el.dataset.type as Sections;
                            switch (type) {
                                case "exclude":
                                    el.querySelectorAll(".badge").forEach(badge => {
                                        let badgeEl = badge as HTMLElement;
                                        let toExclude = badgeEl.dataset.value;
                                        filters.excludeTags.push(toExclude);
                                    });
                                    break;
                            }
                        });
                        _images = filter(filters, _images);
                    });
                }

                createOptionsModal();
                let hansBind = false;
                let downloadOptionsCallBack = () => {
                    DomUtil.openModal(document.getElementById("fetishDownloadOptionsModal"));
                    if (hansBind) {
                        return;
                    }
                    let tags: Set<string> = new Set();
                    for (let im of _images) {
                        for (let tag of im.tags) {
                            tags.add(tag);
                        }
                    }
                    let input = document.getElementById("tagInput");
                    awComp = new Awesomplete(input, {
                        list: [...tags],
                        replace: function (suggestion: Suggestion): void {
                            // @ts-ignore
                            this.input.value = "";
                        }
                    });
                    let tagSelect = (ev: Event) => {
                        let excludedTags: Set<string> = new Set();
                        // @ts-ignore
                        let applied: Suggestion = ev.text;
                        // @ts-ignore
                        let v: string = applied.value;
                        let tagArr = [...tags];
                        if (!tagArr.includes(v)) {
                            return;
                        }
                        let e = document.getElementById("excludeFilterSection");

                        let html = `<span class="badge" data-value="${v}">${v} <span class="optionDelete">&times;</span></span>`;
                        let createdHtml = DomUtil.createElementFromHTML(html);
                        createdHtml.querySelector(".optionDelete").addEventListener("click", e => {
                            (e.target as HTMLElement).parentElement.remove();
                        });
                        e.insertAdjacentElement("beforeend", createdHtml);
                    };
                    input.addEventListener("awesomplete-select", tagSelect);
                    hansBind = true;
                };

                let batchLimit = 250;
                options.addEventListener("click", downloadOptionsCallBack);
                displayOptions(true);
                let clickDownloadCallBack = async () => {
                    displayOptions(false);
                    if (inEvent) {
                        return;
                    }
                    try {
                        inEvent = true;
                        await ImageLoader.loadImages(_images, batchLimit);
                        if (ImageLoader.isBatch && ImageLoader.batch.length > 0) {
                            // download the rest of the batch
                            await doDownloadZip(ImageLoader.batch, "final");
                            // init is not true, as batches remove images as they are downloaded
                        } else {
                            await doDownloadZip(_images);
                            _isInit = true;
                        }
                    } finally {
                        anchor.removeEventListener("click", clickDownloadCallBack);
                        options.removeEventListener("click", downloadOptionsCallBack);
                        inEvent = false;
                        idDownloading = false;
                    }
                };
                anchor.addEventListener("click", clickDownloadCallBack);
            });
        }
    }

    function filter(filterObject: FilterObject, image: FetishImage[]): FetishImage[] {
        return [];
    }
}

Main.init();