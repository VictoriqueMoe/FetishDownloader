import {AbstractUI} from "../AbstractUI";

export class KonaChanUi extends AbstractUI {
    private ulSideBar: HTMLUListElement = this.doc.getElementById("subnavbar") as HTMLUListElement;

    private createLi(): HTMLLIElement {
        let node: HTMLLIElement = this.doc.createElement("LI") as HTMLLIElement;
        this.ulSideBar.appendChild(node);
        return node;
    }

    public buildUI(): void {

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