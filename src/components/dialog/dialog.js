import Vue from 'vue'
import dislogComponent from './dialog.vue'

let CONFIRM_TEXT = '确定'
let CANCEL_TEXT = '取消'

let defaults = {
  title: '提示',
  message: '',
  type: '',
  modalFade: false,
  lockScroll: false,
  closeOnClickModal: true,
  showConfirmBtn: true,
  showCancelBtn: false,
  confirmText: CONFIRM_TEXT,
  cancelText: CANCEL_TEXT
}

let merge = function (target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i]
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }

  return target
}

let DialogConstructor = Vue.extend(dislogComponent)

let currentDialog, instance
let dialogQueue = []

const defaultCallback = action => {
  if (currentDialog) {
    let callback = currentDialog.callback
    if (typeof callback === 'function') {
      if (instance.showInput) {
        callback(instance.inputValue, action)
      } else {
        callback(action)
      }
    }
    if (currentDialog.resolve) {
      let $type = currentDialog.options.$type
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

let initInstance = function () {
  instance = new DialogConstructor({
    el: document.createElement('div')
  })

  instance.callback = defaultCallback
}

let showNextMsg = function () {
  if (!instance) {
    initInstance()
  }

  if (!instance.value || instance.closeTimer) {
    if (dialogQueue.length > 0) {
      currentDialog = dialogQueue.shift()

      let options = currentDialog.options
      for (let prop in options) {
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

let Dialog = function (options, callback) {
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
    return new Promise(function (resolve, reject) { // eslint-disable-line
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
    closeOnClickModal: false,
    showCancelBtn: false
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
