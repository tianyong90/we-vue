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
          Vue.component(key, component as typeof Vue)
        }
      })
    }

    // todo
    Vue.use(component)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(WeVue)
}

import TopTips from './components/top-tips'

export * from './components'

export default WeVue
