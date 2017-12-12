import Vue from 'vue'
import create from './create'

const isServer = Vue.prototype.$isServer

export {
  isServer,
  create
}
