import './scss/index.scss'
import { VueConstructor } from 'vue'

import { install } from './install'

export default class WeVue {
  static install: (Vue: VueConstructor) => void
  static version: string;

  // TODO
  // constructor () {
  //
  // }
}

WeVue.install = install
WeVue.version = __WE_VUE_VERSION__

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(WeVue)
}
