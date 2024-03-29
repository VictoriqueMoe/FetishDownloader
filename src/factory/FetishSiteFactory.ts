import {IFetishSite, SITES} from "../site/IFetishSite";
import {SiteUtils} from "../utils/Utils";
import {KonaChan} from "../site/impl/KonaChan";
import {LoliBooru} from "../site/impl/LoliBooru";
import {Yande} from "../site/impl/Yande";

export module FetishSiteFactory {
    export function getSite(doc: Document): IFetishSite {
        switch (SiteUtils.getSite(doc)) {
            case SITES.KONACHAN:
                return new KonaChan(doc);
            case SITES.LOLIBOORU:
                return new LoliBooru(doc);
            case SITES.YANDE:
                return new Yande(doc);
        }
    }
}