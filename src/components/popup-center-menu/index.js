import popUpBase from '../popup-base/popup-base.js'
import template from './popup-center-menu.vue'

let popUpConfig = {
  position: 'center'
}

let defaultConfig = {
}

let incrId = 0
let instancesMap = {}

function CenterMenu (constructConfig) {
  this.constructor = CenterMenu
  this.init(
    defaultConfig, constructConfig,
    popUpConfig, instancesMap,
    template, incrId++
  )
}

CenterMenu.prototype = popUpBase

export default CenterMenu
