define(["require", "exports", "Utils"], function (require, exports, Utils_1) {
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
});
//# sourceMappingURL=FetishImage.js.map