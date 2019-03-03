import Vue, { PluginFunction } from 'vue'
import DialogComponent from './dialog'

type DialogOptions = {
  visible: boolean
  title: string
  message: string
  type: string
  modalFade: boolean
  lockScroll: boolean
  skin: string
  closeOnClickModal: boolean
  showConfirmButton: boolean
  showCancelButton: boolean
  confirmButtonText: string
  cancelButtonText: string
  callback: (action: action) => void
}

type DialogParams = Partial<DialogOptions>

type InstanceType = Vue & {
  visible: boolean
  resolve: (action: action) => void
  reject: (action: action) => void
}

type action = 'cancel' | 'confirm'

const defaultOptions: DialogOptions = {
  visible: true,
  title: '',
  message: '',
  type: '',
  modalFade: false,
  lockScroll: false,
  skin: 'ios',
  closeOnClickModal: true,
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  callback: (action: action) => {
    instance[action === 'confirm' ? 'resolve' : 'reject'](action)
  },
}

let instance: InstanceType

export interface Dialog {
  (params: DialogParams): Promise<any>
  alert (params: DialogParams): Promise<any>
  confirm (params: DialogParams): Promise<any>
  close (): void
  setDefaultOptions (options: Partial<DialogOptions>): void
  resetDefaultOptions (): void
  install: PluginFunction<Vue>
  defaultOptions: DialogOptions
}

const createInstance = () => {
  instance = new (Vue.extend(DialogComponent))({
    el: document.createElement('div'),
  })

  instance.$on('update:visible', (visible: boolean) => {
    instance.visible = visible
  })

  document.body.appendChild(instance.$el)
}

const Dialog = <Dialog> function (options: DialogParams) {
  options = {
    ...Dialog.defaultOptions,
    ...options,
  }

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

Dialog.defaultOptions = defaultOptions

Dialog.alert = function (options: DialogParams) {
  return Dialog(options)
}

Dialog.confirm = function (options: DialogParams) {
  options.showCancelButton = true

  return Dialog(options)
}

Dialog.close = function () {
  if (instance) {
    instance.visible = false
  }
}

Dialog.setDefaultOptions = function (options: Partial<DialogOptions>) {
  Dialog.defaultOptions = { ...defaultOptions, ...options }
}

Dialog.resetDefaultOptions = function () {
  Dialog.defaultOptions = defaultOptions
}

Dialog.install = () => {
  // TODO
}

Vue.prototype.$dialog = Dialog

export { Dialog }
export default Dialog
