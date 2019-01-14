(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("JSZip"), require("file-saver"));
	else if(typeof define === 'function' && define.amd)
		define(["JSZip", "file-saver"], factory);
	else if(typeof exports === 'object')
		exports["Fetish"] = factory(require("JSZip"), require("file-saver"));
	else
		root["Fetish"] = factory(root["JSZip"], root["file-saver"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_JSZip__, __WEBPACK_EXTERNAL_MODULE_file_saver__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/FetishImage.ts":
/*!****************************!*\
  !*** ./src/FetishImage.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! Utils */ "./src/Utils.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FetishImage {
        constructor(container) {
            this._res = container.res;
            this._title = container.title;
            this._url = container.url;
            this._isInit = false;
        }
        get res() {
            return this._res;
        }
        get url() {
            return this._url;
        }
        get title() {
            return this._title;
        }
        get isInit() {
            return this._isInit;
        }
        get image() {
            if (!this._isInit) {
                throw new Error("Image has not been loaded yet");
            }
            return this._actualImage;
        }
        loadImage() {
            if (this._isInit) {
                return Promise.resolve();
            }
            return Utils_1.AjaxUtils.loadXHR(this.url).then(image => {
                this._actualImage = image;
                this._isInit = true;
            });
        }
    }
    exports.FetishImage = FetishImage;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/Main.ts":
/*!*********************!*\
  !*** ./src/Main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! Parser */ "./src/Parser.ts"), __webpack_require__(/*! Utils */ "./src/Utils.ts"), __webpack_require__(/*! JSZip */ "JSZip")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Parser_1, Utils_1, JSZip) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Main {
        constructor() {
            throw new TypeError();
        }
        static doDownload() {
            let zip = new JSZip();
            for (let img of Main._images) {
                zip.file(img.title, img.image);
            }
            zip.generateAsync({ type: "blob" }).then(function (blob) {
                saveAs(blob, Utils_1.QueryString.tags + ".zip");
                Main.setLabel();
            });
        }
        static setLabel(str = "Download all your fetishes") {
            document.getElementById("fetishAnchor").innerText = str;
        }
        static init() {
            if (Main._isInit) {
                return;
            }
            buildUI();
            function buildUI() {
                function buildAnchor() {
                    let ulSideBar = document.getElementById("subnavbar");
                    let node = document.createElement("LI");
                    let textnode = document.createTextNode("");
                    let aTag = document.createElement("a");
                    aTag.id = "fetishAnchor";
                    aTag.appendChild(textnode);
                    aTag.href = "#";
                    node.appendChild(aTag);
                    ulSideBar.appendChild(node);
                }
                buildAnchor();
                Main.setLabel();
                let idDownloading = false;
                document.getElementById("fetishAnchor").addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
                    if (idDownloading) {
                        return;
                    }
                    if (Main._isInit) {
                        Main.doDownload();
                    }
                    else {
                        idDownloading = true;
                        Main.setLabel("Parsing pages... Please wait");
                        Main._images = Main._images.concat(Parser_1.Parser.parse(document.getElementById("post-list-posts")));
                        let allPages = document.querySelectorAll("#paginator a:not(.next_page)");
                        let arrOfPageA = Array.from(allPages);
                        let firstPage = arrOfPageA[0];
                        let lastPage = arrOfPageA[arrOfPageA.length - 1];
                        let firstPageNumber = Number.parseInt(firstPage.text);
                        let lastPageNumber = Number.parseInt(lastPage.text);
                        let rangeBetween = Utils_1.MathUtil.range(firstPageNumber, lastPageNumber);
                        let baseUrl = window.location.href;
                        let urls = [];
                        let currentPage = Utils_1.QueryString.page === undefined ? 1 : Utils_1.QueryString.page;
                        for (let i = 0; i < rangeBetween.length; i++) {
                            let num = String(rangeBetween[i]);
                            if (num == currentPage) {
                                continue;
                            }
                            let newUrl = Utils_1.AjaxUtils.addParameter(baseUrl, "page", num.toString(), true);
                            urls.push(newUrl);
                        }
                        function delay(ms) {
                            return __awaiter(this, void 0, void 0, function* () {
                                return new Promise((resolve) => {
                                    setTimeout(resolve, ms);
                                });
                            });
                        }
                        let count = 0;
                        for (let url of urls) {
                            count++;
                            const response = yield fetch(url);
                            const html = yield response.text();
                            let parser = new DOMParser();
                            let doc = parser.parseFromString(html, "text/html");
                            let d = doc.getElementById("post-list-posts");
                            Main._images = Main._images.concat(Parser_1.Parser.parse(d));
                            let percent = Math.floor(100 * count / urls.length);
                            Main.setLabel(`Parsing pages ${percent.toString()}% done`);
                        }
                        if (Main._images.length > 100) {
                            let f = confirm(`Warning, you are about to mass download ${Main._images.length} images, this can cause issues; your browser running out of memory, or konachan going down as Cloudflare might think this is a DOS attack. \nThere is no guarantee that all images will be downloaded without error, continue?`);
                            if (!f) {
                                Main.setLabel();
                                idDownloading = false;
                                return;
                            }
                        }
                        count = 0;
                        for (let im of Main._images) {
                            if (!im.isInit) {
                                count++;
                                yield delay(100);
                                yield im.loadImage();
                                let percent = Math.floor(100 * count / Main._images.length);
                                Main.setLabel(`Downloading images ${percent.toString()}% done (${count} out of ${Main._images.length} done)`);
                            }
                        }
                        Main.setLabel("compressing");
                        Main._isInit = true;
                        Main.doDownload();
                        idDownloading = false;
                    }
                }));
            }
        }
    }
    Main._isInit = false;
    Main._images = [];
    exports.Main = Main;
    Main.init();
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/Parser.ts":
/*!***********************!*\
  !*** ./src/Parser.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! FetishImage */ "./src/FetishImage.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, FetishImage_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Parser {
        static parse(postList) {
            let childrenLi = postList.childNodes;
            let retArr = [];
            for (let i = 0; i < childrenLi.length; i++) {
                let e = childrenLi[i];
                if (e.nodeType == Node.ELEMENT_NODE) {
                    let containerInfo = Parser._parseContainer(e);
                    retArr.push(new FetishImage_1.FetishImage(containerInfo));
                }
            }
            return retArr;
        }
        static _parseContainer(el) {
            let url;
            let res;
            let title;
            let tagForTitle = el.getElementsByClassName("inner")[0];
            let aNameTag = tagForTitle.firstChild;
            let infoTag = el.getElementsByClassName("directlink")[0];
            url = infoTag.href;
            res = infoTag.getElementsByClassName("directlink-res")[0].innerHTML;
            title = `${aNameTag.href.substr(aNameTag.href.lastIndexOf('/') + 1)}.${url.split(".").pop()}`;
            return {
                url: url,
                res: res,
                title: title
            };
        }
    }
    exports.Parser = Parser;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/Utils.ts":
/*!**********************!*\
  !*** ./src/Utils.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! file-saver */ "file-saver")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, FileSaver) {
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
        static addParameter(url, parameterName, parameterValue, atStart = false) {
            let replaceDuplicates = true;
            let urlhash;
            let cl;
            if (url.indexOf('#') > 0) {
                cl = url.indexOf('#');
                urlhash = url.substring(url.indexOf('#'), url.length);
            }
            else {
                urlhash = '';
                cl = url.length;
            }
            let sourceUrl = url.substring(0, cl);
            let urlParts = sourceUrl.split("?");
            let newQueryString = "";
            if (urlParts.length > 1) {
                let parameters = urlParts[1].split("&");
                for (let i = 0; (i < parameters.length); i++) {
                    let parameterParts = parameters[i].split("=");
                    if (!(replaceDuplicates && parameterParts[0] == parameterName)) {
                        if (newQueryString == "") {
                            newQueryString = "?";
                        }
                        else {
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
            }
            else {
                if (newQueryString !== "" && newQueryString != '?')
                    newQueryString += "&";
                newQueryString += parameterName + "=" + (parameterValue ? parameterValue : '');
            }
            return urlParts[0] + newQueryString + urlhash;
        }
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
    class MathUtil {
        static range(start, end) {
            // @ts-ignore
            return Array(end - start + 1).fill().map((_, idx) => start + idx);
        }
    }
    exports.MathUtil = MathUtil;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "JSZip":
/*!************************!*\
  !*** external "JSZip" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_JSZip__;

/***/ }),

/***/ "file-saver":
/*!*****************************!*\
  !*** external "file-saver" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_file_saver__;

/***/ })

/******/ });
});
//# sourceMappingURL=bundle.js.map