import Vue from 'vue'
import popUpBase from '../popup-base/popup-base.js'
// import popUpController from '../popup-base/index.js'
import template from './popup-bottom-menu.vue'

let popUpConfig = {
}

let defaultConfig = {
}

let incrId = 0
let instancesMap = {}

function BottomMenu (config) {
  this.Factory = Vue.extend(template)
  config.id = incrId++
  this.instancesMap = instancesMap
  this.popUpConfig = popUpConfig
  this.config = Object.assign({}, defaultConfig, config)
  this.instancesMap[this.getRouterId()] = this
}

BottomMenu.prototype = popUpBase

export default BottomMenu
