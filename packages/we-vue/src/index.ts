import Vue, {VueConstructor} from 'vue'
import * as components from './components'

import WeVue from './components/we-vue'

if (components) {
  for (const key in components) {
    const component = components[key]
    if (component) {
      Object.assign(component, {
        install: (Vue: VueConstructor): void => {
          // TODO
          Vue.component('Wv' + key, component as typeof Vue)
        }
      })
    }

    // todo
    Vue.use(component)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  // todo
  // window.Vue.use()
}

export default WeVue
