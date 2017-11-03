import popUpBase from '../popup-base/popup-base.js'
import template from './popup-by-animation.vue'

let popUpConfig = {
}

let defaultConfig = {
  autoSetOrthocenter: true,
  position: 'clickRelative'
}

let incrId = 0
let instancesMap = {}

function PressMenu (constructConfig) {
  this.constructor = PressMenu
  this.init(
    defaultConfig, constructConfig,
    popUpConfig, instancesMap,
    template, incrId++
  )
}

PressMenu.prototype = popUpBase

export default PressMenu
