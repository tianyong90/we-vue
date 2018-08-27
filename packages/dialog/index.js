import Vue from 'vue'
import DialogComponent from './dialog.vue'

let instance

let CONFIRM_TEXT = '确定'
let CANCEL_TEXT = '取消'

let defaultOptions = {
  visible: true,
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
      ...defaultOptions,
      ...options
    })
  })
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
  instance.visible = false
}

Vue.prototype.$dialog = Dialog

export default Dialog
export {
  DialogComponent as Dialog
}
