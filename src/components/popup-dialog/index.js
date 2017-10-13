import Vue from 'vue'
import popUpBase from '../popup-base/popup-base.js'
import popUpController from '../popup-base/index.js'
import template from './popup-dialog.vue'

let popUpConfig = {
}

let defaultConfig = {
}

let incrId = 0
let instancesMap = {}

function Dialog (config) {
  this.Factory = Vue.extend(template)
  config.id = incrId++
  this.instancesMap = instancesMap
  this.popUpConfig = popUpConfig
  this.config = Object.assign({}, defaultConfig, config)
  this.instancesMap[this.getRouterId()] = this
  popUpController.register(this.getRouterId(), this.open.bind(this))
}

Dialog.prototype = popUpBase
Dialog.prototype.constructor = Dialog

export default Dialog
