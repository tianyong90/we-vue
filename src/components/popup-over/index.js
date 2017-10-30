import popUpBase from '../popup-base/popup-base.js'
import template from './popup-over.vue'

let popUpConfig = {
}

let defaultConfig = {
  autoSetOrthocenter: true,
  position: 'domRelative'
}

let incrId = 0
let instancesMap = {}

function Popover (constructConfig) {
  this.constructor = Popover
  this.init(
    defaultConfig, constructConfig,
    popUpConfig, instancesMap,
    template, incrId++
  )
}

Popover.prototype = popUpBase

export default Popover
