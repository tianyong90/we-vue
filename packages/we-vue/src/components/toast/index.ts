import Vue from 'vue'
import ToastComponent from './toast'
import { isObj } from '../../utils'

type TypeToastOptions = {
  visible?: boolean
  duration?: number
  mask?: boolean
  message?: string
  type?: string
  icon?: string
}

type ToastType = {
  [key: string]: any
} & Vue

const parseOptions: Function = (message: object | string): object => (isObj(message) ? <object>message : { message })

let queue: Array<ToastType> = []
let singleton: boolean = true

const createInstance: () => ToastType = () => {
  if (!queue.length || !singleton) {
    const toast: ToastType = new (Vue.extend(ToastComponent))({
      el: document.createElement('div'),
    })

    document.body.appendChild(toast.$el)
    queue.push(toast)
  }
  return queue[queue.length - 1]
}

function Toast (options: TypeToastOptions | string) {
  const toast = createInstance()

  options = {
    ...Toast.currentOptions,
    ...parseOptions(options),
    clear () {
      toast.visible = false
    },
  }

  if ((options as TypeToastOptions).type === 'fail') {
    (options as TypeToastOptions).icon = 'warn'
  }

  Object.assign(toast, options)
  clearTimeout(toast.timer)

  if ((options as TypeToastOptions).duration! > 0) {
    toast.timer = setTimeout(() => {
      toast.clear()
    }, (options as TypeToastOptions).duration)
  }

  return toast
}

const createMethod = (type: string) => (options: TypeToastOptions | string) =>
  Toast({
    type,
    ...parseOptions(options),
  })

Toast.defaultOptions = {
  visible: true,
  duration: 2000,
  mask: true,
  message: '',
  type: 'success',
  icon: 'success-no-circle',
}

Toast.currentOptions = Toast.defaultOptions

Toast.text = createMethod('text')
Toast.success = createMethod('success')
Toast.fail = createMethod('fail')
Toast.loading = createMethod('loading')

Toast.close = function (all: boolean = true): void {
  if (queue.length) {
    if (all) {
      queue.forEach(toast => {
        toast.close()
      })
      queue = []
    } else if (singleton) {
      queue[0].close()
    } else {
      // FIXME
      queue.shift()!.close()
    }
  }
}

Toast.setDefaultOptions = function (options: TypeToastOptions): void {
  Object.assign(Toast.currentOptions, options)
}

Toast.resetDefaultOptions = function (): void {
  Toast.currentOptions = { ...Toast.defaultOptions }
}

Toast.allowMultiple = function (allow = true) {
  singleton = !allow
}

Vue.prototype.$toast = Toast

export default Toast
