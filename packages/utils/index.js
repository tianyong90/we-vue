import Vue from 'vue'
import create from './create'
import { getTouch } from './touches'

const isServer = Vue.prototype.$isServer

function isObj (x) {
  const type = typeof x
  return x !== null && (type === 'object' || type === 'function')
}

export {
  isServer,
  create,
  getTouch,
  isObj
}
