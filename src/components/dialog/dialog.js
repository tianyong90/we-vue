import Vue from 'vue'

const CONFIRM_TEXT = '确定'
const CANCEL_TEXT = '取消'

const DialogConstructor = Vue.extend(require('./dialog.vue'))
let dialogtPool = []

let getAnInstance = () => {
  if (dialogtPool.length > 0) {
    let instance = dialogtPool[0]
    dialogtPool.splice(0, 1)
    return instance
  }
  return new DialogConstructor({
    el: document.createElement('div')
  })
}

let returnAnInstance = instance => {
  if (instance) {
    dialogtPool.push(instance)
  }
}

let removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}

DialogConstructor.prototype.close = function () {
  this.visible = false
  this.$el.addEventListener('transitionend', removeDom)
  this.closed = true
  returnAnInstance(this)
}

let Dialog = (options = {}) => {
  let instance = getAnInstance()
  instance.closed = false
  instance.title = options.title
  instance.message = typeof options === 'string' ? options : options.message
  instance.skin = options.skin ? options.skin : 'ios'
  instance.confirmText = options.confirmText ? options.confirmText : CONFIRM_TEXT
  instance.cancelText = options.cancelText ? options.cancelText : CANCEL_TEXT

  document.body.appendChild(instance.$el)
  return instance
}

export default Dialog
