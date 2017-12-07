// 触发一个 touch 事件
export function triggerTouch (wrapper, eventName, x, y) {
  const el = wrapper.element ? wrapper.element : wrapper
  const touch = {
    identifier: Date.now(),
    target: el,
    pageX: x,
    pageY: y,
    clientX: x,
    clientY: y,
    radiusX: 2.5,
    radiusY: 2.5,
    rotationAngle: 10,
    force: 0.5
  }

  const event = document.createEvent('CustomEvent')
  event.initCustomEvent(eventName, true, true, {})
  event.touches = [touch]
  event.targetTouches = [touch]
  event.changedTouches = [touch]

  el.dispatchEvent(event)
}

export function dragHelper (el, position) {
  triggerTouch(el, 'touchstart', 0, 0)
  triggerTouch(el, 'touchmove', 0, position / 4)
  triggerTouch(el, 'touchmove', 0, position / 3)
  triggerTouch(el, 'touchmove', 0, position / 2)
  triggerTouch(el, 'touchmove', 0, position)
  triggerTouch(el, 'touchend', 0, position)
}
