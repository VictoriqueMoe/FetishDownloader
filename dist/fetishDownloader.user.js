// ==UserScript==
// @name         Fetish Downloader
// @namespace    victorique.moe
// @version      0.1
// @description  Download all your lovely fetishes (no furries)
// @author       Victorique
// @match        https://konachan.net/post?*
// @grant        none
// @run-at       document-idle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js
// @icon         https://i.imgur.com/nx5ejHb.png
// @license      MIT
// ==/UserScript==
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
        unloadImage() {
            this._isInit = false;
            this._actualImage = null;
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
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! FetishImage */ "./src/FetishImage.ts"), __webpack_require__(/*! Utils */ "./src/Utils.ts"), __webpack_require__(/*! JSZip */ "JSZip")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, FetishImage_1, Utils_1, JSZip) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Main {
        constructor() {
            throw new TypeError();
        }
        static doDownload(files, title) {
            Main.setLabel("compressing");
            let zip = new JSZip();
            for (let img of files) {
                zip.file(img.title, img.image);
            }
            return zip.generateAsync({ type: "blob" }).then(function (blob) {
                if (!title) {
                    title = Utils_1.QueryString.tags;
                }
                else {
                    title = `${Utils_1.QueryString.tags} (${title})`;
                }
                saveAs(blob, title + ".zip");
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
                    let tags = Utils_1.QueryString.tags;
                    fetch(`https://konachan.net/post.json?limit=10000000&tags=${tags}`).then(resp => {
                        return resp.json();
                    }).then(json => {
                        // title = `${aNameTag.href.substr(aNameTag.href.lastIndexOf('/') + 1)}.${url.split(".").pop()}`;
                        for (let jsonObj of json) {
                            let url = jsonObj.jpeg_url;
                            let res = `${jsonObj.height}x${jsonObj.width}`;
                            let title = `${jsonObj.tags.split(" ").join("_")}.jpg`;
                            let info = {
                                url: url,
                                res: res,
                                title: title
                            };
                            Main._images.push(new FetishImage_1.FetishImage(info));
                        }
                        return Promise.all(Main._images.map(im => im.loadImage()));
                    }).then(() => {
                        Main.doDownload(Main._images).then(() => {
                            alert("done");
                        });
                    });
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