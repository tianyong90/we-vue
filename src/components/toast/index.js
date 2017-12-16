import Vue from 'vue'
import ToastComponent from './toast.vue'

let instance
const defaultOptions = {
  value: true,
  duration: 2000,
  overlay: true,
  icon: 'success-no-circle',
  type: 'success'
}

const initInstance = () => {
  const ToastConstructor = Vue.extend(ToastComponent)

  instance = new ToastConstructor({
    el: document.createElement('div')
  })

  instance.$on('input', value => {
    instance.value = value
  })

  document.body.appendChild(instance.$el)
}

const Toast = (options = {}) => {
  if (typeof options === 'string') {
    options = { message: options }
  }
  options = { ...defaultOptions, ...options }

  if (!instance) {
    initInstance()
  }

  clearTimeout(instance.timer)

  Object.assign(instance, options)

  if (options.duration > 0) {
    instance.timer = setTimeout(() => {
      instance.value = false
    }, options.duration)
  }

  return instance
}

const createMethod = type => (options = {}) => Toast({
  type,
  message: typeof options === 'object' ? options.message : options,
  ...options
})

Toast.text = createMethod('text')
Toast.success = createMethod('success')
Toast.fail = createMethod('fail')
Toast.loading = createMethod('loading')

Toast.close = () => {
  instance.value = false
}

Vue.prototype.$toast = Toast

export default Toast
export {
  ToastComponent as Toast
}
