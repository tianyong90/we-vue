import Vue from 'vue'

const TipsConstructor = Vue.extend(require('./top-tips.vue'))
let tipstPool = []

let getAnInstance = () => {
  if (tipstPool.length > 0) {
    let instance = tipstPool[0]
    tipstPool.splice(0, 1)
    return instance
  }
  return new TipsConstructor({
    el: document.createElement('div')
  })
}

let returnAnInstance = instance => {
  if (instance) {
    tipstPool.push(instance)
  }
}

let removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}

TipsConstructor.prototype.close = function () {
  this.visible = false
  this.$el.addEventListener('transitionend', removeDom)
  this.closed = true
  returnAnInstance(this)
}

let TopTips = (options = {}) => {
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

export default TopTips
