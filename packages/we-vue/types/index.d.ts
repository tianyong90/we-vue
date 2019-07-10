import Vue, { Component, DirectiveOptions, PluginFunction } from 'vue'

import './lib'

import { WDialog } from '../src/components/WDialog'
import { WToast } from '../src/components/WToast'
import { WTopTips } from '../src/components/WTopTips'

declare const WeVue: WeVue
export default WeVue
export interface WeVue {
  install: PluginFunction<WeVueUseOptions>
  version: string
}

/* eslint-disable-next-line */
export type WeVueComponents = Component & { $_we_vue_subcomponents?: Record<string, WeVueComponents> }

export interface WeVueUseOptions {
  namePrefix?: string
  directives?: Record<string, DirectiveOptions>
  components?: Record<string, WeVueComponents>
  plugins?: Record<string, PluginFunction<Vue>>
}

export interface WeVueObject extends Vue {
  // TODO
}

declare module 'vue/types/vue' {
  export interface Vue {
    $wevue: WeVueObject
  }
}
