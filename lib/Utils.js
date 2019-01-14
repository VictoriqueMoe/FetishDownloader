define(["require", "exports", "file-saver"], function (require, exports, FileSaver) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HTTP_METHOD;
    (function (HTTP_METHOD) {
        HTTP_METHOD["GET"] = "GET";
        HTTP_METHOD["POST"] = "POST";
        HTTP_METHOD["OPTIONS"] = "OPTIONS";
    })(HTTP_METHOD = exports.HTTP_METHOD || (exports.HTTP_METHOD = {}));
    exports.QueryString = (() => {
        if (typeof window == "undefined") {
            return {};
        }
        let query_string = {};
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = pair[1];
            }
            else if (typeof query_string[pair[0]] === "string") {
                query_string[pair[0]] = [query_string[pair[0]], pair[1]];
            }
            else {
                query_string[pair[0]].push(pair[1]);
            }
        }
        return query_string;
    })();
    class AjaxUtils {
        static loadXHR(url) {
            return new Promise((resolve, reject) => {
                try {
                    let xhr = new XMLHttpRequest();
                    xhr.open("GET", url);
                    xhr.responseType = "blob";
                    xhr.onerror = () => {
                        reject("Network error.");
                    };
                    xhr.onload = () => {
                        if (xhr.status === 200) {
                            resolve(xhr.response);
                        }
                        else {
                            reject("Loading error:" + xhr.statusText);
                        }
                    };
                    xhr.send();
                }
                catch (err) {
                    reject(err.message);
                }
            });
        }
        static downloadViaJavaScript(url, data, fileName, mediaType, type) {
            return new Promise((resolve, reject) => {
                if (!type) {
                    type = HTTP_METHOD.POST;
                }
                //  let blob:Blob = await AjaxUtils.makeRequest(type, url, dataMap, null, "blob") as Blob;
                let xhr = new XMLHttpRequest();
                xhr.open(type, url);
                xhr.responseType = "blob";
                xhr.withCredentials = true;
                if (type === HTTP_METHOD.POST) {
                    xhr.setRequestHeader("Content-type", "application/json");
                }
                let hasError = false;
                xhr.onreadystatechange = () => {
                    let error = null;
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (hasError) {
                            if (xhr.response) {
                                error = xhr.response;
                            }
                            else {
                                error = "internal server error";
                            }
                            reject(error);
                        }
                        let fileName;
                        let contentDispositionHeader = xhr.getResponseHeader("Content-Disposition");
                        if (contentDispositionHeader && contentDispositionHeader.indexOf("filename") > -1) {
                            fileName = contentDispositionHeader.split("filename").pop();
                            fileName = fileName.replace("=", "");
                            fileName = fileName.trim();
                            fileName = fileName.replace(/"/g, "");
                        }
                        else {
                            fileName = "untitled.txt";
                        }
                        let blob = xhr.response;
                        FileSaver.saveAs(blob, fileName, true);
                        resolve();
                    }
                    else if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
                        if (xhr.status !== 200) {
                            xhr.responseType = "text";
                            hasError = true;
                        }
                    }
                };
                if (type === "POST") {
                    xhr.send(JSON.stringify(data));
                }
                else {
                    xhr.send();
                }
            });
        }
    }
    exports.AjaxUtils = AjaxUtils;
});
//# sourceMappingURL=Utils.js.map