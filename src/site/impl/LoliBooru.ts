import {MoeBooru} from "../MoeBooru";
import {SITES} from "../IFetishSite";

export class LoliBooru extends MoeBooru{
    protected allPages(): NodeListOf<HTMLAnchorElement> {
         return this.doc.querySelectorAll("#paginator a:not(.nextPage):not(.previousPage)");
    }

    public get site(): SITES {
        return SITES.LOLIBOORU;
    }

}