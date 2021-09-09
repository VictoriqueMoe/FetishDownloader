import {FetishSite} from "./FetishSite";
import {IFetishPage} from "../model/IFetishPage";
import {Main} from "../Main";
import {FetishPage} from "../model/FetishPage";
import {AjaxUtils, MathUtil, QueryString} from "../utils/Utils";

export abstract class MoeBooru extends FetishSite {

    public get pages(): Promise<IFetishPage[]> {
        async function load(this: MoeBooru, urls: string[]): Promise<IFetishPage[]> {
            let count: number = 0;
            let arr: IFetishPage[] = [];

            let pArray = urls.map(url => {
                return fetch(url).then(async response => {
                    let text = response.text();
                    count++;
                    let percent: number = Math.floor(100 * count / urls.length);
                    Main.setLabel(`Parsing pages ${percent.toString()}% done`);
                    return text;
                });
            });
            return Promise.all(pArray).then(htmlArray => {
                for (let html of htmlArray) {
                    let domParser: DOMParser = new DOMParser();
                    let doc: Document = domParser.parseFromString(html, "text/html");
                    let fe = new FetishPage(doc, this.site);
                    arr.push(fe);
                }
                arr.push(new FetishPage(this.doc, this.site));
                return arr;
            });
        }

        let allPages: NodeListOf<HTMLAnchorElement> = this.allPages();
        let urls: Array<string> = [];
        if (allPages.length > 0) {
            let arrOfPageA: HTMLAnchorElement[] = Array.from(allPages);
            let firstPage: HTMLAnchorElement = arrOfPageA[0];
            let lastPage: HTMLAnchorElement = arrOfPageA[arrOfPageA.length - 1];
            let firstPageNumber: number = Number.parseInt(firstPage.text);
            let lastPageNumber: number = Number.parseInt(lastPage.text);
            let rangeBetween: Array<number> = MathUtil.range(firstPageNumber, lastPageNumber);
            let baseUrl: string = window.location.href;

            let currentPage: string = QueryString.page === undefined ? 1 : QueryString.page;
            for (let i: number = 0; i < rangeBetween.length; i++) {
                let num: string = String(rangeBetween[i]);
                if (num == currentPage) {
                    continue;
                }
                let newUrl: string = AjaxUtils.addParameter(baseUrl, "page", num.toString(), true);
                urls.push(newUrl);
            }
        }
        return load.call(this, urls);
    }

    protected defaultQuerySelector(): NodeListOf<HTMLAnchorElement> {
        return this.doc.querySelectorAll("#paginator a:not(.next_page):not(.previous_page)");
    }

}