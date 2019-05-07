import Vue, { PluginFunction } from 'vue'
import ToastComponent from './WToast'
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

export interface WToast {
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
  mask: false,
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

const WToast = <WToast> function (options: ToastParams) {
  const toast = createInstance()

  options = {
    ...WToast.defaultOptions,
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
  return WToast({
    type,
    ...parseOptions(options),
  })
}

WToast.defaultOptions = defaultOptions

WToast.text = createMethod('text')
WToast.success = createMethod('success')
WToast.fail = createMethod('fail')
WToast.loading = createMethod('loading')

WToast.close = function (all: boolean = true): void {
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

WToast.setDefaultOptions = function (options: Partial<ToastOptions>) {
  WToast.defaultOptions = { ...defaultOptions, ...options }
}

WToast.resetDefaultOptions = function () {
  WToast.defaultOptions = defaultOptions
}

WToast.allowMultiple = function (allow = true) {
  singleton = !allow
}

WToast.install = () => {
  // TODO
}

// TODO: 放到 install？
Vue.prototype.$toast = WToast

export { WToast }
export default WToast
