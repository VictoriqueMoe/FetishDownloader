import {SiteUtils} from "./Utils";
import {SITES} from "./IFetishSite";

export interface UI {

    /**
     * Should create 2 elements with the id of:
     * fetishAnchor - this will be the thing clicked to kick off the download
     * fetishDownloadOptions - This will be used to call the Options for said download
     */
    createUI(): void;
}

export module UIFactory {
    export function getUI(doc: Document): UI {
        switch (SiteUtils.getSite(doc)) {
            case SITES.KONACHAN:
                return new KonaChanUi(doc);
        }
    }
}

abstract class AbstractUI implements UI {
    public constructor(protected readonly doc: Document) {
    }

    public abstract createUI(): void;
}

export class KonaChanUi extends AbstractUI {
    private ulSideBar: HTMLUListElement = this.doc.getElementById("subnavbar") as HTMLUListElement;

    private createLi(): HTMLLIElement {
        let node: HTMLLIElement = this.doc.createElement("LI") as HTMLLIElement;
        this.ulSideBar.appendChild(node);
        return node;
    }

    public createUI(): void {

        function makeDoDownload(this: KonaChanUi): void {
            let node: HTMLLIElement = this.createLi();
            let textnode: Text = this.doc.createTextNode("");
            let aTag: HTMLAnchorElement = this.doc.createElement("a");
            aTag.id = "fetishAnchor";
            aTag.appendChild(textnode);
            aTag.href = "#";
            node.appendChild(aTag);
        }

        function makeDownloadOptionsTag(this: KonaChanUi): void {
            let node: HTMLLIElement = this.createLi();
            node.style.display = "none";
            let textnode: Text = this.doc.createTextNode("Download Options");
            let aTag: HTMLAnchorElement = this.doc.createElement("a");
            aTag.id = "fetishDownloadOptions";
            aTag.appendChild(textnode);
            aTag.href = "#";
            aTag.innerText = "Download Options";
            node.appendChild(aTag);
        }

        makeDoDownload.call(this);
        makeDownloadOptionsTag.call(this);
    }

}