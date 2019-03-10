import {FetishImage} from "FetishImage";
import {ImageContainerTyping} from "Typings";

export class Parser {
    public static parse(postList: HTMLUListElement): FetishImage[] {
        let childrenLi: NodeListOf<HTMLLIElement> = postList.childNodes as NodeListOf<HTMLLIElement>;
        let retArr: FetishImage[] = [];
        for(let i:number = 0; i < childrenLi.length; i++){
            let e:HTMLLIElement = childrenLi[i];
            if (e.nodeType == Node.ELEMENT_NODE) {
                let containerInfo:ImageContainerTyping = Parser._parseContainer(e);
                retArr.push(new FetishImage(containerInfo));
            }
        }
        return retArr;
    }

    private static _parseContainer(el: HTMLLIElement): ImageContainerTyping {
        let url: string;
        let res: string;
        let title: string;

        let tagForTitle: HTMLDivElement = el.getElementsByClassName("inner")[0] as HTMLDivElement;
        let aNameTag: HTMLAnchorElement = tagForTitle.firstChild as HTMLAnchorElement;
        let infoTag: HTMLAnchorElement = el.getElementsByClassName("directlink")[0] as HTMLAnchorElement;

        url = infoTag.href;
        res = infoTag.getElementsByClassName("directlink-res")[0].innerHTML;
        title = `${aNameTag.href.substr(aNameTag.href.lastIndexOf('/') + 1)}.${url.split(".").pop()}`;
        return {
            url: url,
            res: res,
            title: title
        };
    }
}