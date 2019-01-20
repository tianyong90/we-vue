import Vue from 'vue'
import DialogComponent from './dialog.vue'

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

namespace Dialog {
  export const defaultOptions: DialogOptions = {
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

  export let currentOptions: DialogOptions = defaultOptions

  export function alert (options: DialogOptions) {
    return Dialog({
      ...Dialog.currentOptions,
      ...options,
    })
  }

  export function confirm (options: DialogOptions) {
    return Dialog({
      ...Dialog.currentOptions,
      showCancelButton: true,
      ...options,
    })
  }

  export function close () {
    if (instance) {
      instance.visible = false
    }
  }

  export function setDefaultOptions (options: DialogOptions) {
    Object.assign(Dialog.currentOptions, options)
  }

  export function resetDefaultOptions () {
    currentOptions = { ...defaultOptions }
  }
}

Dialog.resetDefaultOptions()

Vue.prototype.$dialog = Dialog

export default Dialog
