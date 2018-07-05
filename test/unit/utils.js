/**
 * 触发一个 touch 事件
 *
 * @param wrapper
 * @param eventName
 * @param x
 * @param y
 */
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

/**
 * 垂直拖动
 *
 * @param el
 * @param startY
 * @param endY
 */
export function verticalDrag (el, startY = 0, endY) {
  triggerTouch(el, 'touchstart', 0, startY)
  triggerTouch(el, 'touchmove', 0, (startY + endY) / 4)
  triggerTouch(el, 'touchmove', 0, (startY + endY) / 3)
  triggerTouch(el, 'touchmove', 0, (startY + endY) / 2)
  triggerTouch(el, 'touchmove', 0, endY)
  triggerTouch(el, 'touchend', 0, endY)
}

/**
 * 水平拖动
 *
 * @param el
 * @param startX
 * @param endX
 */
export function horizontalDrag (el, startX = 0, endX) {
  triggerTouch(el, 'touchstart', startX, 0)
  triggerTouch(el, 'touchmove', (startX + endX) / 4, 0)
  triggerTouch(el, 'touchmove', (startX + endX) / 3, 0)
  triggerTouch(el, 'touchmove', (startX + endX) / 2, 0)
  triggerTouch(el, 'touchmove', endX, 0)
  triggerTouch(el, 'touchend', endX, 0)
}

/**
 * vertical drag slowly
 *
 * because it hard to test PICKER component when the velocity is too big.
 *
 * @param el
 * @param startY
 * @param endY
 */
export function slowVerticalDrag (el, startY, endY) {
  triggerTouch(el, 'touchstart', 0, startY)
  triggerTouch(el, 'touchmove', 0, startY + (endY - startY) / 3)
  triggerTouch(el, 'touchmove', 0, startY + (endY - startY) * 2 / 3)

  // in order to simulate the slowly drag, we add a time interval between the second and the third touchmove event.
  return new Promise((resolve) => {
    setTimeout(() => {
      triggerTouch(el, 'touchmove', 0, endY)
      triggerTouch(el, 'touchend', 0, endY)

      resolve()
    }, 1000)
  })
}

/**
 * drag an emelent to a point but DO NOT release
 *
 * @param el
 * @param x
 * @param y
 */
export function dragAndHoldHelper (el, x, y) {
  triggerTouch(el, 'touchstart', 0, 0)
  triggerTouch(el, 'touchmove', x / 4, y / 4)
  triggerTouch(el, 'touchmove', x / 3, y / 3)
  triggerTouch(el, 'touchmove', x / 2, y / 2)
  triggerTouch(el, 'touchmove', x, y)
}
