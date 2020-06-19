import {SITES} from "../site/IFetishSite";
import "../css/modal.css";

export enum HTTP_METHOD {
    GET = "GET",
    POST = "POST",
    OPTIONS = "OPTIONS"
}

export let QueryString: { [key: string]: any } = (() => {
    if (typeof window == "undefined") {
        return {};
    }
    let query_string: { [key: string]: any } = {};
    let query: string = window.location.search.substring(1);
    let vars: Array<string> = query.split("&");
    for (let i: number = 0; i < vars.length; i++) {
        let pair: Array<string> = vars[i].split("=");
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = pair[1];
        } else if (typeof query_string[pair[0]] === "string") {
            query_string[pair[0]] = [query_string[pair[0]], pair[1]];
        } else {
            query_string[pair[0]].push(pair[1]);
        }
    }
    return query_string;
})();


export async function delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export class AjaxUtils {

    public static addParameter(url: string, parameterName: string, parameterValue: string, atStart: boolean = false): string {
        let replaceDuplicates: boolean = true;
        let urlhash: string;
        let cl: number;
        if (url.indexOf('#') > 0) {
            cl = url.indexOf('#');
            urlhash = url.substring(url.indexOf('#'), url.length);
        } else {
            urlhash = '';
            cl = url.length;
        }
        let sourceUrl: string = url.substring(0, cl);
        let urlParts: string[] = sourceUrl.split("?");
        let newQueryString: string = "";
        if (urlParts.length > 1) {
            let parameters: string[] = urlParts[1].split("&");
            for (let i: number = 0; (i < parameters.length); i++) {
                let parameterParts: string[] = parameters[i].split("=");
                if (!(replaceDuplicates && parameterParts[0] == parameterName)) {
                    if (newQueryString == "") {
                        newQueryString = "?";
                    } else {
                        newQueryString += "&";
                    }
                    newQueryString += parameterParts[0] + "=" + (parameterParts[1] ? parameterParts[1] : '');
                }
            }
        }
        if (newQueryString == "") {
            newQueryString = "?";
        }
        if (atStart) {
            newQueryString = '?' + parameterName + "=" + parameterValue + (newQueryString.length > 1 ? '&' + newQueryString.substring(1) : '');
        } else {
            if (newQueryString !== "" && newQueryString != '?')
                newQueryString += "&";
            newQueryString += parameterName + "=" + (parameterValue ? parameterValue : '');
        }
        return urlParts[0] + newQueryString + urlhash;
    }

    public static loadImage(url: string): Promise<Blob> {
        return new Promise((resolve, reject) => {
            try {
                let xhr: XMLHttpRequest = new XMLHttpRequest();
                xhr.open(HTTP_METHOD.GET, url);
                xhr.responseType = "blob";
                xhr.timeout = 20000;
                xhr.onerror = () => {
                    reject("Network error.");
                };
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        resolve(xhr.response);
                    } else {
                        reject("Loading error:" + xhr.statusText);
                    }
                };
                xhr.ontimeout = () => {
                    reject("Network error.");
                };
                xhr.send();
            } catch (err) {
                reject(err.message);
            }
        });
    }
}

class EnumEx {
    public static getNamesAndValues<T extends number>(e: any): Array<object> {
        return EnumEx.getNames(e).map(n => ({name: n, value: e[n] as T}));
    }

    /**
     * get the numValue associated with it's own key. if you want to get a TypeScript Enum based on an index you can use this
     * @param e
     * @param aName
     * @returns {string|null}
     */
    public static loopBack<T>(e: any, aName: any): T {
        let keyValuePair: Array<{ name: T, value: any }> = EnumEx.getNamesAndValues(e) as Array<{ name: T, value: any }>;
        for (let i: number = 0; i < keyValuePair.length; i++) {
            let obj: { name: T, value: any } = keyValuePair[i];
            if (obj.name === aName) {
                return obj.name;
            }
        }
        return null;
    }

    public static getNames(e: any): Array<string> {
        return EnumEx.getObjValues(e).filter(v => typeof v === "string") as string[];
    }

    private static getObjValues(e: any): Array<number | string> {
        return Object.keys(e).map(k => e[k]);
    }
}

export class MathUtil {
    public static range(start: number, end: number): Array<number> {
        // @ts-ignore
        return Array(end - start + 1).fill().map((_, idx) => start + idx);
    }
}

export module SiteUtils {
    export function getSite(doc: Document): SITES {
        let url = doc.location.hostname.split(".").shift();
        return EnumEx.loopBack(SITES, url);
    }
}

export class DomUtil {
    /**
     * Create a modal with the given options
     * @param options
     */
    public static createModal(options: ModalOptions): HTMLElement {
        function getStyle(styleObj: { [style: string]: string }): string {
            let styleStr = "";
            if (styleObj) {
                for (let key in styleObj) {
                    if (styleObj.hasOwnProperty(key)) {
                        styleStr += `${key}: ${styleObj[key]}; `;
                    }
                }
            }
            return styleStr;
        }

        let id = null;
        if (ObjectUtil.validString(options.id)) {
            id = options.id;
        } else {
            id = ObjectUtil.guid();
        }

        let bodyStyle = getStyle(options.modalContentStyle);
        let styleStr = getStyle(options.modalBodyStyle);
        let html = `<div class="FetishModal" id="${id}"> 
                        <div class="FSmodalContent" style="${bodyStyle}"> 
                            <div class="FSmodalHeader"> 
                                <span class="FSclose">&times;</span> 
                                <h5 class="FSmodalTitle">${options.title}</h5> 
                            </div> 
                            <div class="FSModalBody" style="${styleStr}">${options.body}</div>`;
        if (ObjectUtil.validString(options.footer)) {
            html += ` <div class="FSModalFooter"> 
                         ${options.footer} 
                       </div>`;
        }
        html += `</div></div>`;
        let modal = DomUtil.createElementFromHTML(html);
        window.onclick = (event: Event) => {
            if (event.target == modal) {
                DomUtil.closeModal(modal);
            }
        };
        DomUtil.offOn(DomUtil.bySelector(".FSclose", modal), "click", e => {
            DomUtil.closeModal(modal);
        });

        return modal;
    }

    private static bySelector(selector: string, el?: ParentNode): HTMLElement {
        if (el) {
            return el.querySelector(selector);
        }
        return document.querySelector(selector);
    }

    private static offOn(el: Element | string, event: string, callBack: (e?: Event) => void, fireImmediately: boolean = false): void {
        if (!el) {
            return;
        }
        let toTrigger: Element;
        if (el instanceof Element) {
            toTrigger = el;
        } else {
            toTrigger = document.querySelector(el);
        }
        if (!toTrigger) {
            return;
        }
        toTrigger = DomUtil.off(toTrigger);
        DomUtil.on(toTrigger, event, callBack, fireImmediately);
    }

    private static off(el: Element): Element {
        if (!el) {
            return;
        }
        let newEl: Node = el.cloneNode(false);
        while (el.hasChildNodes()) {
            newEl.appendChild(el.firstChild);
        }
        el.parentNode.replaceChild(newEl, el);
        return newEl as Element;
    }

    private static on(el: Element | string, event: string, callBack: (e?: Event) => void, fireImmediately: boolean = false): void {
        if (!el) {
            return;
        }
        let toTrigger: Element;
        if (el instanceof Element) {
            toTrigger = el;
        } else {
            toTrigger = document.querySelector(el);
        }
        if (!toTrigger) {
            return;
        }
        toTrigger.addEventListener(event, callBack);
        if (fireImmediately) {
            toTrigger.dispatchEvent(new Event(event));
        }
    }

    public static openModal(modal: HTMLElement): void {
        modal.style.display = "block";
    }

    public static createElementFromHTML(htmlString: string): HTMLElement {
        let div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild as HTMLElement;
    }

    public static closeModal(modal: HTMLElement): void {
        modal.style.display = "none";
    }
}

export type ModalOptions = {
    title: string,
    body: string,
    footer?: string,
    modalBodyStyle?: { [style: string]: string },
    modalContentStyle?: { [style: string]: string },
    id?: string
};

export class ObjectUtil {
    public static guid(): string {
        function s4(): string {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    public static validString(...strings: Array<unknown>): boolean {
        if (strings.length === 0) {
            return false;
        }
        for (let currString of strings) {
            if (typeof currString !== "string") {
                return false;
            }
            if (currString.length === 0) {
                return false;
            }
            if (currString.trim().length === 0) {
                return true;
            }
        }
        return true;
    }

    public static removeObjectFromArray(itemToRemove: any, arr: any[]): void {
        let arrLen = arr.length;
        while (arrLen--) {
            let currentItem: any = arr[arrLen];
            if (itemToRemove === currentItem) {
                arr.splice(arrLen, 1);
            }
        }
    }
}