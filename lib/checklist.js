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

	var _checklist = __webpack_require__(33);

	Object.defineProperty(exports, 'default', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_checklist).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(34)

	/* template */
	var __vue_template__ = __webpack_require__(35)
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

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"weui/dist/style/weui.min.css\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	exports.default = {
	  name: 'wv-checklist',

	  props: {
	    max: Number,
	    title: String,
	    align: String,
	    options: {
	      type: Array,
	      required: true
	    },
	    value: Array
	  },

	  data: function data() {
	    return {
	      currentValue: this.value
	    };
	  },


	  computed: {
	    limit: function limit() {
	      return this.max < this.currentValue.length;
	    }
	  },

	  watch: {
	    currentValue: function currentValue(val) {
	      if (this.limit) val.pop();
	      this.$emit('input', val);
	    },
	    value: function value(val) {
	      this.currentValue = val;
	    }
	  }
	};

/***/ },

/***/ 35:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('div', [(_vm.title) ? _vm._c('div', {
	    staticClass: "weui-cells__title"
	  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm._v(" "), _vm._c('div', {
	    staticClass: "weui-cells weui-cells_checkbox"
	  }, _vm._l((_vm.options), function(option) {
	    return _vm._c('label', {
	      staticClass: "weui-cell weui-check__label"
	    }, [_vm._c('div', {
	      staticClass: "weui-cell__hd"
	    }, [_vm._c('input', {
	      directives: [{
	        name: "model",
	        rawName: "v-model",
	        value: (_vm.currentValue),
	        expression: "currentValue"
	      }],
	      staticClass: "weui-check",
	      attrs: {
	        "type": "checkbox",
	        "disabled": option.disabled
	      },
	      domProps: {
	        "value": option.value || option,
	        "checked": Array.isArray(_vm.currentValue) ? _vm._i(_vm.currentValue, option.value || option) > -1 : _vm._q(_vm.currentValue, true)
	      },
	      on: {
	        "change": function($event) {
	          var $$a = _vm.currentValue,
	            $$el = $event.target,
	            $$c = $$el.checked ? (true) : (false);
	          if (Array.isArray($$a)) {
	            var $$v = option.value || option,
	              $$i = _vm._i($$a, $$v);
	            if ($$c) {
	              $$i < 0 && (_vm.currentValue = $$a.concat($$v))
	            } else {
	              $$i > -1 && (_vm.currentValue = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
	            }
	          } else {
	            _vm.currentValue = $$c
	          }
	        }
	      }
	    }), _vm._v(" "), _vm._c('i', {
	      staticClass: "weui-icon-checked"
	    })]), _vm._v(" "), _vm._c('div', {
	      staticClass: "weui-cell__bd"
	    }, [_vm._c('p', [_vm._v(_vm._s(option.label || option))])])])
	  }))])
	},staticRenderFns: []}

/***/ }

/******/ });