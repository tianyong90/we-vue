import Vue from 'vue'
import TopTipsComponent from './top-tips.vue'

let instance

const defaultOptions = {
  visible: true,
  duration: 3000
}

const initInstance = () => {
  const TopTipsConstructor = Vue.extend(TopTipsComponent)

  instance = new TopTipsConstructor({
    el: document.createElement('div')
  })

  document.body.appendChild(instance.$el)
}

const TopTips = (options = {}) => {
  if (typeof options === 'string') {
    options = { message: options }
  }
  options = { ...defaultOptions, ...options }

  if (!instance) {
    initInstance()
  }

  clearTimeout(instance.timer)

  Object.assign(instance, {...options})

  if (options.duration > 0) {
    instance.timer = setTimeout(() => {
      instance.visible = false
    }, options.duration)
  }

  return instance
}

TopTips.close = () => {
  if (instance) {
    instance.visible = false
  }
}

Vue.prototype.$toptips = TopTips

export default TopTips
export {
  TopTipsComponent as TopTips
}
