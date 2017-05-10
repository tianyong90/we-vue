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
/******/ 	return __webpack_require__(__webpack_require__.s = 334);
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

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__picker_vue__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__picker_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__picker_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__picker_vue___default.a; });


/***/ }),

/***/ 12:
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_draggable_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_css3transform__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_css3transform___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_css3transform__);





var ITEM_HEIGHT = 34;

var VISIBLE_ITEM_COUNT = 7;

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'wv-picker-slot',

  props: {
    values: {
      type: Array,
      default: []
    },
    value: {},
    valueKey: String
  },

  created: function created() {
    this.dragState = {};
  },
  data: function data() {
    return {
      isDragging: false,
      mutatingValues: this.values,
      currentValue: this.value
    };
  },


  computed: {
    minTranslateY: function minTranslateY() {
      return ITEM_HEIGHT * (Math.ceil(VISIBLE_ITEM_COUNT / 2) - this.mutatingValues.length);
    },
    maxTranslateY: function maxTranslateY() {
      return ITEM_HEIGHT * Math.floor(VISIBLE_ITEM_COUNT / 2);
    },
    valueIndex: function valueIndex() {
      return this.mutatingValues.indexOf(this.currentValue);
    }
  },

  mounted: function mounted() {
    var _this = this;

    this.ready = true;
    this.currentValue = this.value;
    this.$emit('input', this.currentValue);

    var wrapper = this.$refs.listWrapper;
    __WEBPACK_IMPORTED_MODULE_1_css3transform___default()(wrapper, true);

    this.onValueChange();

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_draggable_js__["a" /* default */])(this.$el, {
      start: function start(event) {
        _this.isDragging = true;
        var dragState = _this.dragState;

        dragState.start = new Date();
        dragState.startPositionY = event.clientY;
        dragState.startTranslateY = wrapper.translateY;
      },
      drag: function drag(event) {
        var dragState = _this.dragState;
        var deltaY = event.clientY - dragState.startPositionY;

        var tempTranslateY = dragState.startTranslateY + deltaY;

        if (tempTranslateY <= _this.minTranslateY) {
          wrapper.translateY = _this.minTranslateY;
        } else if (tempTranslateY >= _this.maxTranslateY) {
          wrapper.translateY = _this.maxTranslateY;
        } else {
          wrapper.translateY = dragState.startTranslateY + deltaY;
        }

        dragState.currentPosifionY = event.clientY;
        dragState.currentTranslateY = wrapper.translateY;
        dragState.velocityTranslate = dragState.currentTranslateY - dragState.prevTranslateY;

        dragState.prevTranslateY = dragState.currentTranslateY;
      },
      end: function end(event) {
        _this.isDragging = false;

        var dragState = _this.dragState;
        var momentumRatio = 7;
        var currentTranslate = wrapper.translateY;
        var duration = new Date() - dragState.start;

        var momentumTranslate = void 0;
        if (duration < 300) {
          momentumTranslate = currentTranslate + dragState.velocityTranslate * momentumRatio;
        }

        _this.$nextTick(function () {
          var translate = void 0;
          if (momentumTranslate) {
            translate = Math.round(momentumTranslate / ITEM_HEIGHT) * ITEM_HEIGHT;
          } else {
            translate = Math.round(currentTranslate / ITEM_HEIGHT) * ITEM_HEIGHT;
          }

          translate = Math.max(Math.min(translate, _this.maxTranslateY), _this.minTranslateY);

          wrapper.translateY = translate;
          _this.currentValue = _this.translate2value(translate);
        });
        _this.dragState = {};
      }
    });
  },


  methods: {
    value2translate: function value2translate(value) {
      var values = this.mutatingValues;
      var valueIndex = values.indexOf(value);
      var offset = Math.floor(VISIBLE_ITEM_COUNT / 2);

      if (valueIndex !== -1) {
        return (valueIndex - offset) * -ITEM_HEIGHT;
      }
    },
    translate2value: function translate2value(translate) {
      translate = Math.round(translate / ITEM_HEIGHT) * ITEM_HEIGHT;
      var index = -(translate - Math.floor(VISIBLE_ITEM_COUNT / 2) * ITEM_HEIGHT) / ITEM_HEIGHT;

      return this.mutatingValues[index];
    },
    onValueChange: function onValueChange() {
      var value = this.currentValue;
      var wrapper = this.$refs.listWrapper;

      wrapper.translateY = this.value2translate(value);
    },
    onValuesChange: function onValuesChange() {
      console.log('values changed');
    }
  },

  watch: {
    values: function values(val) {
      this.mutatingValues = val;
    },
    mutatingValues: function mutatingValues(val) {
      if (this.valueIndex === -1) {
        this.currentValue = (val || [])[0];
      }
    },
    currentValue: function currentValue(val) {
      this.onValueChange();
      this.$emit('input', val);
    }
  }
});

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__picker_slot_vue__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__picker_slot_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__picker_slot_vue__);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'wv-picker',

  components: {
    WvPickerSlot: __WEBPACK_IMPORTED_MODULE_0__picker_slot_vue___default.a
  },

  props: {
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    slots: {
      type: Array
    },
    valueKey: String,
    value: Boolean
  },

  data: function data() {
    return {
      currentValue: this.value
    };
  },


  computed: {
    values: function values() {
      var slots = this.slots || [];
      var values = [];
      slots.forEach(function (slot) {
        values.push(slot.value);
      });

      return values;
    },
    slotCount: function slotCount() {
      var slots = this.slots || [];
      return slots.length;
    }
  },

  created: function created() {
    this.$on('slotValueChange', this.slotValueChange);
    var slots = this.slots || [];
    this.values = [];
    var values = this.values;
    var valueIndexCount = 0;
    slots.forEach(function (slot) {
      slot.valueIndex = valueIndexCount++;
      values[slot.valueIndex] = (slot.values || [])[slot.defaultIndex || 0];
    });
  },


  methods: {
    slotValueChange: function slotValueChange() {
      this.$emit('change', this, this.values);
    },
    getSlot: function getSlot(slotIndex) {
      var slots = this.slots || [];
      var count = 0;
      var target = void 0;
      var children = this.$children.filter(function (child) {
        return child.$options.name === 'picker-slot';
      });

      slots.forEach(function (slot, index) {
        if (!slot.divider) {
          if (slotIndex === count) {
            target = children[index];
          }
          count++;
        }
      });

      return target;
    },
    getSlotValue: function getSlotValue(index) {
      var slot = this.getSlot(index);
      if (slot) {
        return slot.value;
      }
      return null;
    },
    setSlotValue: function setSlotValue(index, value) {
      var slot = this.getSlot(index);
      if (slot) {
        slot.currentValue = value;
      }
    },
    getSlotValues: function getSlotValues(index) {
      var slot = this.getSlot(index);
      if (slot) {
        return slot.mutatingValues;
      }
      return null;
    },
    setSlotValues: function setSlotValues(index, values) {
      var slot = this.getSlot(index);
      if (slot) {
        slot.mutatingValues = values;
      }
    },
    getValues: function getValues() {
      return this.values;
    },
    setValues: function setValues(values) {
      var _this = this;

      var slotCount = this.slotCount;
      values = values || [];
      if (slotCount !== values.length) {
        throw new Error('values length is not equal slot count.');
      }

      values.forEach(function (value, index) {
        _this.setSlotValue(index, value);
      });
    },
    cancel: function cancel() {
      this.currentValue = false;
    },
    confirm: function confirm() {
      this.currentValue = false;
    }
  },

  watch: {
    value: function value(val) {
      this.currentValue = val;
    },
    currentValue: function currentValue(val) {
      this.$emit('input', val);
    }
  }
});

/***/ }),

/***/ 219:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 221:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(221)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(159),
  /* template */
  __webpack_require__(300),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-c9e4e9e0",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(219)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(160),
  /* template */
  __webpack_require__(298),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-b363c7aa",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 298:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentValue),
      expression: "currentValue"
    }]
  }, [_c('div', {
    staticClass: "weui-mask weui-animate-fade-in"
  }), _vm._v(" "), _c('div', {
    staticClass: "weui-picker weui-animate-slide-up"
  }, [_c('div', {
    staticClass: "weui-picker__hd"
  }, [_c('a', {
    staticClass: "weui-picker__action",
    on: {
      "click": _vm.cancel
    }
  }, [_vm._v(_vm._s(_vm.cancelText))]), _vm._v(" "), _c('a', {
    staticClass: "weui-picker__action",
    on: {
      "click": _vm.confirm
    }
  }, [_vm._v(_vm._s(_vm.confirmText))])]), _vm._v(" "), _c('div', {
    staticClass: "weui-picker__bd"
  }, _vm._l((_vm.slots), function(slot) {
    return _c('wv-picker-slot', {
      attrs: {
        "values": slot.values || [],
        "valueKey": _vm.valueKey
      },
      model: {
        value: (_vm.values[slot.valueIndex]),
        callback: function($$v) {
          var $$exp = _vm.values,
            $$idx = slot.valueIndex;
          if (!Array.isArray($$exp)) {
            _vm.values[slot.valueIndex] = $$v
          } else {
            $$exp.splice($$idx, 1, $$v)
          }
        },
        expression: "values[slot.valueIndex]"
      }
    })
  }))])])
},staticRenderFns: []}

/***/ }),

/***/ 300:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "weui-picker__group"
  }, [_c('div', {
    staticClass: "weui-picker__mask"
  }), _vm._v(" "), _c('div', {
    staticClass: "weui-picker__indicator"
  }), _vm._v(" "), _c('div', {
    ref: "listWrapper",
    staticClass: "weui-picker__content"
  }, _vm._l((_vm.mutatingValues), function(item) {
    return _c('div', {
      staticClass: "weui-picker__item",
      class: {
        'weui-picker__item_disabled': typeof item === 'object' && item['disabled']
      },
      domProps: {
        "textContent": _vm._s(typeof item === 'object' && item[_vm.valueKey] ? item[_vm.valueKey] : item)
      }
    })
  }))])
},staticRenderFns: []}

/***/ }),

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(116);


/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);

var isDragging = false;
var supportTouch = !__WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$isServer && 'ontouchstart' in window;

/* harmony default export */ __webpack_exports__["a"] = (function (element, options) {
  var moveFn = function moveFn(event) {
    if (options.drag) {
      options.drag(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
    }
  };

  var endFn = function endFn(event) {
    if (!supportTouch) {
      document.removeEventListener('mousemove', moveFn);
      document.removeEventListener('mouseup', endFn);
    }
    document.onselectstart = null;
    document.ondragstart = null;

    isDragging = false;

    if (options.end) {
      options.end(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
    }
  };

  element.addEventListener(supportTouch ? 'touchstart' : 'mousedown', function (event) {
    if (isDragging) return;
    event.preventDefault();
    document.onselectstart = function () {
      return false;
    };
    document.ondragstart = function () {
      return false;
    };

    if (!supportTouch) {
      document.addEventListener('mousemove', moveFn);
      document.addEventListener('mouseup', endFn);
    }
    isDragging = true;

    if (options.start) {
      options.start(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
    }
  });

  if (supportTouch) {
    element.addEventListener('touchmove', moveFn);
    element.addEventListener('touchend', endFn);
    element.addEventListener('touchcancel', endFn);
  }
});;

/***/ }),

/***/ 90:
/***/ (function(module, exports) {

module.exports = require("css3transform");

/***/ })

/******/ });