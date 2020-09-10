import {UI} from "../model/UI/UI";
import {SiteUtils} from "../utils/Utils";
import {SITES} from "../site/IFetishSite";
import {KonaChanUi} from "../model/UI/impl/KonaChanUi";

export module UIFactory {
    export function getUI(doc: Document): UI {
        switch (SiteUtils.getSite(doc)) {
            case SITES.KONACHAN:
            case SITES.LOLIBOORU:
                return new KonaChanUi(doc);
        }
    }
}