import popUpBase from '../popup-base/popup-base.js'
import template from './popup-calendar.vue'

let popUpConfig = {
}

let defaultConfig = {
}

let incrId = 0
let instancesMap = {}

function calendar (constructConfig) {
  this.constructor = calendar
  this.init(
    defaultConfig, constructConfig,
    popUpConfig, instancesMap,
    template, incrId++
  )
}

calendar.prototype = popUpBase

export default calendar
