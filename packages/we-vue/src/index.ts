// Styles
import './scss/index.scss'

import * as components from './components'
import * as directives from './directives'
import * as plugins from './plugins'

import { install } from './install'

export default class WeVue {
  static version = __WE_VUE_VERSION__

  // @ts-ignore
  static install = (Vue, args) => {
    install.call(WeVue, Vue, {
      components,
      directives,
      plugins,
      ...args,
    })
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(WeVue)
}
