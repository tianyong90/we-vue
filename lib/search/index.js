module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 344);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__search_vue__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__search_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__search_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__search_vue___default.a; });


/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__group_index_js__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cell_index_js__ = __webpack_require__(55);





/* harmony default export */ __webpack_exports__["default"] = ({
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
    XGroup: __WEBPACK_IMPORTED_MODULE_0__group_index_js__["default"],
    XCell: __WEBPACK_IMPORTED_MODULE_1__cell_index_js__["default"]
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
});

/***/ }),

/***/ 227:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(227)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(167),
  /* template */
  __webpack_require__(308),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-e876aa2a",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 308:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "weui-search-bar"
  }, [_c('div', {
    staticClass: "weui-search-bar__form"
  }, [_c('div', {
    staticClass: "weui-search-bar__box"
  }, [_c('i', {
    staticClass: "weui-icon-search"
  }), _vm._v(" "), _c('input', {
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
      "value": (_vm.currentValue)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.currentValue = $event.target.value
      }
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "weui-icon-clear",
    attrs: {
      "href": "javascript:"
    },
    on: {
      "click": _vm.searchClear
    }
  })]), _vm._v(" "), _c('label', {
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
  }, [_c('i', {
    staticClass: "weui-icon-search"
  }), _vm._v(" "), _c('span', {
    domProps: {
      "textContent": _vm._s(_vm.placeholder)
    }
  })])]), _vm._v(" "), _c('a', {
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
  })]), _vm._v(" "), _vm._t("default", [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show || _vm.currentValue),
      expression: "show || currentValue"
    }],
    staticClass: "weui-cells searchbar-result"
  }, _vm._l((_vm.result), function(item) {
    return _c('XCell', {
      attrs: {
        "title": item
      }
    })
  }))])], 2)
},staticRenderFns: []}

/***/ }),

/***/ 344:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(122);


/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cell_vue__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cell_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cell_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__cell_vue___default.a; });


/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__group_vue__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__group_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__group_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__group_vue___default.a; });


/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'wv-cell',

  props: {
    title: {
      type: String | Number
    },
    value: {
      type: String | Number
    },
    isLink: Boolean,
    to: String
  },

  computed: {
    href: function href() {
      var _this = this;

      if (this.to && !this.added && this.$router) {
        var resolved = this.$router.match(this.to);
        if (!resolved.matched.length) return this.to;

        this.$nextTick(function () {
          _this.added = true;
          _this.$el.addEventListener('click', _this.handleClick);
        });
        return resolved.path;
      }
      return this.to;
    }
  },

  methods: {
    handleClick: function handleClick($event) {
      $event.preventDefault();
      this.$router.push(this.href);
    }
  }
});

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'wv-group',

  props: {
    title: String,
    titleColor: String
  }
});

/***/ }),

/***/ 84:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 85:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(85)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(57),
  /* template */
  __webpack_require__(89),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-f465322a",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(84)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(58),
  /* template */
  __webpack_require__(88),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-16e4b6eb",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 88:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.title) ? _c('div', {
    staticClass: "weui-cells__title",
    style: ({
      color: _vm.titleColor
    }),
    domProps: {
      "innerHTML": _vm._s(_vm.title)
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "weui-cells"
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}

/***/ }),

/***/ 89:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.to) ? _c('a', {
    staticClass: "weui-cell",
    class: {
      'weui-cell_access': _vm.isLink
    },
    attrs: {
      "href": _vm.href
    }
  }, [_c('div', {
    staticClass: "weui-cell_hd"
  }, [_vm._t("icon")], 2), _vm._v(" "), _c('div', {
    staticClass: "weui-cell__bd"
  }, [_vm._t("bd", [_c('p', {
    domProps: {
      "innerHTML": _vm._s(_vm.title)
    }
  })])], 2), _vm._v(" "), _c('div', {
    staticClass: "weui-cell__ft"
  }, [_vm._t("ft", [_vm._v(_vm._s(_vm.value))])], 2)]) : _c('div', {
    staticClass: "weui-cell",
    class: {
      'weui-cell_access': _vm.isLink
    }
  }, [_c('div', {
    staticClass: "weui-cell_hd"
  }, [_vm._t("icon")], 2), _vm._v(" "), _c('div', {
    staticClass: "weui-cell__bd"
  }, [_vm._t("bd", [_c('p', {
    domProps: {
      "innerHTML": _vm._s(_vm.title)
    }
  })])], 2), _vm._v(" "), _c('div', {
    staticClass: "weui-cell__ft"
  }, [_vm._t("ft", [_vm._v(_vm._s(_vm.value))])], 2)])
},staticRenderFns: []}

/***/ })

/******/ });