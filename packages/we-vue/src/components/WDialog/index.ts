import Vue, { PluginFunction } from 'vue'
import DialogComponent from './WDialog'

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

let instance: InstanceType

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

export interface WDialog {
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

const WDialog = <WDialog> function (options: DialogParams) {
  options = {
    ...WDialog.defaultOptions,
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

WDialog.defaultOptions = defaultOptions

WDialog.alert = function (options: DialogParams) {
  return WDialog(options)
}

WDialog.confirm = function (options: DialogParams) {
  options.showCancelButton = true

  return WDialog(options)
}

WDialog.close = function () {
  if (instance) {
    instance.visible = false
  }
}

WDialog.setDefaultOptions = function (options: Partial<DialogOptions>) {
  WDialog.defaultOptions = { ...defaultOptions, ...options }
}

WDialog.resetDefaultOptions = function () {
  WDialog.defaultOptions = defaultOptions
}

WDialog.install = () => {
  // TODO
}

Vue.prototype.$dialog = WDialog

export { WDialog }
export default WDialog
