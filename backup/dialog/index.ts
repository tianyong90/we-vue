import Vue from 'vue'
import DialogComponent from './dialog.vue'

let instance

const createInstance = () => {
  instance = new (Vue.extend(DialogComponent))({
    el: document.createElement('div')
  })

  instance.$on('update:visible', visible => {
    instance.visible = visible
  })

  document.body.appendChild(instance.$el)
}

const Dialog = options => {
  return new Promise((resolve, reject) => {
    if (!instance) {
      createInstance()
    }

    Object.assign(instance, {
      resolve,
      reject,
      ...options
    })
  })
}

Dialog.defaultOptions = {
  visible: true,
  title: '',
  message: '',
  type: '',
  modalFade: false,
  lockScroll: false,
  closeOnClickModal: true,
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  callback: action => {
    instance[action === 'confirm' ? 'resolve' : 'reject'](action)
  }
}

Dialog.alert = options =>
  Dialog({
    ...Dialog.currentOptions,
    ...options
  })

Dialog.confirm = options =>
  Dialog({
    ...Dialog.currentOptions,
    showCancelButton: true,
    ...options
  })

Dialog.close = () => {
  if (instance) {
    instance.visible = false
  }
}

Dialog.setDefaultOptions = options => {
  Object.assign(Dialog.currentOptions, options)
}

Dialog.resetDefaultOptions = () => {
  Dialog.currentOptions = { ...Dialog.defaultOptions }
}

Dialog.install = () => {
  Vue.use(DialogComponent)
}

Vue.prototype.$dialog = Dialog
Dialog.resetDefaultOptions()

export default Dialog
