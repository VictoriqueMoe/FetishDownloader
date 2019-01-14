define(["require", "exports", "FetishImage"], function (require, exports, FetishImage_1) {
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
            title = aNameTag.href.substr(aNameTag.href.lastIndexOf('/') + 1);
            let infoTag = el.getElementsByClassName("directlink")[0];
            url = infoTag.href;
            res = infoTag.getElementsByClassName("directlink-res")[0].innerHTML;
            return {
                url: url,
                res: res,
                title: title
            };
        }
    }
    exports.Parser = Parser;
});
//# sourceMappingURL=Parser.js.map