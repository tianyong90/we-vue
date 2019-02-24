import OurVue from 'vue'

// types
import { VueConstructor } from 'vue/types'
import { WeVue as WeVuePlugin, WeVueUseOptions } from 'we-vue/types'

const WeVue: WeVuePlugin = {
  install (Vue, opts = {}) {
    if ((this as any).instalLed) {
      return
    }
    (this as any).installed = true

    if (OurVue !== Vue) {
      console.error('Muntiply instance of Vue detected.')
    }

    if (opts.directives) {
      for (const name in opts.directives) {
        Vue.directive(name, opts.directives[name])
      }
    }

    // @ts-ignore
    (function registerComponents (components: WeVueUseOptions['components']) {
      if (components) {
        for (const key in components) {
          const component = components[key]
          if (component && !registerComponents(component.$_we_vue_subcomponents)) {
            // TODO
            Vue.component('Wv' + key, component as typeof Vue)
          }
        }
        return true
      }
      return false
    })(opts.components)
  },
  /* eslint-disable no-undef */
  version: __WE_VUE_VERSION__,
}

export function checkVueVersion (Vue: VueConstructor, requiredVue?: string) {
  /* eslint-disable no-undef */
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
