import popUpBase from '../popup-base/popup-base.js'
import template from './popup-dom-relative.vue'

let popUpConfig = {
}

let defaultConfig = {
  autoSetOrthocenter: true,
  position: 'domRelative'
  // 手工指定节点,通过config导入, 属性名为referredDom
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
