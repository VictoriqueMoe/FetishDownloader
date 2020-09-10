import {IFetishPage} from "../../model/IFetishPage";
import {FetishPage} from "../../model/FetishPage";
import {AjaxUtils, delay, MathUtil, QueryString} from "../../utils/Utils";
import {SITES} from "../IFetishSite";
import {FetishSite} from "../FetishSite";
import {Main} from "../../Main";
import {MoeBooru} from "./MoeBooru";

export class KonaChan extends MoeBooru {

    protected allPages(): NodeListOf<HTMLAnchorElement> {
       return this.doc.querySelectorAll("#paginator a:not(.next_page):not(.previous_page)");
    }
    public get site(): SITES {
        return SITES.KONACHAN;
    }
}