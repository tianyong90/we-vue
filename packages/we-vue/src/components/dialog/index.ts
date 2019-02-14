import Vue from 'vue'
import DialogComponent from './dialog'

type DialogOptions = {
  // TODO
}

type DialogType = {
  visible: boolean
  resolve: (action: action) => void
  reject: (action: action) => void
} & Vue

type action = 'cancel' | 'confirm'

let instance: DialogType

const createInstance = () => {
  instance = new (Vue.extend(DialogComponent))({
    el: document.createElement('div'),
  })

  instance.$on('update:visible', (visible: boolean) => {
    instance.visible = visible
  })

  document.body.appendChild(instance.$el)
}

function Dialog (options: DialogOptions) {
  return new Promise((resolve, reject) => {
    if (!instance) {
      createInstance()
    }

    Object.assign(instance, {
      resolve,
      reject,
      ...options,
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
  callback: (action: action) => {
    instance[action === 'confirm' ? 'resolve' : 'reject'](action)
  },
}

Dialog.currentOptions = Dialog.defaultOptions

Dialog.alert = function (options: DialogOptions) {
  return Dialog({
    ...Dialog.currentOptions,
    ...options,
  })
}

Dialog.confirm = function (options: DialogOptions) {
  return Dialog({
    ...Dialog.currentOptions,
    showCancelButton: true,
    ...options,
  })
}

Dialog.close = function () {
  if (instance) {
    instance.visible = false
  }
}

Dialog.setDefaultOptions = function (options: DialogOptions) {
  Object.assign(Dialog.currentOptions, options)
}

Dialog.resetDefaultOptions = function () {
  Dialog.currentOptions = { ...Dialog.defaultOptions }
}

Vue.prototype.$dialog = Dialog

export default Dialog
