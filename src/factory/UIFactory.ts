import {UI} from "../model/UI/UI";
import {SiteUtils} from "../utils/Utils";
import {SITES} from "../site/IFetishSite";
import {MoeBooruUi} from "../model/UI/impl/MoeBooruUi";

export module UIFactory {
    export function getUI(doc: Document): UI {
        switch (SiteUtils.getSite(doc)) {
            case SITES.KONACHAN:
            case SITES.LOLIBOORU:
            case SITES.YANDE:
                return new MoeBooruUi(doc);
        }
    }
}