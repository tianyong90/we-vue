var CONFIRM_TEXT = '确定'
var CANCEL_TEXT = '取消'

var defaults = {
  title: '提示',
  message: '',
  type: '',
  modalFade: false,
  lockScroll: false,
  closeOnClickModal: true,
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonText: CONFIRM_TEXT,
  cancelButtonText: CANCEL_TEXT
}

import Vue from 'vue'
import dislogComponent from './dialog.vue'

var merge = function (target) {
  for (var i = 1, j = arguments.length; i < j; i++) {
    var source = arguments[i]
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        var value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }

  return target
}

var DialogConstructor = Vue.extend(dislogComponent)

var currentDialog, instance
var dialogQueue = []

const defaultCallback = action => {
  if (currentDialog) {
    var callback = currentDialog.callback
    if (typeof callback === 'function') {
      if (instance.showInput) {
        callback(instance.inputValue, action)
      } else {
        callback(action)
      }
    }
    if (currentDialog.resolve) {
      var $type = currentDialog.options.$type
      if ($type === 'confirm') {
        if (action === 'confirm') {
          if (instance.showInput) {
            currentDialog.resolve({ value: instance.inputValue, action })
          } else {
            currentDialog.resolve(action)
          }
        } else if (action === 'cancel' && currentDialog.reject) {
          currentDialog.reject(action)
        }
      } else {
        currentDialog.resolve(action)
      }
    }
  }
}

var initInstance = function () {
  instance = new DialogConstructor({
    el: document.createElement('div')
  })

  instance.callback = defaultCallback
}

var showNextMsg = function () {
  if (!instance) {
    initInstance()
  }

  if (!instance.value || instance.closeTimer) {
    if (dialogQueue.length > 0) {
      currentDialog = dialogQueue.shift()

      var options = currentDialog.options
      for (var prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop]
        }
      }
      if (options.callback === undefined) {
        instance.callback = defaultCallback
      }
      ['modal', 'showClose', 'closeOnClickModal', 'closeOnPressEscape'].forEach(prop => {
        if (instance[prop] === undefined) {
          instance[prop] = true
        }
      })
      document.body.appendChild(instance.$el)

      Vue.nextTick(() => {
        instance.value = true
      })
    }
  }
}

var Dialog = function (options, callback) {
  if (typeof options === 'string') {
    options = {
      title: options
    }
    if (arguments[1]) {
      options.message = arguments[1]
    }
    if (arguments[2]) {
      options.type = arguments[2]
    }
  } else if (options.callback && !callback) {
    callback = options.callback
  }

  if (typeof Promise !== 'undefined') {
    return new Promise(function(resolve, reject) { // eslint-disable-line
      dialogQueue.push({
        options: merge({}, defaults, Dialog.defaults || {}, options),
        callback: callback,
        resolve: resolve,
        reject: reject
      })

      showNextMsg()
    })
  } else {
    dialogQueue.push({
      options: merge({}, defaults, Dialog.defaults || {}, options),
      callback: callback
    })

    showNextMsg()
  }
}

Dialog.setDefaults = function (defaults) {
  Dialog.defaults = defaults
}

Dialog.alert = function (message, title, options) {
  if (typeof title === 'object') {
    options = title
    title = ''
  }
  return Dialog(merge({
    title: title,
    message: message,
    $type: 'alert',
    closeOnPressEscape: false,
    closeOnClickModal: false
  }, options))
}

Dialog.confirm = function (message, title, options) {
  if (typeof title === 'object') {
    options = title
    title = ''
  }
  return Dialog(merge({
    title: title,
    message: message,
    $type: 'confirm',
    showCancelButton: true
  }, options))
}

Dialog.close = function () {
  instance.value = false
  dialogQueue = []
  currentDialog = null
}

export default Dialog
export { Dialog }
