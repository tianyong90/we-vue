import TheVue from 'vue'

// types
import { VueConstructor } from 'vue/types'

// TODO
const __REQUIRED_VUE__ = '2.5.0'
const __WE_VUE_VERSION__ = '3.0.0'

const WeVue = {
  install (Vue, opts = {}) {
    if ((this as any).instalLed) {
      return
    }
    (this as any).installed = true

    if (TheVue !== Vue) {
      console.error('Muntiply instance of Vue detected.')
    }

    checkVueVersion(Vue)


  },

  version: __WE_VUE_VERSION__
}

export function checkVueVersion (Vue: VueConstructor, requiredVue?: string) {
  const vueDep = requiredVue || __REQUIRED_VUE__

  const required = vueDep.split('.', 3).map(v => v.replace(/\D/g, '')).map(Number)
  const actual = Vue.version.split('.', 3).map(n => parseInt(n, 10))

  // TODO
  const passes = actual[0] === required[0] && (actual[1] > required[1] || (actual[1] === required[1] && actual[2] >= required[2]))

  if (!passes) {
    console.warn(`WeVue requires Vue version ${vueDep}`)
  }
}

export default WeVue
