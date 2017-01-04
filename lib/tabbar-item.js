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

	var _tabbarItem = __webpack_require__(100);

	Object.defineProperty(exports, 'default', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_tabbarItem).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },

/***/ 100:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(101)

	/* template */
	var __vue_template__ = __webpack_require__(102)
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

/***/ 101:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"weui/dist/style/weui.min.css\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	function cleanPath(path) {
	  return path.replace(/\/\//g, '/');
	}

	exports.default = {
	  name: 'wv-tabbar-item',

	  props: {
	    to: String,
	    isOn: Boolean
	  },

	  computed: {
	    href: function href() {
	      var _this = this;

	      var href = void 0;

	      if (this.$router && this.to) {
	        var base = this.$router.history.base;
	        var resolved = this.$router.match(this.to);
	        var fullPath = resolved.redirectedFrom || resolved.fullPath;

	        href = base ? cleanPath(base + fullPath) : fullPath;
	      } else {
	        href = this.to;
	      }

	      if (href && !this.added && this.$router) {
	        this.$nextTick(function () {
	          _this.added = true;
	          _this.$el.addEventListener('click', _this.handleClick);
	        });
	      }
	      return href;
	    }
	  },

	  methods: {
	    handleClick: function handleClick($event) {
	      $event.preventDefault();
	      this.$router.push(this.href);
	    }
	  }
	};

/***/ },

/***/ 102:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('a', {
	    staticClass: "weui-tabbar__item",
	    class: {
	      'weui-bar__item_on': _vm.isOn
	    },
	    attrs: {
	      "href": _vm.href
	    }
	  }, [_vm._t("icon"), _vm._v(" "), _vm._c('p', {
	    staticClass: "weui-tabbar__label"
	  }, [_vm._t("default")], 2)], 2)
	},staticRenderFns: []}

/***/ }

/******/ });