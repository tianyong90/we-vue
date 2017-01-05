import Vue from 'vue'

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
  let duration = options.duration || 3000
  let instance = getAnInstance()
  instance.closed = false
  clearTimeout(instance.timer)
  instance.message = typeof options === 'string' ? options : options.message

  document.body.appendChild(instance.$el)
  Vue.nextTick(function () {
    instance.visible = true
    instance.$el.removeEventListener('transitionend', removeDom)
    instance.timer = setTimeout(function () {
      if (instance.closed) return
      instance.close()
    }, duration)
  })
  return instance
}

export default Dialog
