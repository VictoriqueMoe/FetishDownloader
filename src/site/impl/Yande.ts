import {MoeBooru} from "../MoeBooru";
import {SITES} from "../IFetishSite";

export class Yande extends MoeBooru {
    protected allPages(): NodeListOf<HTMLAnchorElement> {
        return this.defaultQuerySelector();
    }

    get site(): SITES {
        return SITES.YANDE;
    }
}