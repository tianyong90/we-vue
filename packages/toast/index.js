import Vue from 'vue'
import ToastComponent from './toast'
import { isObj } from '../utils'

const defaultOptions = {
  visible: true,
  duration: 2000,
  mask: true,
  message: '',
  type: 'success',
  icon: 'success-no-circle'
}

const parseOptions = message => isObj(message) ? message : { message }

let queue = []
let singleton = true
let currentOptions = { ...defaultOptions }

const initInstance = () => {
  if (!queue.length || !singleton) {
    const toast = new (Vue.extend(ToastComponent))({
      el: document.createElement('div')
    })

    document.body.appendChild(toast.$el)
    queue.push(toast)
  }
  return queue[queue.length - 1]
}

const Toast = (options = {}) => {
  const toast = initInstance()

  options = {
    ...currentOptions,
    ...parseOptions(options),
    clear () {
      toast.visible = false
    }
  }

  if (options.type === 'fail') {
    options.icon = 'warn'
  }

  Object.assign(toast, options)
  clearTimeout(toast.timer)

  if (options.duration > 0) {
    toast.timer = setTimeout(() => {
      toast.clear()
    }, options.duration)
  }

  return toast
}

const createMethod = type => options => Toast({
  type,
  ...parseOptions(options)
})

const methods = ['text', 'success', 'fail', 'loading']
methods.forEach(method => {
  Toast[method] = createMethod(method)
})

Toast.clear = all => {
  if (queue.length) {
    if (all) {
      queue.forEach(toast => {
        toast.clear()
      })
      queue = []
    } else if (singleton) {
      queue[0].clear()
    } else {
      queue.shift().clear()
    }
  }
}

Toast.setDefaultOptions = options => {
  Object.assign(Toast.currentOptions, options)
}

Toast.resetDefaultOptions = () => {
  Toast.resetDefaultOptions = { ...defaultOptions }
}

Toast.allowMultiple = (allow = true) => {
  singleton = !allow
}

Toast.install = () => {
  Vue.use(ToastComponent)
}

Vue.prototype.$toast = Toast

export default Toast
