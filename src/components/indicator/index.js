import Vue from 'vue'
import IndicatorComponent from './indicator.vue'

const Indicator = Vue.extend(IndicatorComponent)
let instance

export default {
  open (options = {}) {
    if (!instance) {
      instance = new Indicator({
        el: document.createElement('div')
      })
    }
    if (instance.visible) return
    instance.text = typeof options === 'string' ? options : options.text || ''
    instance.spinnerType = options.spinnerType || 'default'
    document.body.appendChild(instance.$el)

    Vue.nextTick(() => {
      instance.visible = true
    })
  },

  close () {
    if (instance) {
      Vue.nextTick(() => {
        instance.visible = false
        instance.$el.remove()
      })
    }
  }
}
