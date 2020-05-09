import {IFetishSite, SITES} from "./IFetishSite";
import {IFetishPage} from "../model/IFetishPage";

export abstract class FetishSite implements IFetishSite {

    public constructor(protected doc: Document) {
    }

    public abstract get pages(): Promise<IFetishPage[]>;

    public abstract get site(): SITES;
}