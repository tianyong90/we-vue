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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _actionsheet = __webpack_require__(1);

	Object.defineProperty(exports, 'default', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_actionsheet).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(2)

	/* template */
	var __vue_template__ = __webpack_require__(4)
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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"weui/dist/style/weui.min.css\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	exports.default = {
	  name: 'wv-actionsheet',

	  props: {
	    type: {
	      type: String,
	      default: 'ios'
	    },
	    actions: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    },
	    cancelText: {
	      type: String,
	      default: 'Cancel'
	    },
	    value: Boolean
	  },

	  data: function data() {
	    return {
	      currentValue: false
	    };
	  },


	  watch: {
	    currentValue: function currentValue(val) {
	      this.$emit('input', val);
	    },
	    value: function value(val) {
	      this.currentValue = val;
	    }
	  },

	  methods: {
	    itemClick: function itemClick(item) {
	      if (item.method && typeof item.method === 'function') {
	        item.method();
	      }
	      this.currentValue = false;
	    }
	  },

	  mounted: function mounted() {
	    if (this.value) {
	      this.currentValue = true;
	    }
	  }
	};

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('div', [_vm._c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.currentValue && _vm.type === 'ios'),
	      expression: "currentValue && type === 'ios'"
	    }],
	    staticClass: "weui-mask_transparent actionsheet__mask actionsheet__mask_show",
	    staticStyle: {
	      "display": "block",
	      "transform-origin": "0px 0px 0px",
	      "opacity": "1",
	      "transform": "scale(1, 1)",
	      "background-color": "rgba(0, 0, 0, 0.6)"
	    },
	    on: {
	      "click": function($event) {
	        _vm.currentValue = false
	      }
	    }
	  }), _vm._v(" "), (_vm.type === 'ios') ? _vm._c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.currentValue),
	      expression: "currentValue"
	    }],
	    staticClass: "weui-actionsheet weui-actionsheet_toggle"
	  }, [_vm._c('div', {
	    staticClass: "weui-actionsheet__menu"
	  }, _vm._l((_vm.actions), function(item) {
	    return _vm._c('div', {
	      staticClass: "weui-actionsheet__cell",
	      on: {
	        "click": function($event) {
	          _vm.itemClick(item)
	        }
	      }
	    }, [_vm._v(_vm._s(item.name))])
	  })), _vm._v(" "), (_vm.cancelText) ? _vm._c('div', {
	    staticClass: "weui-actionsheet__action"
	  }, [_vm._c('div', {
	    staticClass: "weui-actionsheet__cell",
	    on: {
	      "click": function($event) {
	        _vm.currentValue = false
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.cancelText))])]) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.type === 'android') ? _vm._c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.currentValue),
	      expression: "currentValue"
	    }],
	    staticClass: "weui-skin_android"
	  }, [_vm._c('div', {
	    staticClass: "weui-mask",
	    on: {
	      "click": function($event) {
	        _vm.currentValue = false
	      }
	    }
	  }), _vm._v(" "), _vm._c('div', {
	    staticClass: "weui-actionsheet"
	  }, [_vm._c('div', {
	    staticClass: "weui-actionsheet__menu"
	  }, _vm._l((_vm.actions), function(item) {
	    return _vm._c('div', {
	      staticClass: "weui-actionsheet__cell",
	      on: {
	        "click": function($event) {
	          _vm.itemClick(item)
	        }
	      }
	    }, [_vm._v(_vm._s(item.name))])
	  }))])]) : _vm._e()])
	},staticRenderFns: []}

/***/ }
/******/ ]);