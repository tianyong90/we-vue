import Vue from 'vue'
import ToastComponent from './toast.vue'

let instance
const defaultOptions = {
  value: true,
  duration: 3000,
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

const Toast = options => {
  if (typeof options === 'string') {
    options = { message: options }
  }

  options = { ...defaultOptions, ...options }

  return new Promise((resolve, reject) => {
    if (!instance) {
      initInstance()
    }

    clearTimeout(instance.timer)

    Object.assign(instance, {
      resolve,
      reject,
      ...options
    })

    Vue.nextTick(function () {
      if (options.duration > 0) {
        instance.timer = setTimeout(() => {
          instance.value = false
          resolve()
        }, options.duration)
      } else {
        resolve()
      }
    })
  })
}

Toast.text = options => Toast({
  ...defaultOptions,
  ...options
})

Toast.success = options => Toast({
  ...defaultOptions,
  ...options
})

Toast.fail = options => Toast({
  ...defaultOptions,
  ...options
})

Toast.loading = options => Toast({
  ...defaultOptions,
  ...options
})

Toast.close = () => {
  instance.value = false
}

Vue.prototype.$toast = Toast

export default Toast
export {
  ToastComponent as Toast
}
