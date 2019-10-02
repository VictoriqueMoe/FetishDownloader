import {FetishImage} from "./FetishImage";

export interface IFetishSite {
    readonly pages: Promise<IFetishPage[]>;
    readonly site:SITES;
}
export enum SITES{
    KONACHAN= "konachan",
}

export interface IFetishPage {
    readonly images: FetishImage[];
}