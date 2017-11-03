import popUpBase from '../popup-base/popup-base.js'
import template from './popup-picker.vue'

let popUpConfig = {
}

let defaultConfig = {
}

let incrId = 0
let instancesMap = {}

function Picker (constructConfig) {
  this.constructor = Picker
  this.init(
    defaultConfig, constructConfig,
    popUpConfig, instancesMap,
    template, incrId++
  )
}

Picker.prototype = popUpBase

export default Picker
