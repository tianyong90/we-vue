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

	var _input = __webpack_require__(59);

	Object.defineProperty(exports, 'default', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_input).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },

/***/ 59:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(60)

	/* template */
	var __vue_template__ = __webpack_require__(61)
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

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"weui/dist/style/weui.min.css\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	exports.default = {
	  name: 'wv-input',

	  props: {
	    type: {
	      type: String,
	      default: 'text'
	    },
	    label: String,
	    placeholder: String,
	    value: String,
	    readonly: Boolean,
	    disabled: Boolean,
	    state: {
	      type: String,
	      default: 'default'
	    }
	  },

	  data: function data() {
	    return {
	      active: false,
	      currentValue: this.value
	    };
	  },


	  methods: {
	    doCloseActive: function doCloseActive() {
	      this.active = false;
	    },
	    handleInput: function handleInput(event) {
	      this.currentValue = event.target.value;
	    },
	    handleClear: function handleClear() {
	      if (this.disabled || this.readonly) return;
	      this.currentValue = '';
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

/***/ 61:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('div', {
	    staticClass: "weui-cell"
	  }, [_vm._c('div', {
	    staticClass: "weui-cell__hd"
	  }, [_vm._c('label', {
	    staticClass: "weui-label",
	    domProps: {
	      "innerHTML": _vm._s(_vm.label)
	    }
	  })]), _vm._v(" "), _vm._c('div', {
	    staticClass: "weui-cell__bd"
	  }, [_vm._c('input', {
	    staticClass: "weui-input",
	    attrs: {
	      "rel": "input",
	      "type": _vm.type,
	      "number": _vm.type === 'number',
	      "placeholder": _vm.placeholder,
	      "readonly": _vm.readonly
	    },
	    domProps: {
	      "value": _vm.currentValue
	    },
	    on: {
	      "focus": function($event) {
	        _vm.active = true
	      },
	      "change": function($event) {
	        _vm.$emit('change', _vm.currentValue)
	      },
	      "input": _vm.handleInput
	    }
	  })])])
	},staticRenderFns: []}

/***/ }

/******/ });