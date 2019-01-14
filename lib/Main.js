define(["require", "exports", "Parser"], function (require, exports, Parser_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Main {
        constructor() {
            throw new TypeError();
        }
        static init() {
            if (Main._isInit) {
                return;
            }
            buildUI();
            function buildUI() {
                function setLabel(str) {
                    document.getElementById("fetishAnchor").innerText = str;
                }
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
                setLabel("Initialise Fetish");
                document.getElementById("fetishAnchor").addEventListener("click", e => {
                    if (Main._isInit) {
                        // do the ZIP and download of all images
                    }
                    else {
                        Main._images = Main._images.concat(Parser_1.Parser.parse(document.getElementById("post-list-posts")));
                        console.log(Main._images);
                        let allPages = document.querySelectorAll("#paginator a:not(.next_page)");
                    }
                });
            }
        }
    }
    Main._isInit = false;
    Main._images = [];
    exports.Main = Main;
    Main.init();
});
//# sourceMappingURL=Main.js.map