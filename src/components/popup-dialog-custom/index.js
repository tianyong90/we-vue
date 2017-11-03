import popUpBase from '../popup-base/popup-base.js'
import template from './popup-dialog.vue'

let popUpConfig = {
}

let defaultConfig = {
}

let incrId = 0
let instancesMap = {}

function Dialog (constructConfig) {
  this.constructor = Dialog
  this.init(
    defaultConfig, constructConfig,
    popUpConfig, instancesMap,
    template, incrId++
  )
}

Dialog.prototype = popUpBase

export default Dialog
