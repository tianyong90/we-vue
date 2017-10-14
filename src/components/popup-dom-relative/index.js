import Vue from 'vue'
import popUpBase from '../popup-base/popup-base.js'
import popUpController from '../popup-base/index.js'
import template from './popup-dom-relative.vue'

let popUpConfig = {
}

let defaultConfig = {
  autoSetOrthocenter: true,
  position: 'domRelative'
  // 手工指定节点,通过config导入, 属性名为referredDom
}

let incrId = 0
let instancesMap = {}

function PressMenu (config) {
  this.Factory = Vue.extend(template)
  config.id = incrId++
  this.instancesMap = instancesMap
  this.popUpConfig = popUpConfig
  this.config = Object.assign({}, defaultConfig, config)
  this.instancesMap[this.getRouterId()] = this
  popUpController.register(this.getRouterId(), this.open.bind(this))
}

PressMenu.prototype = popUpBase
PressMenu.prototype.constructor = PressMenu

export default PressMenu
