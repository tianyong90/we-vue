import popUpBase from '../popup-base/popup-base.js'
import template from './popup-bottom-menu.vue'

let popUpConfig = {
}

let defaultConfig = {
}

let incrId = 0
let instancesMap = {}

function BottomMenu (constructConfig) {
  this.init(
    defaultConfig, constructConfig,
    popUpConfig, instancesMap,
    template, incrId++
  )
}

BottomMenu.prototype = popUpBase
BottomMenu.prototype.constructor = BottomMenu

export default BottomMenu
