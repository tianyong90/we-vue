import Vue, { PluginFunction } from 'vue'
import ToastComponent from './toast'
import { isObj } from '../../utils'

type ToastOptions = {
  visible: boolean
  duration: number
  mask: boolean
  message: string
  type: string
  icon: string
}

type ToastParams = string | Partial<ToastOptions>

type InstanceType = Vue & {
  [key: string]: any
}

export interface Toast {
  (params: ToastParams): InstanceType
  text (msg: string): InstanceType
  success (msg: string): InstanceType
  loading (msg: string): InstanceType
  fail (msg: string): InstanceType
  close (all?: boolean): void
  setDefaultOptions (options: Partial<ToastOptions>): void
  resetDefaultOptions (): void
  allowMultiple (allow: boolean): void
  install: PluginFunction<Vue>
  defaultOptions: ToastOptions
}

const parseOptions = (params: ToastParams): Partial<ToastOptions> => (isObj(params) ? <object>params : { message: params })

const defaultOptions: ToastOptions = {
  visible: true,
  duration: 2000,
  mask: true,
  message: '',
  type: 'success',
  icon: 'success-no-circle',
}

let queue: InstanceType[] = []
let singleton: boolean = true

const createInstance: () => InstanceType = () => {
  if (!queue.length || !singleton) {
    const toast: InstanceType = new (Vue.extend(ToastComponent))({
      el: document.createElement('div'),
    })

    document.body.appendChild(toast.$el)
    queue.push(toast)
  }
  return queue[queue.length - 1]
}

const Toast = <Toast> function (options: ToastParams) {
  const toast = createInstance()

  options = {
    ...Toast.defaultOptions,
    ...parseOptions(options),
  }

  if ((options as ToastOptions).type === 'fail') {
    (options as ToastOptions).icon = 'warn'
  }

  Object.assign(toast, options)
  clearTimeout(toast.timer)

  if ((options as ToastOptions).duration! > 0) {
    toast.timer = setTimeout(() => {
      toast.visible = false
    }, (options as ToastOptions).duration)
  }

  return toast
}

const createMethod = (type: string) => (options: ToastOptions | string) => {
  return Toast({
    type,
    ...parseOptions(options),
  })
}

Toast.defaultOptions = defaultOptions

Toast.text = createMethod('text')
Toast.success = createMethod('success')
Toast.fail = createMethod('fail')
Toast.loading = createMethod('loading')

Toast.close = function (all: boolean = true): void {
  if (queue.length > 1) {
    if (all) {
      queue.forEach(toast => {
        toast.close()
      })
      queue = []
    } else {
      queue.shift()!.close()
    }
  } else if (queue.length === 1) {
    queue[0].close()
  }
}

Toast.setDefaultOptions = function (options: Partial<ToastOptions>) {
  Toast.defaultOptions = { ...defaultOptions, ...options }
}

Toast.resetDefaultOptions = function () {
  Toast.defaultOptions = defaultOptions
}

Toast.allowMultiple = function (allow = true) {
  singleton = !allow
}

Toast.install = () => {
  // TODO
}

// TODO: 放到 install？
Vue.prototype.$toast = Toast

export { Toast }
export default Toast
