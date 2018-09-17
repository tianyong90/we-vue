import Vue from 'vue'
import ToastComponent from './toast'
import { isObj } from '../utils'

const parseOptions = message => isObj(message) ? message : { message }

let queue = []
let singleton = true

const createInstance = () => {
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
  const toast = createInstance()

  options = {
    ...Toast.currentOptions,
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

Toast.defaultOptions = {
  visible: true,
  duration: 2000,
  mask: true,
  message: '',
  type: 'success',
  icon: 'success-no-circle'
}

const createMethod = type => options => Toast({
  type,
  ...parseOptions(options)
})

const methods = ['text', 'success', 'fail', 'loading']
methods.forEach(method => {
  Toast[method] = createMethod(method)
})

Toast.close = all => {
  if (queue.length) {
    if (all) {
      queue.forEach(toast => {
        toast.close()
      })
      queue = []
    } else if (singleton) {
      queue[0].close()
    } else {
      queue.shift().close()
    }
  }
}

Toast.setDefaultOptions = options => {
  Object.assign(Toast.currentOptions, options)
}

Toast.resetDefaultOptions = () => {
  Toast.currentOptions = { ...Toast.defaultOptions }
}

Toast.allowMultiple = (allow = true) => {
  singleton = !allow
}

Toast.install = () => {
  Vue.use(ToastComponent)
}

Vue.prototype.$toast = Toast
Toast.resetDefaultOptions()

export default Toast
