define(["require", "exports", "Utils"], function (require, exports, Utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Image = /** @class */ (function () {
        function Image(container) {
            this._res = container.res;
            this._hasBiggerSize = container.hasBiggerSize;
            this._title = container.title;
            this._containerUrl = container.url;
            this._isInit = false;
        }
        Object.defineProperty(Image.prototype, "res", {
            get: function () {
                return this._res;
            },
            set: function (value) {
                this._res = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "containerUrl", {
            get: function () {
                return this._containerUrl;
            },
            set: function (value) {
                this._containerUrl = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "title", {
            get: function () {
                return this._title;
            },
            set: function (value) {
                this._title = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "hasBiggerSize", {
            get: function () {
                return this._hasBiggerSize;
            },
            set: function (value) {
                this._hasBiggerSize = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "isInit", {
            get: function () {
                return this._isInit;
            },
            set: function (value) {
                this._isInit = value;
            },
            enumerable: true,
            configurable: true
        });
        Image.prototype.loadImage = function () {
            var _this = this;
            return fetch(this._containerUrl).then(function (response) {
                return response.text();
            }).then(function (html) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, "text/html");
                var mainUrl;
                if (_this.hasBiggerSize) {
                    var mainImagetag = doc.querySelectorAll("#resized_notice a:first-child")[0];
                    mainUrl = mainImagetag.href;
                }
                else {
                    mainUrl = doc.getElementById("image").src;
                }
                return Utils_1.AjaxUtils.loadXHR(mainUrl).then(function (image) {
                    _this._actualImage = image;
                    _this.isInit = true;
                });
            }).catch(function (error) {
                alert("Unable to load image " + _this.title);
            });
        };
        return Image;
    }());
    exports.FetishImage = Image;
});
//# sourceMappingURL=Image.js.map