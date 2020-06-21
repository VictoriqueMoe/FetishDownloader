import {FetishImage} from "model/impl/FetishImage";
import {ImageContainerTyping} from "model/Typings";
import {IFetishDocumentParser} from "../IFetishDocumentParser";

export class KonachanParser implements IFetishDocumentParser {
    public parse(doc: HTMLDocument): FetishImage[] {
        let list = doc.getElementById("post-list-posts");
        if(list == null){
            return [];
        }
        let childrenLi: NodeListOf<HTMLLIElement> = list.childNodes as NodeListOf<HTMLLIElement>;
        let retArr: FetishImage[] = [];
        for (let i: number = 0; i < childrenLi.length; i++) {
            let e: HTMLLIElement = childrenLi[i];
            if (e.nodeType == Node.ELEMENT_NODE) {
                let containerInfo: ImageContainerTyping = KonachanParser._parseContainer(e);
                retArr.push(new FetishImage(containerInfo));
            }
        }
        return retArr;
    }

    private static _parseContainer(el: HTMLLIElement): ImageContainerTyping {
        let url: string;
        let res: string;
        let title: string;
        let tags: string[];

        let tagForTitle: HTMLDivElement = el.getElementsByClassName("inner")[0] as HTMLDivElement;
        let aNameTag: HTMLAnchorElement = tagForTitle.firstChild as HTMLAnchorElement;
        let infoTag: HTMLAnchorElement = el.getElementsByClassName("directlink")[0] as HTMLAnchorElement;
        let tagInfo = aNameTag.firstChild as HTMLImageElement;
        url = infoTag.href;
        res = infoTag.getElementsByClassName("directlink-res")[0].innerHTML;
        title = `${aNameTag.href.substr(aNameTag.href.lastIndexOf('/') + 1)}.${url.split(".").pop()}`;

        let tagInfoString = tagInfo.title;
        let strSplit = tagInfoString.split(" ");
        let slice = strSplit.slice(strSplit.indexOf("Tags:") + 1);
        if (slice.length === 0) {
            tags = [];
        } else {
            slice.splice(slice.indexOf(":") - 1);
            tags = slice;
        }
        return {
            url: url,
            res: res,
            title: title,
            tags: tags
        };
    }
}
