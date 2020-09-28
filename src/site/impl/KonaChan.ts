import {SITES} from "../IFetishSite";
import {MoeBooru} from "./MoeBooru";

export class KonaChan extends MoeBooru {

    protected allPages(): NodeListOf<HTMLAnchorElement> {
       return this.doc.querySelectorAll("#paginator a:not(.next_page):not(.previous_page)");
    }
    public get site(): SITES {
        return SITES.KONACHAN;
    }
}