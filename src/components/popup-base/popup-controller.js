import Vue from 'vue'
import Router from './router.js'
import popUpContainerComponent from './popup-conatiner.vue'
import popUpBaseComponent from './popup-base.vue'

function top (arr) {
  return arr[arr.length - 1]
}

function prev (arr) {
  return arr[arr.length - 2]
}

let PopUpContainerConstructor = Vue.extend(popUpContainerComponent)
let PopUpBaseConstructor = Vue.extend(popUpBaseComponent)
let vmPopUpContainer = new PopUpContainerConstructor({
  el: document.createElement('div')
})
let RouterIdToPopUp = {}
let RouterIdToTrigger = {}
let popUpIdQueue = []

// 注入contianer
document.body.appendChild(vmPopUpContainer.$el)
Router.initialParam('popUp')

let PopUp = {
  fromUpdateRouter: false,
  fromHashChange: false,

  open (vmBase, routerId, domLoadCallback) {
    vmPopUpContainer.turnOn()
    vmBase.enter()
    popUpIdQueue.push(routerId)
    this.updateRouter(routerId)
    requestAnimationFrame(function () {
      //和那边的enter和enter的执行位置同步
      vmPopUpContainer.addPopUp(vmBase.$el)
      domLoadCallback && domLoadCallback()
      vmBase.afterDomLoad()
    })
  },

  close (routerId) {
    var vmPopUp = RouterIdToPopUp[routerId]

    vmPopUp && vmPopUp.leave(() => {
      this.destroyPopUp(routerId)
      popUpIdQueue.pop()
      if (popUpIdQueue.length === 0) {
        vmPopUpContainer.turnOff()
      }
    })
  },

  register (routerId, trigger) {
    RouterIdToTrigger[routerId] = trigger
  },

  createPopUp (config, routerId, e, runtimeConfig) {
    config = Object.assign({}, config)
    config.e = e
    config.routerId = routerId
    config.runtimeConfig = runtimeConfig

    RouterIdToPopUp[routerId] = new PopUpBaseConstructor({
      el: document.createElement('div'),
      propsData: config
    })

    return RouterIdToPopUp[routerId]
  },

  destroyPopUp (routerId) {
    vmPopUpContainer.removePopUp(RouterIdToPopUp[routerId].$el)
    RouterIdToPopUp[routerId].$destroy()
    RouterIdToPopUp[routerId] = null
  },

  updateRouter (popUpName) {
    if (this.fromHashChange) {
      this.fromHashChange = false
      return this.fromHashChange
    }

    var value = Router.getParamValue('popUp')
    if (value && value.split('/').pop() !== popUpName) {
      value += '/' + popUpName
    } else {
      value = popUpName
    }

    this.fromUpdateRouter = true
    Router.parseHashCommand('&popUp=' + value)
  }
}

Router.listenParam('popUp', {
  onEnter (val) {
    if (PopUp.fromUpdateRouter) {
      PopUp.fromUpdateRouter = false
      return PopUp.fromUpdateRouter
    }

    var list = val ? val.split('/') : []
    var trigger = RouterIdToTrigger[top(list)]
    PopUp.fromHashChange = true
    trigger && trigger()
  },

  onLeave (val, oldVal) {
    var oldList = oldVal ? oldVal.split('/') : []
    var list = val ? val.split('/') : []
    var oldListTop = top(oldList)

    if (prev(list) !== oldListTop) {
      PopUp.fromUpdateRouter = false
      PopUp.close(oldListTop)
    }
  },

  onBack (val) {

  }
})

export default PopUp
export { PopUp }
