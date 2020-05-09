import {IFetishSite, SITES} from "../site/IFetishSite";
import {SiteUtils} from "../utils/Utils";
import {KonaChan} from "../site/impl/KonaChan";

export module FetishSiteFactory {
    export function getSite(doc: Document): IFetishSite {
        switch (SiteUtils.getSite(doc)) {
            case SITES.KONACHAN:
                return new KonaChan(doc);
        }
    }
}