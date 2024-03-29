import {SITES} from "../IFetishSite";
import {MoeBooru} from "../MoeBooru";

export class KonaChan extends MoeBooru {

    protected allPages(): NodeListOf<HTMLAnchorElement> {
        return this.defaultQuerySelector();
    }

    public get site(): SITES {
        return SITES.KONACHAN;
    }
}