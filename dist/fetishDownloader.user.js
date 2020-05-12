// ==UserScript==
// @name         Fetish Downloader
// @namespace    victorique.moe
// @version      2.0.0
// @description  Download all your lovely fetishes (no furries)
// @author       Victorique
// @match        https://konachan.net/post?*
// @match        https://konachan.com/post?*
// @grant        none
// @run-at       document-idle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js
// @icon         https://i.imgur.com/nx5ejHb.png
// @license      MIT
// ==/UserScript==
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("JSZip"));
	else if(typeof define === 'function' && define.amd)
		define(["JSZip"], factory);
	else if(typeof exports === 'object')
		exports["Fetish"] = factory(require("JSZip"));
	else
		root["Fetish"] = factory(root["JSZip"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_JSZip__) {
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

/***/ "./node_modules/Awesomplete/awesomplete.js":
/*!*************************************************!*\
  !*** ./node_modules/Awesomplete/awesomplete.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Simple, lightweight, usable local autocomplete library for modern browsers
 * Because there weren’t enough autocomplete scripts in the world? Because I’m completely insane and have NIH syndrome? Probably both. :P
 * @author Lea Verou http://leaverou.github.io/awesomplete
 * MIT license
 */

(function () {

var _ = function (input, o) {
	var me = this;

    // Keep track of number of instances for unique IDs
    _.count = (_.count || 0) + 1;
    this.count = _.count;

	// Setup

	this.isOpened = false;

	this.input = $(input);
	this.input.setAttribute("autocomplete", "off");
	this.input.setAttribute("aria-expanded", "false");
	this.input.setAttribute("aria-owns", "awesomplete_list_" + this.count);
	this.input.setAttribute("role", "combobox");

	// store constructor options in case we need to distinguish
	// between default and customized behavior later on
	this.options = o = o || {};

	configure(this, {
		minChars: 2,
		maxItems: 10,
		autoFirst: false,
		data: _.DATA,
		filter: _.FILTER_CONTAINS,
		sort: o.sort === false ? false : _.SORT_BYLENGTH,
		container: _.CONTAINER,
		item: _.ITEM,
		replace: _.REPLACE,
		tabSelect: false
	}, o);

	this.index = -1;

	// Create necessary elements

	this.container = this.container(input);

	this.ul = $.create("ul", {
		hidden: "hidden",
        role: "listbox",
        id: "awesomplete_list_" + this.count,
		inside: this.container
	});

	this.status = $.create("span", {
		className: "visually-hidden",
		role: "status",
		"aria-live": "assertive",
        "aria-atomic": true,
        inside: this.container,
        textContent: this.minChars != 0 ? ("Type " + this.minChars + " or more characters for results.") : "Begin typing for results."
	});

	// Bind events

	this._events = {
		input: {
			"input": this.evaluate.bind(this),
			"blur": this.close.bind(this, { reason: "blur" }),
			"keydown": function(evt) {
				var c = evt.keyCode;

				// If the dropdown `ul` is in view, then act on keydown for the following keys:
				// Enter / Esc / Up / Down
				if(me.opened) {
					if (c === 13 && me.selected) { // Enter
						evt.preventDefault();
						me.select(undefined, undefined, evt);
					}
					else if (c === 9 && me.selected && me.tabSelect) {
						me.select(undefined, undefined, evt);
					}
					else if (c === 27) { // Esc
						me.close({ reason: "esc" });
					}
					else if (c === 38 || c === 40) { // Down/Up arrow
						evt.preventDefault();
						me[c === 38? "previous" : "next"]();
					}
				}
			}
		},
		form: {
			"submit": this.close.bind(this, { reason: "submit" })
		},
		ul: {
			// Prevent the default mousedowm, which ensures the input is not blurred.
			// The actual selection will happen on click. This also ensures dragging the
			// cursor away from the list item will cancel the selection
			"mousedown": function(evt) {
				evt.preventDefault();
			},
			// The click event is fired even if the corresponding mousedown event has called preventDefault
			"click": function(evt) {
				var li = evt.target;

				if (li !== this) {

					while (li && !/li/i.test(li.nodeName)) {
						li = li.parentNode;
					}

					if (li && evt.button === 0) {  // Only select on left click
						evt.preventDefault();
						me.select(li, evt.target, evt);
					}
				}
			}
		}
	};

	$.bind(this.input, this._events.input);
	$.bind(this.input.form, this._events.form);
	$.bind(this.ul, this._events.ul);

	if (this.input.hasAttribute("list")) {
		this.list = "#" + this.input.getAttribute("list");
		this.input.removeAttribute("list");
	}
	else {
		this.list = this.input.getAttribute("data-list") || o.list || [];
	}

	_.all.push(this);
};

_.prototype = {
	set list(list) {
		if (Array.isArray(list)) {
			this._list = list;
		}
		else if (typeof list === "string" && list.indexOf(",") > -1) {
				this._list = list.split(/\s*,\s*/);
		}
		else { // Element or CSS selector
			list = $(list);

			if (list && list.children) {
				var items = [];
				slice.apply(list.children).forEach(function (el) {
					if (!el.disabled) {
						var text = el.textContent.trim();
						var value = el.value || text;
						var label = el.label || text;
						if (value !== "") {
							items.push({ label: label, value: value });
						}
					}
				});
				this._list = items;
			}
		}

		if (document.activeElement === this.input) {
			this.evaluate();
		}
	},

	get selected() {
		return this.index > -1;
	},

	get opened() {
		return this.isOpened;
	},

	close: function (o) {
		if (!this.opened) {
			return;
		}

		this.input.setAttribute("aria-expanded", "false");
		this.ul.setAttribute("hidden", "");
		this.isOpened = false;
		this.index = -1;

		this.status.setAttribute("hidden", "");

		$.fire(this.input, "awesomplete-close", o || {});
	},

	open: function () {
		this.input.setAttribute("aria-expanded", "true");
		this.ul.removeAttribute("hidden");
		this.isOpened = true;

		this.status.removeAttribute("hidden");

		if (this.autoFirst && this.index === -1) {
			this.goto(0);
		}

		$.fire(this.input, "awesomplete-open");
	},

	destroy: function() {
		//remove events from the input and its form
		$.unbind(this.input, this._events.input);
		$.unbind(this.input.form, this._events.form);

		// cleanup container if it was created by Awesomplete but leave it alone otherwise
		if (!this.options.container) {
			//move the input out of the awesomplete container and remove the container and its children
			var parentNode = this.container.parentNode;

			parentNode.insertBefore(this.input, this.container);
			parentNode.removeChild(this.container);
		}

		//remove autocomplete and aria-autocomplete attributes
		this.input.removeAttribute("autocomplete");
		this.input.removeAttribute("aria-autocomplete");

		//remove this awesomeplete instance from the global array of instances
		var indexOfAwesomplete = _.all.indexOf(this);

		if (indexOfAwesomplete !== -1) {
			_.all.splice(indexOfAwesomplete, 1);
		}
	},

	next: function () {
		var count = this.ul.children.length;
		this.goto(this.index < count - 1 ? this.index + 1 : (count ? 0 : -1) );
	},

	previous: function () {
		var count = this.ul.children.length;
		var pos = this.index - 1;

		this.goto(this.selected && pos !== -1 ? pos : count - 1);
	},

	// Should not be used, highlights specific item without any checks!
	goto: function (i) {
		var lis = this.ul.children;

		if (this.selected) {
			lis[this.index].setAttribute("aria-selected", "false");
		}

		this.index = i;

		if (i > -1 && lis.length > 0) {
			lis[i].setAttribute("aria-selected", "true");

			this.status.textContent = lis[i].textContent + ", list item " + (i + 1) + " of " + lis.length;

            this.input.setAttribute("aria-activedescendant", this.ul.id + "_item_" + this.index);

			// scroll to highlighted element in case parent's height is fixed
			this.ul.scrollTop = lis[i].offsetTop - this.ul.clientHeight + lis[i].clientHeight;

			$.fire(this.input, "awesomplete-highlight", {
				text: this.suggestions[this.index]
			});
		}
	},

	select: function (selected, origin, originalEvent) {
		if (selected) {
			this.index = $.siblingIndex(selected);
		} else {
			selected = this.ul.children[this.index];
		}

		if (selected) {
			var suggestion = this.suggestions[this.index];

			var allowed = $.fire(this.input, "awesomplete-select", {
				text: suggestion,
				origin: origin || selected,
				originalEvent: originalEvent
			});

			if (allowed) {
				this.replace(suggestion);
				this.close({ reason: "select" });
				$.fire(this.input, "awesomplete-selectcomplete", {
					text: suggestion,
					originalEvent: originalEvent
				});
			}
		}
	},

	evaluate: function() {
		var me = this;
		var value = this.input.value;

		if (value.length >= this.minChars && this._list && this._list.length > 0) {
			this.index = -1;
			// Populate list with options that match
			this.ul.innerHTML = "";

			this.suggestions = this._list
				.map(function(item) {
					return new Suggestion(me.data(item, value));
				})
				.filter(function(item) {
					return me.filter(item, value);
				});

			if (this.sort !== false) {
				this.suggestions = this.suggestions.sort(this.sort);
			}

			this.suggestions = this.suggestions.slice(0, this.maxItems);

			this.suggestions.forEach(function(text, index) {
					me.ul.appendChild(me.item(text, value, index));
				});

			if (this.ul.children.length === 0) {

                this.status.textContent = "No results found";

				this.close({ reason: "nomatches" });

			} else {
				this.open();

                this.status.textContent = this.ul.children.length + " results found";
			}
		}
		else {
			this.close({ reason: "nomatches" });

                this.status.textContent = "No results found";
		}
	}
};

// Static methods/properties

_.all = [];

_.FILTER_CONTAINS = function (text, input) {
	return RegExp($.regExpEscape(input.trim()), "i").test(text);
};

_.FILTER_STARTSWITH = function (text, input) {
	return RegExp("^" + $.regExpEscape(input.trim()), "i").test(text);
};

_.SORT_BYLENGTH = function (a, b) {
	if (a.length !== b.length) {
		return a.length - b.length;
	}

	return a < b? -1 : 1;
};

_.CONTAINER = function (input) {
	return $.create("div", {
		className: "awesomplete",
		around: input
	});
}

_.ITEM = function (text, input, item_id) {
	var html = input.trim() === "" ? text : text.replace(RegExp($.regExpEscape(input.trim()), "gi"), "<mark>$&</mark>");
	return $.create("li", {
		innerHTML: html,
		"role": "option",
		"aria-selected": "false",
		"id": "awesomplete_list_" + this.count + "_item_" + item_id
	});
};

_.REPLACE = function (text) {
	this.input.value = text.value;
};

_.DATA = function (item/*, input*/) { return item; };

// Private functions

function Suggestion(data) {
	var o = Array.isArray(data)
	  ? { label: data[0], value: data[1] }
	  : typeof data === "object" && "label" in data && "value" in data ? data : { label: data, value: data };

	this.label = o.label || o.value;
	this.value = o.value;
}
Object.defineProperty(Suggestion.prototype = Object.create(String.prototype), "length", {
	get: function() { return this.label.length; }
});
Suggestion.prototype.toString = Suggestion.prototype.valueOf = function () {
	return "" + this.label;
};

function configure(instance, properties, o) {
	for (var i in properties) {
		var initial = properties[i],
		    attrValue = instance.input.getAttribute("data-" + i.toLowerCase());

		if (typeof initial === "number") {
			instance[i] = parseInt(attrValue);
		}
		else if (initial === false) { // Boolean options must be false by default anyway
			instance[i] = attrValue !== null;
		}
		else if (initial instanceof Function) {
			instance[i] = null;
		}
		else {
			instance[i] = attrValue;
		}

		if (!instance[i] && instance[i] !== 0) {
			instance[i] = (i in o)? o[i] : initial;
		}
	}
}

// Helpers

var slice = Array.prototype.slice;

function $(expr, con) {
	return typeof expr === "string"? (con || document).querySelector(expr) : expr || null;
}

function $$(expr, con) {
	return slice.call((con || document).querySelectorAll(expr));
}

$.create = function(tag, o) {
	var element = document.createElement(tag);

	for (var i in o) {
		var val = o[i];

		if (i === "inside") {
			$(val).appendChild(element);
		}
		else if (i === "around") {
			var ref = $(val);
			ref.parentNode.insertBefore(element, ref);
			element.appendChild(ref);

			if (ref.getAttribute("autofocus") != null) {
				ref.focus();
			}
		}
		else if (i in element) {
			element[i] = val;
		}
		else {
			element.setAttribute(i, val);
		}
	}

	return element;
};

$.bind = function(element, o) {
	if (element) {
		for (var event in o) {
			var callback = o[event];

			event.split(/\s+/).forEach(function (event) {
				element.addEventListener(event, callback);
			});
		}
	}
};

$.unbind = function(element, o) {
	if (element) {
		for (var event in o) {
			var callback = o[event];

			event.split(/\s+/).forEach(function(event) {
				element.removeEventListener(event, callback);
			});
		}
	}
};

$.fire = function(target, type, properties) {
	var evt = document.createEvent("HTMLEvents");

	evt.initEvent(type, true, true );

	for (var j in properties) {
		evt[j] = properties[j];
	}

	return target.dispatchEvent(evt);
};

$.regExpEscape = function (s) {
	return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
};

$.siblingIndex = function (el) {
	/* eslint-disable no-cond-assign */
	for (var i = 0; el = el.previousElementSibling; i++);
	return i;
};

// Initialization

function init() {
	$$("input.awesomplete").forEach(function (input) {
		new _(input);
	});
}

// Make sure to export Awesomplete on self when in a browser
if (typeof self !== "undefined") {
	self.Awesomplete = _;
}

// Are we in a browser? Check for Document constructor
if (typeof Document !== "undefined") {
	// DOM already loaded?
	if (document.readyState !== "loading") {
		init();
	}
	else {
		// Wait for it
		document.addEventListener("DOMContentLoaded", init);
	}
}

_.$ = $;
_.$$ = $$;

// Expose Awesomplete as a CJS module
if ( true && module.exports) {
	module.exports = _;
}

return _;

}());


/***/ }),

/***/ "./node_modules/awesomplete/awesomplete.base.css":
/*!*******************************************************!*\
  !*** ./node_modules/awesomplete/awesomplete.base.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../css-loader/dist/cjs.js!./awesomplete.base.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/awesomplete/awesomplete.base.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./node_modules/awesomplete/awesomplete.css":
/*!**************************************************!*\
  !*** ./node_modules/awesomplete/awesomplete.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../css-loader/dist/cjs.js!./awesomplete.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/awesomplete/awesomplete.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./node_modules/awesomplete/awesomplete.theme.css":
/*!********************************************************!*\
  !*** ./node_modules/awesomplete/awesomplete.theme.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../css-loader/dist/cjs.js!./awesomplete.theme.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/awesomplete/awesomplete.theme.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/awesomplete/awesomplete.base.css":
/*!*********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/awesomplete/awesomplete.base.css ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".awesomplete [hidden] {\n    display: none;\n}\n\n.awesomplete .visually-hidden {\n    position: absolute;\n    clip: rect(0, 0, 0, 0);\n}\n\n.awesomplete {\n    display: inline-block;\n    position: relative;\n}\n\n.awesomplete > input {\n    display: block;\n}\n\n.awesomplete > ul {\n    position: absolute;\n    left: 0;\n    z-index: 1;\n    min-width: 100%;\n    box-sizing: border-box;\n    list-style: none;\n    padding: 0;\n    margin: 0;\n    background: #fff;\n}\n\n.awesomplete > ul:empty {\n    display: none;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/awesomplete/awesomplete.css":
/*!****************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/awesomplete/awesomplete.css ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".awesomplete [hidden] {\n    display: none;\n}\n\n.awesomplete .visually-hidden {\n    position: absolute;\n    clip: rect(0, 0, 0, 0);\n}\n\n.awesomplete {\n    display: inline-block;\n    position: relative;\n}\n\n.awesomplete > input {\n    display: block;\n}\n\n.awesomplete > ul {\n    position: absolute;\n    left: 0;\n    z-index: 1;\n    min-width: 100%;\n    box-sizing: border-box;\n    list-style: none;\n    padding: 0;\n    margin: 0;\n    background: #fff;\n}\n\n.awesomplete > ul:empty {\n    display: none;\n}\n\n.awesomplete > ul {\n\tborder-radius: .3em;\n\tmargin: .2em 0 0;\n\tbackground: hsla(0,0%,100%,.9);\n\tbackground: linear-gradient(to bottom right, white, hsla(0,0%,100%,.8));\n\tborder: 1px solid rgba(0,0,0,.3);\n\tbox-shadow: .05em .2em .6em rgba(0,0,0,.2);\n\ttext-shadow: none;\n}\n\n@supports (transform: scale(0)) {\n\t.awesomplete > ul {\n\t\ttransition: .3s cubic-bezier(.4,.2,.5,1.4);\n\t\ttransform-origin: 1.43em -.43em;\n\t}\n\t\n\t.awesomplete > ul[hidden],\n\t.awesomplete > ul:empty {\n\t\topacity: 0;\n\t\ttransform: scale(0);\n\t\tdisplay: block;\n\t\ttransition-timing-function: ease;\n\t}\n}\n\n\t/* Pointer */\n\t.awesomplete > ul:before {\n\t\tcontent: \"\";\n\t\tposition: absolute;\n\t\ttop: -.43em;\n\t\tleft: 1em;\n\t\twidth: 0; height: 0;\n\t\tpadding: .4em;\n\t\tbackground: white;\n\t\tborder: inherit;\n\t\tborder-right: 0;\n\t\tborder-bottom: 0;\n\t\t-webkit-transform: rotate(45deg);\n\t\ttransform: rotate(45deg);\n\t}\n\n\t.awesomplete > ul > li {\n\t\tposition: relative;\n\t\tpadding: .2em .5em;\n\t\tcursor: pointer;\n\t}\n\t\n\t.awesomplete > ul > li:hover {\n\t\tbackground: hsl(200, 40%, 80%);\n\t\tcolor: black;\n\t}\n\t\n\t.awesomplete > ul > li[aria-selected=\"true\"] {\n\t\tbackground: hsl(205, 40%, 40%);\n\t\tcolor: white;\n\t}\n\t\n\t\t.awesomplete mark {\n\t\t\tbackground: hsl(65, 100%, 50%);\n\t\t}\n\t\t\n\t\t.awesomplete li:hover mark {\n\t\t\tbackground: hsl(68, 100%, 41%);\n\t\t}\n\t\t\n\t\t.awesomplete li[aria-selected=\"true\"] mark {\n\t\t\tbackground: hsl(86, 100%, 21%);\n\t\t\tcolor: inherit;\n\t\t}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/awesomplete/awesomplete.theme.css":
/*!**********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/awesomplete/awesomplete.theme.css ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".awesomplete > ul {\n\tborder-radius: .3em;\n\tmargin: .2em 0 0;\n\tbackground: hsla(0,0%,100%,.9);\n\tbackground: linear-gradient(to bottom right, white, hsla(0,0%,100%,.8));\n\tborder: 1px solid rgba(0,0,0,.3);\n\tbox-shadow: .05em .2em .6em rgba(0,0,0,.2);\n\ttext-shadow: none;\n}\n\n@supports (transform: scale(0)) {\n\t.awesomplete > ul {\n\t\ttransition: .3s cubic-bezier(.4,.2,.5,1.4);\n\t\ttransform-origin: 1.43em -.43em;\n\t}\n\t\n\t.awesomplete > ul[hidden],\n\t.awesomplete > ul:empty {\n\t\topacity: 0;\n\t\ttransform: scale(0);\n\t\tdisplay: block;\n\t\ttransition-timing-function: ease;\n\t}\n}\n\n\t/* Pointer */\n\t.awesomplete > ul:before {\n\t\tcontent: \"\";\n\t\tposition: absolute;\n\t\ttop: -.43em;\n\t\tleft: 1em;\n\t\twidth: 0; height: 0;\n\t\tpadding: .4em;\n\t\tbackground: white;\n\t\tborder: inherit;\n\t\tborder-right: 0;\n\t\tborder-bottom: 0;\n\t\t-webkit-transform: rotate(45deg);\n\t\ttransform: rotate(45deg);\n\t}\n\n\t.awesomplete > ul > li {\n\t\tposition: relative;\n\t\tpadding: .2em .5em;\n\t\tcursor: pointer;\n\t}\n\t\n\t.awesomplete > ul > li:hover {\n\t\tbackground: hsl(200, 40%, 80%);\n\t\tcolor: black;\n\t}\n\t\n\t.awesomplete > ul > li[aria-selected=\"true\"] {\n\t\tbackground: hsl(205, 40%, 40%);\n\t\tcolor: white;\n\t}\n\t\n\t\t.awesomplete mark {\n\t\t\tbackground: hsl(65, 100%, 50%);\n\t\t}\n\t\t\n\t\t.awesomplete li:hover mark {\n\t\t\tbackground: hsl(68, 100%, 41%);\n\t\t}\n\t\t\n\t\t.awesomplete li[aria-selected=\"true\"] mark {\n\t\t\tbackground: hsl(86, 100%, 21%);\n\t\t\tcolor: inherit;\n\t\t}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/custom.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/custom.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".badge {\r\n    display: inline-block;\r\n    min-width: 1em;\r\n    padding: .3em;\r\n    text-align: center;\r\n    background: #1779ba;\r\n    color: #fefefe;\r\n}\r\n\r\n.badge:not(:first-child) {\r\n    margin-left: 15px;\r\n}\r\n\r\n#excludeFilterSection{\r\n    margin-top: 10px;\r\n}\r\n\r\n.optionDelete{\r\n    cursor: pointer;\r\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/modal.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/modal.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".FetishModal {\r\n    display: none; /* Hidden by default */\r\n    position: fixed; /* Stay in place */\r\n    z-index: 9999; /* Sit on top */\r\n    padding-top: 100px; /* Location of the box */\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%; /* Full width */\r\n    height: 100%; /* Full height */\r\n    overflow: auto; /* Enable scroll if needed */\r\n    background-color: rgb(0, 0, 0); /* Fallback color */\r\n    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */\r\n}\r\n\r\n.FetishModal div, .FetishModal h1, .FetishModal h2, .FetishModal h3, .FetishModal h4, .FetishModal h5, .FetishModal h6, .FetishModal p, .FetishModal ul, .FetishModal li, .FetishModal dd, .FetishModal dt {\r\n    color: #8f412c !important;\r\n}\r\n\r\n.FSmodalContent {\r\n    position: relative;\r\n    background-color: #141414;\r\n    color: #ffffff !important;\r\n    margin: auto;\r\n    padding: 0;\r\n    border: 1px solid #888;\r\n    width: 80%;\r\n    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\r\n    -webkit-animation-name: animatetop;\r\n    -webkit-animation-duration: 0.4s;\r\n    animation-name: animatetop;\r\n    animation-duration: 0.4s\r\n}\r\n\r\n\r\n.button {\r\n    background-color: #4CAF50; /* Green */\r\n    border: none;\r\n    color: white;\r\n    padding: 7px 21px;\r\n    text-align: center;\r\n    text-decoration: none;\r\n    display: inline-block;\r\n    font-size: 16px;\r\n    margin: 4px 2px;\r\n    -webkit-transition-duration: 0.4s; /* Safari */\r\n    transition-duration: 0.4s;\r\n    cursor: pointer;\r\n}\r\n\r\n.blackButton {\r\n    background-color: #141414;\r\n    color: white;\r\n    border: 2px solid #555555;\r\n}\r\n\r\n.blackButton:hover {\r\n    background-color: #555555;\r\n    color: white;\r\n}\r\n\r\n/* Add Animation */\r\n@-webkit-keyframes animatetop {\r\n    from {\r\n        top: -300px;\r\n        opacity: 0\r\n    }\r\n    to {\r\n        top: 0;\r\n        opacity: 1\r\n    }\r\n}\r\n\r\n@keyframes animatetop {\r\n    from {\r\n        top: -300px;\r\n        opacity: 0\r\n    }\r\n    to {\r\n        top: 0;\r\n        opacity: 1\r\n    }\r\n}\r\n\r\n/* The Close Button */\r\n.FSclose {\r\n    float: right;\r\n    font-size: 28px;\r\n    font-weight: bold;\r\n    margin-bottom: 1rem;\r\n}\r\n\r\n.FSclose:hover,\r\n.FSclose:focus {\r\n    color: #8f412c6e;\r\n    text-decoration: none;\r\n    cursor: pointer;\r\n}\r\n\r\n.FSmodalHeader {\r\n    padding: 0.5rem;\r\n    color: #8f412c;\r\n}\r\n\r\n.FSModalBody {\r\n    padding: 1rem;\r\n}\r\n\r\n.FSModalFooter {\r\n    color: white;\r\n    display: flex;\r\n    justify-content: flex-end;\r\n    padding: 0.5rem;\r\n    border-top: 1px solid #333232;\r\n\r\n}\r\n\r\n.FSmodalTitle {\r\n    margin-left: 1rem;\r\n}\r\n\r\n.awesomplete > ul {\r\n    color: #ff0000;\r\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/js-sha256/src/sha256.js":
/*!**********************************************!*\
  !*** ./node_modules/js-sha256/src/sha256.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.9.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
/*jslint bitwise: true */
(function () {
  'use strict';

  var ERROR = 'input is invalid type';
  var WINDOW = typeof window === 'object';
  var root = WINDOW ? window : {};
  if (root.JS_SHA256_NO_WINDOW) {
    WINDOW = false;
  }
  var WEB_WORKER = !WINDOW && typeof self === 'object';
  var NODE_JS = !root.JS_SHA256_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }
  var COMMON_JS = !root.JS_SHA256_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD =  true && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js");
  var ARRAY_BUFFER = !root.JS_SHA256_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var EXTRA = [-2147483648, 8388608, 32768, 128];
  var SHIFT = [24, 16, 8, 0];
  var K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];
  var OUTPUT_TYPES = ['hex', 'array', 'digest', 'arrayBuffer'];

  var blocks = [];

  if (root.JS_SHA256_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  if (ARRAY_BUFFER && (root.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
    ArrayBuffer.isView = function (obj) {
      return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
  }

  var createOutputMethod = function (outputType, is224) {
    return function (message) {
      return new Sha256(is224, true).update(message)[outputType]();
    };
  };

  var createMethod = function (is224) {
    var method = createOutputMethod('hex', is224);
    if (NODE_JS) {
      method = nodeWrap(method, is224);
    }
    method.create = function () {
      return new Sha256(is224);
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createOutputMethod(type, is224);
    }
    return method;
  };

  var nodeWrap = function (method, is224) {
    var crypto = eval("require('crypto')");
    var Buffer = eval("require('buffer').Buffer");
    var algorithm = is224 ? 'sha224' : 'sha256';
    var nodeMethod = function (message) {
      if (typeof message === 'string') {
        return crypto.createHash(algorithm).update(message, 'utf8').digest('hex');
      } else {
        if (message === null || message === undefined) {
          throw new Error(ERROR);
        } else if (message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        }
      }
      if (Array.isArray(message) || ArrayBuffer.isView(message) ||
        message.constructor === Buffer) {
        return crypto.createHash(algorithm).update(new Buffer(message)).digest('hex');
      } else {
        return method(message);
      }
    };
    return nodeMethod;
  };

  var createHmacOutputMethod = function (outputType, is224) {
    return function (key, message) {
      return new HmacSha256(key, is224, true).update(message)[outputType]();
    };
  };

  var createHmacMethod = function (is224) {
    var method = createHmacOutputMethod('hex', is224);
    method.create = function (key) {
      return new HmacSha256(key, is224);
    };
    method.update = function (key, message) {
      return method.create(key).update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createHmacOutputMethod(type, is224);
    }
    return method;
  };

  function Sha256(is224, sharedMemory) {
    if (sharedMemory) {
      blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] =
        blocks[4] = blocks[5] = blocks[6] = blocks[7] =
        blocks[8] = blocks[9] = blocks[10] = blocks[11] =
        blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      this.blocks = blocks;
    } else {
      this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    if (is224) {
      this.h0 = 0xc1059ed8;
      this.h1 = 0x367cd507;
      this.h2 = 0x3070dd17;
      this.h3 = 0xf70e5939;
      this.h4 = 0xffc00b31;
      this.h5 = 0x68581511;
      this.h6 = 0x64f98fa7;
      this.h7 = 0xbefa4fa4;
    } else { // 256
      this.h0 = 0x6a09e667;
      this.h1 = 0xbb67ae85;
      this.h2 = 0x3c6ef372;
      this.h3 = 0xa54ff53a;
      this.h4 = 0x510e527f;
      this.h5 = 0x9b05688c;
      this.h6 = 0x1f83d9ab;
      this.h7 = 0x5be0cd19;
    }

    this.block = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = false;
    this.first = true;
    this.is224 = is224;
  }

  Sha256.prototype.update = function (message) {
    if (this.finalized) {
      return;
    }
    var notString, type = typeof message;
    if (type !== 'string') {
      if (type === 'object') {
        if (message === null) {
          throw new Error(ERROR);
        } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        } else if (!Array.isArray(message)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
            throw new Error(ERROR);
          }
        }
      } else {
        throw new Error(ERROR);
      }
      notString = true;
    }
    var code, index = 0, i, length = message.length, blocks = this.blocks;

    while (index < length) {
      if (this.hashed) {
        this.hashed = false;
        blocks[0] = this.block;
        blocks[16] = blocks[1] = blocks[2] = blocks[3] =
          blocks[4] = blocks[5] = blocks[6] = blocks[7] =
          blocks[8] = blocks[9] = blocks[10] = blocks[11] =
          blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      }

      if (notString) {
        for (i = this.start; index < length && i < 64; ++index) {
          blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
        }
      } else {
        for (i = this.start; index < length && i < 64; ++index) {
          code = message.charCodeAt(index);
          if (code < 0x80) {
            blocks[i >> 2] |= code << SHIFT[i++ & 3];
          } else if (code < 0x800) {
            blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else if (code < 0xd800 || code >= 0xe000) {
            blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else {
            code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
            blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          }
        }
      }

      this.lastByteIndex = i;
      this.bytes += i - this.start;
      if (i >= 64) {
        this.block = blocks[16];
        this.start = i - 64;
        this.hash();
        this.hashed = true;
      } else {
        this.start = i;
      }
    }
    if (this.bytes > 4294967295) {
      this.hBytes += this.bytes / 4294967296 << 0;
      this.bytes = this.bytes % 4294967296;
    }
    return this;
  };

  Sha256.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    var blocks = this.blocks, i = this.lastByteIndex;
    blocks[16] = this.block;
    blocks[i >> 2] |= EXTRA[i & 3];
    this.block = blocks[16];
    if (i >= 56) {
      if (!this.hashed) {
        this.hash();
      }
      blocks[0] = this.block;
      blocks[16] = blocks[1] = blocks[2] = blocks[3] =
        blocks[4] = blocks[5] = blocks[6] = blocks[7] =
        blocks[8] = blocks[9] = blocks[10] = blocks[11] =
        blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
    }
    blocks[14] = this.hBytes << 3 | this.bytes >>> 29;
    blocks[15] = this.bytes << 3;
    this.hash();
  };

  Sha256.prototype.hash = function () {
    var a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4, f = this.h5, g = this.h6,
      h = this.h7, blocks = this.blocks, j, s0, s1, maj, t1, t2, ch, ab, da, cd, bc;

    for (j = 16; j < 64; ++j) {
      // rightrotate
      t1 = blocks[j - 15];
      s0 = ((t1 >>> 7) | (t1 << 25)) ^ ((t1 >>> 18) | (t1 << 14)) ^ (t1 >>> 3);
      t1 = blocks[j - 2];
      s1 = ((t1 >>> 17) | (t1 << 15)) ^ ((t1 >>> 19) | (t1 << 13)) ^ (t1 >>> 10);
      blocks[j] = blocks[j - 16] + s0 + blocks[j - 7] + s1 << 0;
    }

    bc = b & c;
    for (j = 0; j < 64; j += 4) {
      if (this.first) {
        if (this.is224) {
          ab = 300032;
          t1 = blocks[0] - 1413257819;
          h = t1 - 150054599 << 0;
          d = t1 + 24177077 << 0;
        } else {
          ab = 704751109;
          t1 = blocks[0] - 210244248;
          h = t1 - 1521486534 << 0;
          d = t1 + 143694565 << 0;
        }
        this.first = false;
      } else {
        s0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
        s1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
        ab = a & b;
        maj = ab ^ (a & c) ^ bc;
        ch = (e & f) ^ (~e & g);
        t1 = h + s1 + ch + K[j] + blocks[j];
        t2 = s0 + maj;
        h = d + t1 << 0;
        d = t1 + t2 << 0;
      }
      s0 = ((d >>> 2) | (d << 30)) ^ ((d >>> 13) | (d << 19)) ^ ((d >>> 22) | (d << 10));
      s1 = ((h >>> 6) | (h << 26)) ^ ((h >>> 11) | (h << 21)) ^ ((h >>> 25) | (h << 7));
      da = d & a;
      maj = da ^ (d & b) ^ ab;
      ch = (h & e) ^ (~h & f);
      t1 = g + s1 + ch + K[j + 1] + blocks[j + 1];
      t2 = s0 + maj;
      g = c + t1 << 0;
      c = t1 + t2 << 0;
      s0 = ((c >>> 2) | (c << 30)) ^ ((c >>> 13) | (c << 19)) ^ ((c >>> 22) | (c << 10));
      s1 = ((g >>> 6) | (g << 26)) ^ ((g >>> 11) | (g << 21)) ^ ((g >>> 25) | (g << 7));
      cd = c & d;
      maj = cd ^ (c & a) ^ da;
      ch = (g & h) ^ (~g & e);
      t1 = f + s1 + ch + K[j + 2] + blocks[j + 2];
      t2 = s0 + maj;
      f = b + t1 << 0;
      b = t1 + t2 << 0;
      s0 = ((b >>> 2) | (b << 30)) ^ ((b >>> 13) | (b << 19)) ^ ((b >>> 22) | (b << 10));
      s1 = ((f >>> 6) | (f << 26)) ^ ((f >>> 11) | (f << 21)) ^ ((f >>> 25) | (f << 7));
      bc = b & c;
      maj = bc ^ (b & d) ^ cd;
      ch = (f & g) ^ (~f & h);
      t1 = e + s1 + ch + K[j + 3] + blocks[j + 3];
      t2 = s0 + maj;
      e = a + t1 << 0;
      a = t1 + t2 << 0;
    }

    this.h0 = this.h0 + a << 0;
    this.h1 = this.h1 + b << 0;
    this.h2 = this.h2 + c << 0;
    this.h3 = this.h3 + d << 0;
    this.h4 = this.h4 + e << 0;
    this.h5 = this.h5 + f << 0;
    this.h6 = this.h6 + g << 0;
    this.h7 = this.h7 + h << 0;
  };

  Sha256.prototype.hex = function () {
    this.finalize();

    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5,
      h6 = this.h6, h7 = this.h7;

    var hex = HEX_CHARS[(h0 >> 28) & 0x0F] + HEX_CHARS[(h0 >> 24) & 0x0F] +
      HEX_CHARS[(h0 >> 20) & 0x0F] + HEX_CHARS[(h0 >> 16) & 0x0F] +
      HEX_CHARS[(h0 >> 12) & 0x0F] + HEX_CHARS[(h0 >> 8) & 0x0F] +
      HEX_CHARS[(h0 >> 4) & 0x0F] + HEX_CHARS[h0 & 0x0F] +
      HEX_CHARS[(h1 >> 28) & 0x0F] + HEX_CHARS[(h1 >> 24) & 0x0F] +
      HEX_CHARS[(h1 >> 20) & 0x0F] + HEX_CHARS[(h1 >> 16) & 0x0F] +
      HEX_CHARS[(h1 >> 12) & 0x0F] + HEX_CHARS[(h1 >> 8) & 0x0F] +
      HEX_CHARS[(h1 >> 4) & 0x0F] + HEX_CHARS[h1 & 0x0F] +
      HEX_CHARS[(h2 >> 28) & 0x0F] + HEX_CHARS[(h2 >> 24) & 0x0F] +
      HEX_CHARS[(h2 >> 20) & 0x0F] + HEX_CHARS[(h2 >> 16) & 0x0F] +
      HEX_CHARS[(h2 >> 12) & 0x0F] + HEX_CHARS[(h2 >> 8) & 0x0F] +
      HEX_CHARS[(h2 >> 4) & 0x0F] + HEX_CHARS[h2 & 0x0F] +
      HEX_CHARS[(h3 >> 28) & 0x0F] + HEX_CHARS[(h3 >> 24) & 0x0F] +
      HEX_CHARS[(h3 >> 20) & 0x0F] + HEX_CHARS[(h3 >> 16) & 0x0F] +
      HEX_CHARS[(h3 >> 12) & 0x0F] + HEX_CHARS[(h3 >> 8) & 0x0F] +
      HEX_CHARS[(h3 >> 4) & 0x0F] + HEX_CHARS[h3 & 0x0F] +
      HEX_CHARS[(h4 >> 28) & 0x0F] + HEX_CHARS[(h4 >> 24) & 0x0F] +
      HEX_CHARS[(h4 >> 20) & 0x0F] + HEX_CHARS[(h4 >> 16) & 0x0F] +
      HEX_CHARS[(h4 >> 12) & 0x0F] + HEX_CHARS[(h4 >> 8) & 0x0F] +
      HEX_CHARS[(h4 >> 4) & 0x0F] + HEX_CHARS[h4 & 0x0F] +
      HEX_CHARS[(h5 >> 28) & 0x0F] + HEX_CHARS[(h5 >> 24) & 0x0F] +
      HEX_CHARS[(h5 >> 20) & 0x0F] + HEX_CHARS[(h5 >> 16) & 0x0F] +
      HEX_CHARS[(h5 >> 12) & 0x0F] + HEX_CHARS[(h5 >> 8) & 0x0F] +
      HEX_CHARS[(h5 >> 4) & 0x0F] + HEX_CHARS[h5 & 0x0F] +
      HEX_CHARS[(h6 >> 28) & 0x0F] + HEX_CHARS[(h6 >> 24) & 0x0F] +
      HEX_CHARS[(h6 >> 20) & 0x0F] + HEX_CHARS[(h6 >> 16) & 0x0F] +
      HEX_CHARS[(h6 >> 12) & 0x0F] + HEX_CHARS[(h6 >> 8) & 0x0F] +
      HEX_CHARS[(h6 >> 4) & 0x0F] + HEX_CHARS[h6 & 0x0F];
    if (!this.is224) {
      hex += HEX_CHARS[(h7 >> 28) & 0x0F] + HEX_CHARS[(h7 >> 24) & 0x0F] +
        HEX_CHARS[(h7 >> 20) & 0x0F] + HEX_CHARS[(h7 >> 16) & 0x0F] +
        HEX_CHARS[(h7 >> 12) & 0x0F] + HEX_CHARS[(h7 >> 8) & 0x0F] +
        HEX_CHARS[(h7 >> 4) & 0x0F] + HEX_CHARS[h7 & 0x0F];
    }
    return hex;
  };

  Sha256.prototype.toString = Sha256.prototype.hex;

  Sha256.prototype.digest = function () {
    this.finalize();

    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5,
      h6 = this.h6, h7 = this.h7;

    var arr = [
      (h0 >> 24) & 0xFF, (h0 >> 16) & 0xFF, (h0 >> 8) & 0xFF, h0 & 0xFF,
      (h1 >> 24) & 0xFF, (h1 >> 16) & 0xFF, (h1 >> 8) & 0xFF, h1 & 0xFF,
      (h2 >> 24) & 0xFF, (h2 >> 16) & 0xFF, (h2 >> 8) & 0xFF, h2 & 0xFF,
      (h3 >> 24) & 0xFF, (h3 >> 16) & 0xFF, (h3 >> 8) & 0xFF, h3 & 0xFF,
      (h4 >> 24) & 0xFF, (h4 >> 16) & 0xFF, (h4 >> 8) & 0xFF, h4 & 0xFF,
      (h5 >> 24) & 0xFF, (h5 >> 16) & 0xFF, (h5 >> 8) & 0xFF, h5 & 0xFF,
      (h6 >> 24) & 0xFF, (h6 >> 16) & 0xFF, (h6 >> 8) & 0xFF, h6 & 0xFF
    ];
    if (!this.is224) {
      arr.push((h7 >> 24) & 0xFF, (h7 >> 16) & 0xFF, (h7 >> 8) & 0xFF, h7 & 0xFF);
    }
    return arr;
  };

  Sha256.prototype.array = Sha256.prototype.digest;

  Sha256.prototype.arrayBuffer = function () {
    this.finalize();

    var buffer = new ArrayBuffer(this.is224 ? 28 : 32);
    var dataView = new DataView(buffer);
    dataView.setUint32(0, this.h0);
    dataView.setUint32(4, this.h1);
    dataView.setUint32(8, this.h2);
    dataView.setUint32(12, this.h3);
    dataView.setUint32(16, this.h4);
    dataView.setUint32(20, this.h5);
    dataView.setUint32(24, this.h6);
    if (!this.is224) {
      dataView.setUint32(28, this.h7);
    }
    return buffer;
  };

  function HmacSha256(key, is224, sharedMemory) {
    var i, type = typeof key;
    if (type === 'string') {
      var bytes = [], length = key.length, index = 0, code;
      for (i = 0; i < length; ++i) {
        code = key.charCodeAt(i);
        if (code < 0x80) {
          bytes[index++] = code;
        } else if (code < 0x800) {
          bytes[index++] = (0xc0 | (code >> 6));
          bytes[index++] = (0x80 | (code & 0x3f));
        } else if (code < 0xd800 || code >= 0xe000) {
          bytes[index++] = (0xe0 | (code >> 12));
          bytes[index++] = (0x80 | ((code >> 6) & 0x3f));
          bytes[index++] = (0x80 | (code & 0x3f));
        } else {
          code = 0x10000 + (((code & 0x3ff) << 10) | (key.charCodeAt(++i) & 0x3ff));
          bytes[index++] = (0xf0 | (code >> 18));
          bytes[index++] = (0x80 | ((code >> 12) & 0x3f));
          bytes[index++] = (0x80 | ((code >> 6) & 0x3f));
          bytes[index++] = (0x80 | (code & 0x3f));
        }
      }
      key = bytes;
    } else {
      if (type === 'object') {
        if (key === null) {
          throw new Error(ERROR);
        } else if (ARRAY_BUFFER && key.constructor === ArrayBuffer) {
          key = new Uint8Array(key);
        } else if (!Array.isArray(key)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(key)) {
            throw new Error(ERROR);
          }
        }
      } else {
        throw new Error(ERROR);
      }
    }

    if (key.length > 64) {
      key = (new Sha256(is224, true)).update(key).array();
    }

    var oKeyPad = [], iKeyPad = [];
    for (i = 0; i < 64; ++i) {
      var b = key[i] || 0;
      oKeyPad[i] = 0x5c ^ b;
      iKeyPad[i] = 0x36 ^ b;
    }

    Sha256.call(this, is224, sharedMemory);

    this.update(iKeyPad);
    this.oKeyPad = oKeyPad;
    this.inner = true;
    this.sharedMemory = sharedMemory;
  }
  HmacSha256.prototype = new Sha256();

  HmacSha256.prototype.finalize = function () {
    Sha256.prototype.finalize.call(this);
    if (this.inner) {
      this.inner = false;
      var innerHash = this.array();
      Sha256.call(this, this.is224, this.sharedMemory);
      this.update(this.oKeyPad);
      this.update(innerHash);
      Sha256.prototype.finalize.call(this);
    }
  };

  var exports = createMethod();
  exports.sha256 = exports;
  exports.sha224 = createMethod(true);
  exports.sha256.hmac = createHmacMethod();
  exports.sha224.hmac = createHmacMethod(true);

  if (COMMON_JS) {
    module.exports = exports;
  } else {
    root.sha256 = exports.sha256;
    root.sha224 = exports.sha224;
    if (AMD) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return exports;
      }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  }
})();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/Main.ts":
/*!*********************!*\
  !*** ./src/Main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! utils/Utils */ "./src/utils/Utils.ts"), __webpack_require__(/*! JSZip */ "JSZip"), __webpack_require__(/*! Awesomplete */ "./node_modules/Awesomplete/awesomplete.js"), __webpack_require__(/*! ./model/modules/ImageLoader */ "./src/model/modules/ImageLoader.ts"), __webpack_require__(/*! ./factory/FetishSiteFactory */ "./src/factory/FetishSiteFactory.ts"), __webpack_require__(/*! ./factory/UIFactory */ "./src/factory/UIFactory.ts"), __webpack_require__(/*! awesomplete/awesomplete.base.css */ "./node_modules/awesomplete/awesomplete.base.css"), __webpack_require__(/*! awesomplete/awesomplete.css */ "./node_modules/awesomplete/awesomplete.css"), __webpack_require__(/*! awesomplete/awesomplete.theme.css */ "./node_modules/awesomplete/awesomplete.theme.css"), __webpack_require__(/*! css/custom.css */ "./src/css/custom.css")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Utils_1, JSZip, Awesomplete, ImageLoader_1, FetishSiteFactory_1, UIFactory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Main;
    (function (Main) {
        let _isInit = false;
        let _images = [];
        let _filtered = [];
        function doDownloadZip(files, title) {
            setLabel("compressing");
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
                setLabel();
            });
        }
        Main.doDownloadZip = doDownloadZip;
        function setLabel(str = "Download all your fetishes") {
            document.getElementById("fetishAnchor").innerText = str;
        }
        Main.setLabel = setLabel;
        function init() {
            if (_isInit) {
                return;
            }
            buildUI();
            function buildUI() {
                function displayOptions(bool) {
                    let opParent = document.getElementById("fetishDownloadOptions").parentElement;
                    opParent.style.display = bool ? "inline" : "none";
                }
                let uiMaker = UIFactory_1.UIFactory.getUI(document);
                uiMaker.buildUI();
                setLabel();
                let idDownloading = false;
                let anchor = document.getElementById("fetishAnchor");
                anchor.addEventListener("click", async (e) => {
                    if (idDownloading) {
                        return;
                    }
                    if (_isInit) {
                        doDownloadZip(_filtered);
                        return;
                    }
                    _images = [];
                    let options = document.getElementById("fetishDownloadOptions");
                    displayOptions(false);
                    idDownloading = true;
                    setLabel("Parsing pages... Please wait");
                    let site = FetishSiteFactory_1.FetishSiteFactory.getSite(window.document);
                    let pages = await site.pages;
                    for (let page of pages) {
                        _images = _images.concat(page.images);
                    }
                    _filtered = _images;
                    setLabel(`Click to download ${_filtered.length} images`);
                    let inEvent = false;
                    let awComp;
                    function createOptionsModal() {
                        let id = "fetishDownloadOptionsModal";
                        let modal = Utils_1.DomUtil.createModal({
                            id: id,
                            body: (function () {
                                let html = "";
                                html += '<label for="tagInput">Exclude tags: </label>';
                                html += '<input id="tagInput" />';
                                html += "<div class='filterOptionSection' data-type='exclude' id='excludeFilterSection'></div>";
                                return html;
                            }()),
                            title: "Download Options",
                            modalBodyStyle: {
                                "height": "500px",
                                "overflow": "auto"
                            },
                            footer: `<button class="button blackButton fetishOptionsConfirm apply">Apply</button>`
                        });
                        let exists = document.getElementById(id) !== null;
                        if (exists) {
                            document.getElementById(id).remove();
                        }
                        let el = document.body;
                        el.insertAdjacentElement("beforeend", modal);
                        modal.getElementsByClassName("fetishOptionsConfirm")[0].addEventListener("click", evt => {
                            setLabel(`Click to download ${_filtered.length} images`);
                            let filters = {
                                excludeTags: []
                            };
                            // build filters
                            modal.querySelectorAll(".filterOptionSection").forEach(section => {
                                let el = section;
                                let type = el.dataset.type;
                                switch (type) {
                                    case "exclude":
                                        el.querySelectorAll(".badge").forEach(badge => {
                                            let badgeEl = badge;
                                            let toExclude = badgeEl.dataset.value;
                                            filters.excludeTags.push(toExclude);
                                        });
                                        break;
                                }
                            });
                            _filtered = filter(filters);
                            setLabel(`Click to download ${_filtered.length} images`);
                            Utils_1.DomUtil.closeModal(modal);
                        });
                    }
                    createOptionsModal();
                    let hansBind = false;
                    let downloadOptionsCallBack = () => {
                        Utils_1.DomUtil.openModal(document.getElementById("fetishDownloadOptionsModal"));
                        if (hansBind) {
                            return;
                        }
                        let tags = new Set();
                        for (let im of _images) {
                            for (let tag of im.tags) {
                                tags.add(tag);
                            }
                        }
                        let input = document.getElementById("tagInput");
                        awComp = new Awesomplete(input, {
                            list: [...tags],
                            replace: function (suggestion) {
                                // @ts-ignore
                                this.input.value = "";
                            }
                        });
                        let tagSelect = (ev) => {
                            let excludedTags = new Set();
                            // @ts-ignore
                            let applied = ev.text;
                            // @ts-ignore
                            let v = applied.value;
                            let tagArr = [...tags];
                            if (!tagArr.includes(v)) {
                                return;
                            }
                            let e = document.getElementById("excludeFilterSection");
                            let html = `<span class="badge" data-value="${v}">${v} <span class="optionDelete">&times;</span></span>`;
                            let createdHtml = Utils_1.DomUtil.createElementFromHTML(html);
                            createdHtml.querySelector(".optionDelete").addEventListener("click", e => {
                                e.target.parentElement.remove();
                            });
                            e.insertAdjacentElement("beforeend", createdHtml);
                        };
                        input.addEventListener("awesomplete-select", tagSelect);
                        hansBind = true;
                    };
                    let batchLimit = 250;
                    options.addEventListener("click", downloadOptionsCallBack);
                    displayOptions(true);
                    let clickDownloadCallBack = async () => {
                        displayOptions(false);
                        if (inEvent) {
                            return;
                        }
                        try {
                            inEvent = true;
                            await ImageLoader_1.ImageLoader.loadImages(_filtered, batchLimit);
                            if (ImageLoader_1.ImageLoader.isBatch && ImageLoader_1.ImageLoader.batch.length > 0) {
                                // download the rest of the batch
                                await doDownloadZip(ImageLoader_1.ImageLoader.batch, "final");
                                // init is not true, as batches remove images as they are downloaded
                            }
                            else {
                                await doDownloadZip(_filtered);
                                _isInit = true;
                            }
                        }
                        finally {
                            anchor.removeEventListener("click", clickDownloadCallBack);
                            options.removeEventListener("click", downloadOptionsCallBack);
                            inEvent = false;
                            idDownloading = false;
                        }
                    };
                    anchor.addEventListener("click", clickDownloadCallBack);
                });
            }
        }
        Main.init = init;
        function filter(filterObject) {
            let newArray = [];
            for (let image of _images) {
                let tagsForImage = image.tags;
                outer: for (let filterType in filterObject) {
                    let arrayOfSelectedTags = filterObject[filterType];
                    for (let selectedTag of arrayOfSelectedTags) {
                        if (tagsForImage.indexOf(selectedTag) > -1) {
                            continue outer;
                        }
                    }
                    newArray.push(image);
                }
            }
            return newArray;
        }
    })(Main = exports.Main || (exports.Main = {}));
    Main.init();
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/css/custom.css":
/*!****************************!*\
  !*** ./src/css/custom.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./custom.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/custom.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./src/css/modal.css":
/*!***************************!*\
  !*** ./src/css/modal.css ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./modal.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/modal.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./src/factory/FetishSiteFactory.ts":
/*!******************************************!*\
  !*** ./src/factory/FetishSiteFactory.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ../site/IFetishSite */ "./src/site/IFetishSite.ts"), __webpack_require__(/*! ../utils/Utils */ "./src/utils/Utils.ts"), __webpack_require__(/*! ../site/impl/KonaChan */ "./src/site/impl/KonaChan.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, IFetishSite_1, Utils_1, KonaChan_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FetishSiteFactory;
    (function (FetishSiteFactory) {
        function getSite(doc) {
            switch (Utils_1.SiteUtils.getSite(doc)) {
                case IFetishSite_1.SITES.KONACHAN:
                    return new KonaChan_1.KonaChan(doc);
            }
        }
        FetishSiteFactory.getSite = getSite;
    })(FetishSiteFactory = exports.FetishSiteFactory || (exports.FetishSiteFactory = {}));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/factory/UIFactory.ts":
/*!**********************************!*\
  !*** ./src/factory/UIFactory.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ../utils/Utils */ "./src/utils/Utils.ts"), __webpack_require__(/*! ../site/IFetishSite */ "./src/site/IFetishSite.ts"), __webpack_require__(/*! ../model/UI/impl/KonaChanUi */ "./src/model/UI/impl/KonaChanUi.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Utils_1, IFetishSite_1, KonaChanUi_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIFactory;
    (function (UIFactory) {
        function getUI(doc) {
            switch (Utils_1.SiteUtils.getSite(doc)) {
                case IFetishSite_1.SITES.KONACHAN:
                    return new KonaChanUi_1.KonaChanUi(doc);
            }
        }
        UIFactory.getUI = getUI;
    })(UIFactory = exports.UIFactory || (exports.UIFactory = {}));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/model/FetishPage.ts":
/*!*********************************!*\
  !*** ./src/model/FetishPage.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ../site/IFetishSite */ "./src/site/IFetishSite.ts"), __webpack_require__(/*! ../parser/impl/FetishDocumentParser */ "./src/parser/impl/FetishDocumentParser.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, IFetishSite_1, FetishDocumentParser_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FetishPage {
        constructor(doc, site) {
            this._imageCahce = [];
            switch (site) {
                case IFetishSite_1.SITES.KONACHAN:
                    this.fetishDocumentParser = new FetishDocumentParser_1.KonachanParser();
                    break;
            }
            this.doc = doc;
        }
        get images() {
            if (this._imageCahce.length === 0) {
                this._imageCahce = this.fetishDocumentParser.parse(this.doc);
                return this._imageCahce;
            }
            return this._imageCahce;
        }
    }
    exports.FetishPage = FetishPage;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/model/UI/AbstractUI.ts":
/*!************************************!*\
  !*** ./src/model/UI/AbstractUI.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AbstractUI {
        constructor(doc) {
            this.doc = doc;
        }
    }
    exports.AbstractUI = AbstractUI;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/model/UI/impl/KonaChanUi.ts":
/*!*****************************************!*\
  !*** ./src/model/UI/impl/KonaChanUi.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ../AbstractUI */ "./src/model/UI/AbstractUI.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, AbstractUI_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class KonaChanUi extends AbstractUI_1.AbstractUI {
        constructor() {
            super(...arguments);
            this.ulSideBar = this.doc.getElementById("subnavbar");
        }
        createLi() {
            let node = this.doc.createElement("LI");
            this.ulSideBar.appendChild(node);
            return node;
        }
        buildUI() {
            function makeDoDownload() {
                let node = this.createLi();
                let textnode = this.doc.createTextNode("");
                let aTag = this.doc.createElement("a");
                aTag.id = "fetishAnchor";
                aTag.appendChild(textnode);
                aTag.href = "#";
                node.appendChild(aTag);
            }
            function makeDownloadOptionsTag() {
                let node = this.createLi();
                node.style.display = "none";
                let textnode = this.doc.createTextNode("Download Options");
                let aTag = this.doc.createElement("a");
                aTag.id = "fetishDownloadOptions";
                aTag.appendChild(textnode);
                aTag.href = "#";
                aTag.innerText = "Download Options";
                node.appendChild(aTag);
            }
            makeDoDownload.call(this);
            makeDownloadOptionsTag.call(this);
        }
    }
    exports.KonaChanUi = KonaChanUi;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/model/impl/FetishImage.ts":
/*!***************************************!*\
  !*** ./src/model/impl/FetishImage.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! utils/Utils */ "./src/utils/Utils.ts"), __webpack_require__(/*! js-sha256 */ "./node_modules/js-sha256/src/sha256.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Utils_1, js_sha256_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FetishImage {
        constructor(container) {
            this._res = container.res;
            this._title = container.title;
            this._url = container.url;
            this._isInit = false;
            this._tags = container.tags;
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
        get tags() {
            return this._tags;
        }
        unloadImage() {
            this._isInit = false;
            this._actualImage = null;
        }
        loadImage() {
            function getResult(reader) {
                return new Promise((resolve, reject) => {
                    reader.onload = function () {
                        resolve(this.result);
                    };
                    reader.onerror = reader.onabort = reject;
                });
            }
            if (this._isInit) {
                return Promise.resolve();
            }
            return Utils_1.AjaxUtils.loadImage(this.url).then(image => {
                this._actualImage = image;
                // Konachan has a thing about setting files with the same name, but not the same actual image, this will append a hash of the image as the file name, thus, removing duplicated files, and if there is a file with the same name that is really a dupe, then when you extract it, it will have the same hash
                let reader = new FileReader();
                reader.readAsBinaryString(image);
                return getResult(reader);
            }).then(value => {
                let hashofImage = js_sha256_1.sha256(value);
                if (!this.title.includes(`_${hashofImage}`)) {
                    let titleSplit = this.title.split(".");
                    let extension = titleSplit.pop();
                    this._title = `${titleSplit.join("")}_${hashofImage}.${extension}`;
                }
                this._isInit = true;
            });
        }
    }
    exports.FetishImage = FetishImage;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/model/modules/ImageLoader.ts":
/*!******************************************!*\
  !*** ./src/model/modules/ImageLoader.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ../../Main */ "./src/Main.ts"), __webpack_require__(/*! ../../utils/Utils */ "./src/utils/Utils.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Main_1, Utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ImageLoader;
    (function (ImageLoader) {
        async function delay(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }
        async function loadImages(_images, batchLimit) {
            let count = 0;
            ImageLoader.isBatch = _images.length > batchLimit;
            ImageLoader.batch = [];
            let failCount = new Map();
            let batchNum = 0;
            async function inner(images, count) {
                let failedImages = [];
                for (let im of images) {
                    if (!im.isInit) {
                        try {
                            count++;
                            await delay(50);
                            await im.loadImage();
                            Main_1.Main.setLabel(`${count} out of ${images.length} done`);
                            if (ImageLoader.isBatch) {
                                ImageLoader.batch.push(im);
                                if (count % batchLimit === 0) {
                                    batchNum++;
                                    let ofString = Math.floor(Math.round(images.length / batchLimit));
                                    if (images.length % batchLimit != 0) {
                                        ofString++;
                                    }
                                    let ofStr = String(ofString);
                                    await Main_1.Main.doDownloadZip(ImageLoader.batch, `${batchNum} of ${ofStr}`);
                                    for (let i = 0; i < ImageLoader.batch.length; i++) {
                                        ImageLoader.batch[i].unloadImage();
                                    }
                                    ImageLoader.batch = [];
                                }
                            }
                        }
                        catch (e) {
                            failedImages.push(im);
                            let failcount = -1;
                            if (failCount.has(im)) {
                                let failNum = failCount.get(im);
                                failCount.set(im, failNum++);
                                failcount = failCount.get(im);
                            }
                            else {
                                failCount.set(im, 0);
                            }
                            if (failcount > 5) {
                                Utils_1.ObjectUtil.removeObjectFromArray(im, failedImages);
                            }
                            else {
                                await delay(4000);
                            }
                        }
                    }
                }
                if (failedImages.length > 0) {
                    count = 0;
                    Main_1.Main.setLabel("Re-retrying failed images...");
                    await inner(failedImages, count);
                    failedImages = [];
                }
            }
            return inner(_images, count);
        }
        ImageLoader.loadImages = loadImages;
    })(ImageLoader = exports.ImageLoader || (exports.ImageLoader = {}));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/parser/impl/FetishDocumentParser.ts":
/*!*************************************************!*\
  !*** ./src/parser/impl/FetishDocumentParser.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! model/impl/FetishImage */ "./src/model/impl/FetishImage.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, FetishImage_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class KonachanParser {
        parse(doc) {
            let list = doc.getElementById("post-list-posts");
            if (list == null) {
                return [];
            }
            let childrenLi = list.childNodes;
            let retArr = [];
            for (let i = 0; i < childrenLi.length; i++) {
                let e = childrenLi[i];
                if (e.nodeType == Node.ELEMENT_NODE) {
                    let containerInfo = this._parseContainer(e);
                    retArr.push(new FetishImage_1.FetishImage(containerInfo));
                }
            }
            return retArr;
        }
        _parseContainer(el) {
            let url;
            let res;
            let title;
            let tags;
            let tagForTitle = el.getElementsByClassName("inner")[0];
            let aNameTag = tagForTitle.firstChild;
            let infoTag = el.getElementsByClassName("directlink")[0];
            let tagInfo = aNameTag.firstChild;
            url = infoTag.href;
            res = infoTag.getElementsByClassName("directlink-res")[0].innerHTML;
            title = `${aNameTag.href.substr(aNameTag.href.lastIndexOf('/') + 1)}.${url.split(".").pop()}`;
            let tagInfoString = tagInfo.title;
            let strSplit = tagInfoString.split(" ");
            let slice = strSplit.slice(strSplit.indexOf("Tags:") + 1);
            if (slice.length === 0) {
                tags = [];
            }
            else {
                slice.splice(slice.indexOf(":") - 1);
                tags = slice;
            }
            return {
                url: url,
                res: res,
                title: title,
                tags: tags
            };
        }
    }
    exports.KonachanParser = KonachanParser;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/site/FetishSite.ts":
/*!********************************!*\
  !*** ./src/site/FetishSite.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FetishSite {
        constructor(doc) {
            this.doc = doc;
        }
    }
    exports.FetishSite = FetishSite;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/site/IFetishSite.ts":
/*!*********************************!*\
  !*** ./src/site/IFetishSite.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SITES;
    (function (SITES) {
        SITES["KONACHAN"] = "konachan";
    })(SITES = exports.SITES || (exports.SITES = {}));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/site/impl/KonaChan.ts":
/*!***********************************!*\
  !*** ./src/site/impl/KonaChan.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ../../model/FetishPage */ "./src/model/FetishPage.ts"), __webpack_require__(/*! ../../Main */ "./src/Main.ts"), __webpack_require__(/*! ../../utils/Utils */ "./src/utils/Utils.ts"), __webpack_require__(/*! ../IFetishSite */ "./src/site/IFetishSite.ts"), __webpack_require__(/*! ../FetishSite */ "./src/site/FetishSite.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, FetishPage_1, Main_1, Utils_1, IFetishSite_1, FetishSite_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class KonaChan extends FetishSite_1.FetishSite {
        get pages() {
            async function load(urls) {
                let count = 0;
                let arr = [];
                for (let url of urls) {
                    let response = await fetch(url);
                    let html = await response.text();
                    count++;
                    let domParser = new DOMParser();
                    let doc = domParser.parseFromString(html, "text/html");
                    let fe = new FetishPage_1.FetishPage(doc, this.site);
                    let percent = Math.floor(100 * count / urls.length);
                    Main_1.Main.setLabel(`Parsing pages ${percent.toString()}% done`);
                    arr.push(fe);
                }
                arr.push(new FetishPage_1.FetishPage(this.doc, this.site));
                return arr;
            }
            let allPages = this.doc.querySelectorAll("#paginator a:not(.next_page):not(.previous_page)");
            let urls = [];
            if (allPages.length > 0) {
                let arrOfPageA = Array.from(allPages);
                let firstPage = arrOfPageA[0];
                let lastPage = arrOfPageA[arrOfPageA.length - 1];
                let firstPageNumber = Number.parseInt(firstPage.text);
                let lastPageNumber = Number.parseInt(lastPage.text);
                let rangeBetween = Utils_1.MathUtil.range(firstPageNumber, lastPageNumber);
                let baseUrl = window.location.href;
                let currentPage = Utils_1.QueryString.page === undefined ? 1 : Utils_1.QueryString.page;
                for (let i = 0; i < rangeBetween.length; i++) {
                    let num = String(rangeBetween[i]);
                    if (num == currentPage) {
                        continue;
                    }
                    let newUrl = Utils_1.AjaxUtils.addParameter(baseUrl, "page", num.toString(), true);
                    urls.push(newUrl);
                }
            }
            return load.call(this, urls);
        }
        get site() {
            return IFetishSite_1.SITES.KONACHAN;
        }
    }
    exports.KonaChan = KonaChan;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/utils/Utils.ts":
/*!****************************!*\
  !*** ./src/utils/Utils.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ../site/IFetishSite */ "./src/site/IFetishSite.ts"), __webpack_require__(/*! ../css/modal.css */ "./src/css/modal.css")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, IFetishSite_1) {
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
        static loadImage(url) {
            return new Promise((resolve, reject) => {
                try {
                    let xhr = new XMLHttpRequest();
                    xhr.open(HTTP_METHOD.GET, url);
                    xhr.responseType = "blob";
                    xhr.timeout = 20000;
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
                    xhr.ontimeout = () => {
                        reject("Network error.");
                    };
                    xhr.send();
                }
                catch (err) {
                    reject(err.message);
                }
            });
        }
    }
    exports.AjaxUtils = AjaxUtils;
    class EnumEx {
        static getNamesAndValues(e) {
            return EnumEx.getNames(e).map(n => ({ name: n, value: e[n] }));
        }
        /**
         * get the numValue associated with it's own key. if you want to get a TypeScript Enum based on an index you can use this
         * @param e
         * @param aName
         * @returns {string|null}
         */
        static loopBack(e, aName) {
            let keyValuePair = EnumEx.getNamesAndValues(e);
            for (let i = 0; i < keyValuePair.length; i++) {
                let obj = keyValuePair[i];
                if (obj.name === aName) {
                    return obj.name;
                }
            }
            return null;
        }
        static getNames(e) {
            return EnumEx.getObjValues(e).filter(v => typeof v === "string");
        }
        static getObjValues(e) {
            return Object.keys(e).map(k => e[k]);
        }
    }
    class MathUtil {
        static range(start, end) {
            // @ts-ignore
            return Array(end - start + 1).fill().map((_, idx) => start + idx);
        }
    }
    exports.MathUtil = MathUtil;
    var SiteUtils;
    (function (SiteUtils) {
        function getSite(doc) {
            let url = doc.location.hostname.split(".").shift();
            return EnumEx.loopBack(IFetishSite_1.SITES, url);
        }
        SiteUtils.getSite = getSite;
    })(SiteUtils = exports.SiteUtils || (exports.SiteUtils = {}));
    class DomUtil {
        /**
         * Create a modal with the given options
         * @param options
         */
        static createModal(options) {
            function getStyle(styleObj) {
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
            }
            else {
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
            window.onclick = (event) => {
                if (event.target == modal) {
                    DomUtil.closeModal(modal);
                }
            };
            DomUtil.offOn(DomUtil.bySelector(".FSclose", modal), "click", e => {
                DomUtil.closeModal(modal);
            });
            return modal;
        }
        static bySelector(selector, el) {
            if (el) {
                return el.querySelector(selector);
            }
            return document.querySelector(selector);
        }
        static offOn(el, event, callBack, fireImmediately = false) {
            if (!el) {
                return;
            }
            let toTrigger;
            if (el instanceof Element) {
                toTrigger = el;
            }
            else {
                toTrigger = document.querySelector(el);
            }
            if (!toTrigger) {
                return;
            }
            toTrigger = DomUtil.off(toTrigger);
            DomUtil.on(toTrigger, event, callBack, fireImmediately);
        }
        static off(el) {
            if (!el) {
                return;
            }
            let newEl = el.cloneNode(false);
            while (el.hasChildNodes()) {
                newEl.appendChild(el.firstChild);
            }
            el.parentNode.replaceChild(newEl, el);
            return newEl;
        }
        static on(el, event, callBack, fireImmediately = false) {
            if (!el) {
                return;
            }
            let toTrigger;
            if (el instanceof Element) {
                toTrigger = el;
            }
            else {
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
        static openModal(modal) {
            modal.style.display = "block";
        }
        static createElementFromHTML(htmlString) {
            let div = document.createElement('div');
            div.innerHTML = htmlString.trim();
            return div.firstChild;
        }
        static closeModal(modal) {
            modal.style.display = "none";
        }
    }
    exports.DomUtil = DomUtil;
    class ObjectUtil {
        static guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
        static validString(...strings) {
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
        static removeObjectFromArray(itemToRemove, arr) {
            let arrLen = arr.length;
            while (arrLen--) {
                let currentItem = arr[arrLen];
                if (itemToRemove === currentItem) {
                    arr.splice(arrLen, 1);
                }
            }
        }
    }
    exports.ObjectUtil = ObjectUtil;
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

/***/ })

/******/ });
});