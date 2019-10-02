import {IFetishPage, IFetishSite, SITES} from "./IFetishSite";
import {FetishImage} from "./FetishImage";
import {IFetishDocumentParser} from "./IFetishDocumentParser";
import {AjaxUtils, MathUtil, QueryString, SiteUtils} from "./Utils";
import {Main} from "./Main";
import {KonachanParser} from "./FetishDocumentParser";

abstract class FetishSite implements IFetishSite {

    public constructor(protected doc: Document) {
    }

    public abstract get pages(): Promise<IFetishPage[]>;

    public abstract get site(): SITES;
}

class KonaChan extends FetishSite {

    public get pages(): Promise<IFetishPage[]> {
        async function load(this: KonaChan, urls: string[]): Promise<IFetishPage[]> {
            let count: number = 0;
            let arr: IFetishPage[] = [];
            for (let url of urls) {
                let response = await fetch(url);
                let html = await response.text();
                count++;
                let domParser: DOMParser = new DOMParser();
                let doc: Document = domParser.parseFromString(html, "text/html");
                let fe = new FetishPage(doc, this.site);
                let percent: number = Math.floor(100 * count / urls.length);
                Main.setLabel(`Parsing pages ${percent.toString()}% done`);
                arr.push(fe);
            }
            arr.push(new FetishPage(this.doc, this.site));
            return arr;
        }

        let allPages: NodeListOf<HTMLAnchorElement> = this.doc.querySelectorAll("#paginator a:not(.next_page):not(.previous_page)");
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

    public get site(): SITES {
        return SITES.KONACHAN;
    }
}


class FetishPage implements IFetishPage {
    protected fetishDocumentParser: IFetishDocumentParser;
    private readonly doc: Document;
    private _imageCahce: FetishImage[] = [];

    public constructor(doc: Document, site: SITES) {
        switch (site) {
            case SITES.KONACHAN:
                this.fetishDocumentParser = new KonachanParser();
                break;
        }
        this.doc = doc;
    }

    public get images(): FetishImage[] {
        if (this._imageCahce.length === 0) {
            this._imageCahce = this.fetishDocumentParser.parse(this.doc);
            return this._imageCahce;
        }
        return this._imageCahce;
    }
}

export module FetishSiteFactory {
    export function getSite(doc: Document): IFetishSite {
        switch (SiteUtils.getSite(doc)) {
            case SITES.KONACHAN:
                return new KonaChan(doc);
        }
    }
}