import popUpBase from '../popup-base/popup-base.js'
import template from './popup-img-viewer.vue'

let popUpConfig = {
}

let defaultConfig = {
}

let incrId = 0
let instancesMap = {}

function ImgViewer (constructConfig) {
  this.constructor = ImgViewer
  this.init(
    defaultConfig, constructConfig,
    popUpConfig, instancesMap,
    template, incrId++
  )
}

ImgViewer.prototype = popUpBase

export default ImgViewer
