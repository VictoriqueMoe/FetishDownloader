import * as FileSaver from "file-saver";
import {SITES} from "./IFetishSite";

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

    public static loadXHR(url: string): Promise<Blob> {
        return new Promise((resolve, reject) => {
            try {
                let xhr: XMLHttpRequest = new XMLHttpRequest();
                xhr.open("GET", url);
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

export module SiteUtils{
    export function getSite(doc: Document):SITES{
        let url = doc.location.hostname.split(".").shift();
        return EnumEx.loopBack(SITES, url);
    }
}