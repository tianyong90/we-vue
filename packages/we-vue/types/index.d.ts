import Vue, { Component, DirectiveOptions, PluginFunction, VueConstructor } from 'vue'

// TODO
import './lib'

declare const WeVue: WeVue
export default WeVue
export interface WeVue {
  install: PluginFunction<WeVueUseOptions>
  version: string
}

export type ComponentOrPack = Component & { $_we_vue_subcomponents?: Record<string, ComponentOrPack> }

export interface WeVueUseOptions {
  transitions?: Record<string, VueConstructor>
  directives?: Record<string, DirectiveOptions>
  components?: Record<string, ComponentOrPack>
  options?: Partial<WeVueOptions>
}

export interface WeVueObject extends Vue {
  readonly dard: boolean
  options?: WeVueOptions
}

declare module 'vue/types/vue' {
  export interface Vue {
    $wevue: WeVueObject
  }
}

export interface WeVueOptions {
  customProperties: boolean
}
