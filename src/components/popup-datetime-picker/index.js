import popUpBase from '../popup-base/popup-base.js'
import template from './popup-datetime-picker.vue'

let popUpConfig = {
}

let defaultConfig = {
}

let incrId = 0
let instancesMap = {}

function DateTimePicker (constructConfig) {
  this.constructor = DateTimePicker
  this.init(
    defaultConfig, constructConfig,
    popUpConfig, instancesMap,
    template, incrId++
  )
}

DateTimePicker.prototype = popUpBase

export default DateTimePicker
