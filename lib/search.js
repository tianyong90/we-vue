/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _search = __webpack_require__(77);

	Object.defineProperty(exports, 'default', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_search).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },

/***/ 39:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },

/***/ 77:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(78)

	/* script */
	__vue_exports__ = __webpack_require__(80)

	/* template */
	var __vue_template__ = __webpack_require__(85)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-84d13d44"

	module.exports = __vue_exports__


/***/ },

/***/ 78:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(79);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(40)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-84d13d44&scoped=true!./../../../node_modules/sass-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./search.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-84d13d44&scoped=true!./../../../node_modules/sass-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./search.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 79:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(39)();
	// imports


	// module
	exports.push([module.id, "\n.searchbar-result[data-v-84d13d44] {\n  display: block;\n  transform-origin: 0px 0px 0px;\n  opacity: 1;\n  transform: scale(1, 1);\n  margin-top: 0;\n  font-size: 14px;\n}\n", "", {"version":3,"sources":["/./src/components/search/search.vue"],"names":[],"mappings":";AACA;EACE,eAAe;EACf,8BAA8B;EAC9B,WAAW;EACX,uBAAuB;EACvB,cAAc;EACd,gBAAgB;CACjB","file":"search.vue","sourcesContent":["\n.searchbar-result[data-v-84d13d44] {\n  display: block;\n  transform-origin: 0px 0px 0px;\n  opacity: 1;\n  transform: scale(1, 1);\n  margin-top: 0;\n  font-size: 14px;\n}\n"],"sourceRoot":"webpack://"}]);

	// exports


/***/ },

/***/ 80:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _index = __webpack_require__(81);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../cell/index.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _index4 = _interopRequireDefault(_index3);

	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"weui/dist/style/weui.min.css\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'wv-search',

	  props: {
	    value: String,
	    autofocus: Boolean,
	    show: Boolean,
	    placeholder: {
	      type: String,
	      default: '搜索'
	    },
	    cancelText: {
	      type: String,
	      default: '取消'
	    },
	    result: Array
	  },

	  components: {
	    XGroup: _index2.default,
	    XCell: _index4.default
	  },

	  data: function data() {
	    return {
	      isActive: false,
	      currentValue: this.value
	    };
	  },
	  mounted: function mounted() {
	    if (this.autofocus) {
	      this.$refs.searchInput.focus();
	      this.isActive = true;
	    }
	  },


	  methods: {
	    textClick: function textClick(e) {
	      this.$refs.searchInput.focus();
	      this.isActive = true;
	    },
	    searchClear: function searchClear() {
	      this.currentValue = '';
	    },
	    searchCancel: function searchCancel() {
	      this.searchClear();
	      this.isActive = false;
	    }
	  },

	  watch: {
	    currentValue: function currentValue(val) {
	      this.$emit('input', val);
	    },
	    value: function value(val) {
	      this.currentValue = val;
	    }
	  }
	};

/***/ },

/***/ 81:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _group = __webpack_require__(82);

	Object.defineProperty(exports, 'default', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_group).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },

/***/ 82:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(83)

	/* template */
	var __vue_template__ = __webpack_require__(84)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ },

/***/ 83:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"weui/dist/style/weui.min.css\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	exports.default = {
	  name: 'wv-group',

	  props: {
	    title: String
	  }
	};

/***/ },

/***/ 84:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('div', [(_vm.title) ? _vm._c('div', {
	    staticClass: "weui-cells__title"
	  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm._v(" "), _vm._c('div', {
	    staticClass: "weui-cells"
	  }, [_vm._t("default")], 2)])
	},staticRenderFns: []}

/***/ },

/***/ 85:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('div', [_vm._c('div', {
	    staticClass: "weui-search-bar"
	  }, [_vm._c('div', {
	    staticClass: "weui-search-bar__form"
	  }, [_vm._c('div', {
	    staticClass: "weui-search-bar__box"
	  }, [_vm._c('i', {
	    staticClass: "weui-icon-search"
	  }), _vm._v(" "), _vm._c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.currentValue),
	      expression: "currentValue"
	    }],
	    ref: "searchInput",
	    staticClass: "weui-search-bar__input",
	    attrs: {
	      "type": "text",
	      "placeholder": _vm.placeholder
	    },
	    domProps: {
	      "value": _vm._s(_vm.currentValue)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.currentValue = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _vm._c('a', {
	    staticClass: "weui-icon-clear",
	    attrs: {
	      "href": "javascript:"
	    },
	    on: {
	      "click": _vm.searchClear
	    }
	  })]), _vm._v(" "), _vm._c('label', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (!_vm.isActive),
	      expression: "!isActive"
	    }],
	    staticClass: "weui-search-bar__label",
	    staticStyle: {
	      "transform-origin": "0px 0px 0px",
	      "opacity": "1",
	      "transform": "scale(1, 1)"
	    },
	    on: {
	      "click": _vm.textClick
	    }
	  }, [_vm._c('i', {
	    staticClass: "weui-icon-search"
	  }), _vm._v(" "), _vm._c('span', {
	    domProps: {
	      "textContent": _vm._s(_vm.placeholder)
	    }
	  })])]), _vm._v(" "), _vm._c('a', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.isActive),
	      expression: "isActive"
	    }],
	    staticClass: "weui-search-bar__cancel-btn",
	    staticStyle: {
	      "display": "block"
	    },
	    attrs: {
	      "href": "javascript:"
	    },
	    domProps: {
	      "textContent": _vm._s(_vm.cancelText)
	    },
	    on: {
	      "click": _vm.searchCancel
	    }
	  })]), _vm._v(" "), _vm._t("default", [_vm._c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.show || _vm.currentValue),
	      expression: "show || currentValue"
	    }],
	    staticClass: "weui-cells searchbar-result"
	  }, _vm._l((_vm.result), function(item) {
	    return _vm._c('XCell', {
	      attrs: {
	        "title": item
	      }
	    })
	  }))])], 2)
	},staticRenderFns: []}

/***/ }

/******/ });