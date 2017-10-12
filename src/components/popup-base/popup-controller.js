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

// 注入contianer
document.body.appendChild(vm_popUpContainer.$el);

let PopUp = {
  open (vm_base, routerId) {
    vm_popUpContainer.turnOn()
    vm_base.enter()
    this.updateRouter(routerId)
    requestAnimationFrame(function(){
      //和那边的enter和enter的执行位置同步
      vm_popUpContainer.addPopUp(vm_base.$el)
    })
  },

  close (routerId) {
    var vm_popUp = RouterIdToPopUp[routerId];
    //之前是正向的,这次就是反过来咯~
    vm_popUp.leave(()=>{
      this.destroyPopUp(routerId)
      vm_popUpContainer.turnOff()
    })
  },

  createUrl () {
    return ``;
  },

  createPopUp (routerId) {
    RouterIdToPopUp[routerId] = new popUpBaseConstructor({
      el: document.createElement('div')
    })
    return RouterIdToPopUp[routerId]
  },

  destroyPopUp (routerId) {
    vm_popUpContainer.removePopUp(RouterIdToPopUp[routerId].$el)
    RouterIdToPopUp[routerId].$destroy();
    RouterIdToPopUp[routerId] = null;
  },

  updateRouter (popUpName) {
    var value = Router.getParamValue('popUp');

    if(value) value += '/' + popUpName;
    else value = popUpName;
    Router.parseHashCommand('&popUp='+value);
  }
}

Router.listenParam('popUp', {
  onEnter (val) {
    console.log('enter ' + val)
  },

  onLeave (val) {
    var list = val.split('/');
    
    PopUp.close(list[list.length-1])
    console.log('leave ' + val)
  },

  onBack (val) {
    console.log('back ' + val)
  },
})


export default PopUp
export { PopUp }
