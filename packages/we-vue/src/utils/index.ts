import Vue from 'vue'
import { getTouch } from './touches'

const isServer: boolean = Vue.prototype.$isServer

/**
 * whether the value is defined
 * @param v
 */
function isDef (v: any): boolean {
  return v !== undefined && v !== null
}

/**
 * whether the value is a type of object
 * @param v
 */
function isObj (v: any): boolean {
  const type = typeof v
  return v !== null && (type === 'object' || type === 'function')
}

export { isServer, getTouch, isDef, isObj }
