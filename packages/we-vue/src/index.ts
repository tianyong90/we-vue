import './scss/index.scss'
import { VueConstructor } from 'vue'
import * as components from './components'
import directives from './directives'
import WeVueComponent from './components/we-vue'
import { WeVue as WeVuePlugin, WeVueUseOptions } from 'we-vue/types'

const WeVue: WeVuePlugin = {
  install (Vue: VueConstructor, opts?: WeVueUseOptions): void {
    Vue.use(WeVueComponent, {
      components,
      directives,
      ...opts,
    })
  },
  /* eslint-disable no-undef */
  version: __WE_VUE_VERSION__,
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(WeVue)
}

export default WeVue
