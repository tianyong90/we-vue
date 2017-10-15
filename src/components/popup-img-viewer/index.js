import Vue from 'vue'
import popUpBase from '../popup-base/popup-base.js'
import popUpController from '../popup-base/index.js'
import template from './popup-img-viewer.vue'

let popUpConfig = {
}

let defaultConfig = {
}

let incrId = 0
let instancesMap = {}

function ImgViewer (config) {
  this.Factory = Vue.extend(template)
  config.id = incrId++
  this.instancesMap = instancesMap
  this.popUpConfig = popUpConfig
  this.config = Object.assign({}, defaultConfig, config)
  this.instancesMap[this.getRouterId()] = this
  popUpController.register(this.getRouterId(), this.open.bind(this))
}

ImgViewer.prototype = popUpBase
ImgViewer.prototype.constructor = ImgViewer

export default ImgViewer
