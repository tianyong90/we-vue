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

	var _textarea = __webpack_require__(103);

	Object.defineProperty(exports, 'default', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_textarea).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },

/***/ 103:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(104)

	/* template */
	var __vue_template__ = __webpack_require__(105)
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

/***/ 104:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"weui/dist/style/weui.min.css\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	exports.default = {
	  name: 'wv-textarea',

	  props: {
	    placeholder: String,
	    showCounter: {
	      type: Boolean,
	      default: true
	    },
	    rows: {
	      type: Number,
	      default: 3
	    },
	    maxLength: {
	      type: Number,
	      default: 100
	    },
	    disabled: Boolean,
	    readonly: Boolean,
	    value: String
	  },

	  data: function data() {
	    return {
	      currentValue: this.value
	    };
	  },


	  computed: {
	    length: function length() {
	      return this.currentValue.length;
	    }
	  },

	  mounted: function mounted() {
	    this.currentValue = this.value;
	  },


	  watch: {
	    currentValue: function currentValue(val) {
	      this.$emit('input', val);
	    },
	    value: function value(val) {
	      if (this.maxLength && this.value.length > this.maxLength) {
	        val = val.slice(0, this.maxLength);
	      }

	      this.currentValue = val;
	    }
	  }
	};

/***/ },

/***/ 105:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('div', {
	    staticClass: "weui-cells weui-cells_form"
	  }, [_vm._c('div', {
	    staticClass: "weui-cell"
	  }, [_vm._c('div', {
	    staticClass: "weui-cell__bd"
	  }, [_vm._c('textarea', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.currentValue),
	      expression: "currentValue"
	    }],
	    ref: "rextarea",
	    staticClass: "weui-textarea",
	    attrs: {
	      "placeholder": _vm.placeholder,
	      "rows": _vm.rows,
	      "disabled": _vm.disabled,
	      "readonly": _vm.readonly
	    },
	    domProps: {
	      "value": _vm._s(_vm.currentValue)
	    },
	    on: {
	      "change": function($event) {
	        _vm.$emit('change', _vm.currentValue)
	      },
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.currentValue = $event.target.value
	      }
	    }
	  }), _vm._v(" "), (_vm.showCounter) ? _vm._c('div', {
	    staticClass: "weui-textarea-counter"
	  }, [_vm._c('span', [_vm._v(_vm._s(_vm.length))]), _vm._v("/" + _vm._s(_vm.maxLength))]) : _vm._e()])])])
	},staticRenderFns: []}

/***/ }

/******/ });