import popUpBase from '../popup-base/popup-base.js'
import template from './popup-picker.vue'

let popUpConfig = {
}

let defaultConfig = {
}

let incrId = 0
let instancesMap = {}

function Picker (constructConfig) {
  this.init(
    defaultConfig, constructConfig,
    popUpConfig, instancesMap,
    template, incrId++
  )
}

Picker.prototype = popUpBase
Picker.prototype.constructor = Picker

export default Picker
