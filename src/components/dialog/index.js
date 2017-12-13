import Vue from 'vue'
import DialogComponent from './dialog.vue'

let instance

let CONFIRM_TEXT = '确定'
let CANCEL_TEXT = '取消'

let defaultOptions = {
  value: true,
  title: '提示',
  message: '',
  type: '',
  modalFade: false,
  lockScroll: false,
  closeOnClickModal: true,
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonText: CONFIRM_TEXT,
  cancelButtonText: CANCEL_TEXT,
  callback: action => {
    instance[action === 'confirm' ? 'resolve' : 'reject'](action)
  }
}

const initInstance = () => {
  const DialogConstructor = Vue.extend(DialogComponent)

  instance = new DialogConstructor({
    el: document.createElement('div')
  })

  instance.$on('input', value => {
    instance.value = value
  })

  document.body.appendChild(instance.$el)
}

const Dialog = options => {
  return new Promise((resolve, reject) => {
    if (!instance) {
      initInstance()
    }

    Object.assign(instance, {
      resolve,
      reject,
      ...options
    })
  })
}

Dialog.setDefaults = defaults => {
  Dialog.defaults = defaults
}

Dialog.alert = options => Dialog({
  ...defaultOptions,
  ...options
})

Dialog.confirm = options => Dialog({
  ...defaultOptions,
  showCancelButton: true,
  ...options
})

Dialog.close = () => {
  instance.value = false
}

Vue.prototype.$dialog = Dialog

export default Dialog
export {
  DialogComponent as Dialog
}
