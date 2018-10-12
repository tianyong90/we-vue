import Vue from 'vue'
import { getTouch } from './touches'

const isServer = Vue.prototype.$isServer

function isDef (value) {
  return value !== undefined && value !== null
}

function isObj (x) {
  const type = typeof x
  return x !== null && (type === 'object' || type === 'function')
}

export {
  isServer,
  getTouch,
  isDef,
  isObj
}
