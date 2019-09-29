import {FetishImage} from "./FetishImage";

export interface IFetishSite {
    readonly pages: Promise<IFetishPage[]>;
    readonly site:SITES;
}

export interface IFetishPage {
    readonly images: FetishImage[];
}

export enum SITES{
    KONACHAN
}