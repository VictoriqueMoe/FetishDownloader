import {IFetishPage} from "./IFetishPage";
import {IFetishDocumentParser} from "../parser/IFetishDocumentParser";
import {FetishImage} from "./impl/FetishImage";
import {SITES} from "../site/IFetishSite";
import {MoeBooruParser} from "../parser/impl/MoeBooruParser";

export class FetishPage implements IFetishPage {
    protected fetishDocumentParser: IFetishDocumentParser;
    private readonly doc: Document;
    private _imageCahce: FetishImage[] = [];

    public constructor(doc: Document, site: SITES) {
        switch (site) {
            case SITES.KONACHAN:
            case SITES.LOLIBOORU:
            case SITES.YANDE:
                this.fetishDocumentParser = new MoeBooruParser();
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