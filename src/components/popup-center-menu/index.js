import popUpBase from '../popup-base/popup-base.js'
import template from './popup-center-menu.vue'

let popUpConfig = {
}

let defaultConfig = {
}

let incrId = 0
let instancesMap = {}

function CenterMenu (constructConfig) {
  this.init(
    defaultConfig, constructConfig,
    popUpConfig, instancesMap,
    template, incrId++
  )
}

CenterMenu.prototype = popUpBase
CenterMenu.prototype.constructor = CenterMenu

export default CenterMenu
