let isDragging = false
import Vue from 'vue'
const supportTouch = !Vue.prototype.$isServer && 'ontouchstart' in window

export default function (element, options) {
  const onMove = function (event) {
    if (options.drag) {
      options.drag(supportTouch ? event.changedTouches[0] || event.touches[0] : event)
    }
  }

  const onEnd = function (event) {
    if (!supportTouch) {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onEnd)
    }
    document.onselectstart = null
    document.ondragstart = null

    isDragging = false

    if (options.end) {
      options.end(supportTouch ? event.changedTouches[0] || event.touches[0] : event)
    }
  }

  element.addEventListener(supportTouch ? 'touchstart' : 'mousedown', function (event) {
    if (isDragging) return
    event.preventDefault()
    document.onselectstart = function () { return false }
    document.ondragstart = function () { return false }

    if (!supportTouch) {
      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onEnd)
    }
    isDragging = true

    if (options.start) {
      options.start(supportTouch ? event.changedTouches[0] || event.touches[0] : event)
    }
  })

  if (supportTouch) {
    element.addEventListener('touchmove', onMove)
    element.addEventListener('touchend', onEnd)
    element.addEventListener('touchcancel', onEnd)
  }
};
