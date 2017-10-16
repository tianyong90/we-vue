import Vue from 'vue'
import Router from './router.js'
import popUpContainerComponent from './popup-conatiner.vue'
import popUpBaseComponent from './popup-base.vue'

let popUpContainerConstructor = Vue.extend(popUpContainerComponent)
let popUpBaseConstructor = Vue.extend(popUpBaseComponent)
let vm_popUpContainer = new popUpContainerConstructor({
  el: document.createElement('div')
})
let RouterIdToPopUp = {}
let RouterIdToTrigger = {}
let popUpIdQueue = []

// 注入contianer
document.body.appendChild(vm_popUpContainer.$el);

Router.initialParam('popUp');

let PopUp = {
  fromUpdateRouter: false,
  fromHashChange: false,

  open (vm_base, routerId, domLoadCallback) {
    vm_popUpContainer.turnOn()
    vm_base.enter()
    popUpIdQueue.push(routerId)
    this.updateRouter(routerId)
    requestAnimationFrame(function(){
      //和那边的enter和enter的执行位置同步
      vm_popUpContainer.addPopUp(vm_base.$el)
      domLoadCallback && domLoadCallback()
    })
  },

  close (routerId) {
    var vm_popUp = RouterIdToPopUp[routerId];
    
    vm_popUp && vm_popUp.leave(()=>{
      this.destroyPopUp(routerId)
      popUpIdQueue.pop()
      if(popUpIdQueue.length === 0)
        vm_popUpContainer.turnOff()
    })
  },

  createUrl () {
    return ``;
  },

  register (routerId, trigger) {
    RouterIdToTrigger[routerId] = trigger
  },

  createPopUp (routerId, config, e) {
    RouterIdToPopUp[routerId] = new popUpBaseConstructor({
      el: document.createElement('div'),
      porpsData: {
        config: config,
        e: e
      }
    })

    return RouterIdToPopUp[routerId]
  },

  destroyPopUp (routerId) {
    vm_popUpContainer.removePopUp(RouterIdToPopUp[routerId].$el)
    RouterIdToPopUp[routerId].$destroy();
    RouterIdToPopUp[routerId] = null;
  },

  updateRouter (popUpName) {
    if(this.fromHashChange)
      return this.fromHashChange = false;

    var value = Router.getParamValue('popUp');
    if(value && value.split('/').pop() !== popUpName)
      value += '/' + popUpName;
    else 
      value = popUpName;
    
    this.fromUpdateRouter = true;
    Router.parseHashCommand('&popUp='+value);
  }
}

Router.listenParam('popUp', {
  onEnter (val) {
    console.log('enter ' + val)
    if(PopUp.fromUpdateRouter)
      return PopUp.fromUpdateRouter = false;

    var list = val ? val.split('/'): [];
    var trigger = RouterIdToTrigger[top(list)];
    PopUp.fromHashChange = true;
    trigger && trigger();
  },

  onLeave (val, oldVal) {
    var oldList = oldVal ? oldVal.split('/'): [];
    var list = val ? val.split('/'): [];
    var oldListTop = top(oldList)

    if(prev(list) !== oldListTop){
      PopUp.fromUpdateRouter = false;
      PopUp.close(oldListTop)
    }
    console.log('leave ' + oldVal)
  },

  onBack (val) {
    console.log('back ' + val)
  },
})

function top(arr){
  return arr[arr.length-1];
}

function prev(arr){
  return arr[arr.length-2];
}

export default PopUp
export { PopUp }
