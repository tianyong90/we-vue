import './scss/index.scss'
import { VueConstructor } from 'vue'

import { install } from './install'

export default class WeVue {
  static install: (Vue: VueConstructor) => void
  static version: string

  installed: string[] = []

  // TODO
  // constructor () {
  //
  // }
}

WeVue.install = install
/* eslint-disable no-undef */
WeVue.version = __WE_VUE_VERSION__
