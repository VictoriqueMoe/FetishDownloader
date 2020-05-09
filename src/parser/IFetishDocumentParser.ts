import {FetishImage} from "../model/impl/FetishImage";

export interface IFetishDocumentParser {

    /**
     * Get all the images out of this site
     * @param doc
     */
    parse(doc: HTMLDocument): FetishImage[];
}