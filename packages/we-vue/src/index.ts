// Styles
import './scss/index.scss'

// Types
import { VueConstructor } from 'vue'

import * as components from './components'
import * as directives from './directives'
import * as plugins from './plugins'

import { install } from './install'
import { WeVueUseOptions } from '../types'

export default class WeVue {
  static install: (Vue: VueConstructor, args?: WeVueUseOptions) => void
  static version: string;

  // TODO
  // constructor () {
  //
  // }
}

WeVue.install = (Vue: VueConstructor, args?: WeVueUseOptions) => {
  Vue.use(install, {
    components,
    directives,
    plugins,
    ...args,
  })
}

WeVue.version = __WE_VUE_VERSION__

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(WeVue)
}
