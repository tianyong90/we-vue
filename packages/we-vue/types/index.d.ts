import Vue, { Component, DirectiveOptions, PluginFunction } from 'vue'
import './lib'

declare const WeVue: WeVue
export default WeVue
export interface WeVue {
  install: PluginFunction<WeVueUseOptions>
  version: string
}

/* eslint-disable-next-line */
export type ComponentOrPack = Component & { $_we_vue_subcomponents?: Record<string, ComponentOrPack> }

export interface WeVueUseOptions {
  directives?: Record<string, DirectiveOptions>
  components?: Record<string, ComponentOrPack>
  plugins?: Record<string, PluginFunction<Vue>>
}

export interface Framewrok {
  // TODO
}

declare module 'vue/types/vue' {
  export interface Vue {
    $wevue: Framewrok
  }
}
