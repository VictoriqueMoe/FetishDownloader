import {IFetishPage} from "../model/IFetishPage";

export interface IFetishSite {
    readonly pages: Promise<IFetishPage[]>;
    readonly site:SITES;
}
export enum SITES{
    KONACHAN = "konachan",
    LOLIBOORU = "lolibooru"
}

