import Vue from 'vue'
import { Wrapper } from '@vue/test-utils'
import lolex from 'lolex'

Vue.config.silent = true

type MyTouchEvent = CustomEvent & {
  touches?: any[]
  targetTouches?: any[]
  changedTouches?: any[]
}

/**
 * 触发一个 touch 事件
 *
 * @param wrapper
 * @param eventName
 * @param x
 * @param y
 */
export function triggerTouch (wrapper: any, eventName: string, x: number, y: number): void {
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
    force: 0.5,
  }

  const event: MyTouchEvent = document.createEvent('CustomEvent')
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
export function verticalDrag (el: HTMLElement|Wrapper<Vue>, startY = 0, endY: number): void {
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
export function horizontalDrag (el: HTMLElement|Wrapper<Vue>, startX = 0, endX: number): void {
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
 * 使最后两次 touchmove 事件间移动距离为一个十分小的值，并为这两次事件加入一个间隔
 * 实现慢速拖动释放的效果
 *
 * @param el
 * @param startY
 * @param endY
 */
export function slowVerticalDrag (el: HTMLElement|Wrapper<Vue>, startY: number, endY: number): void {
  const clock = lolex.install({
    shouldAdvanceTime: true,
  })

  triggerTouch(el, 'touchstart', 0, startY)
  triggerTouch(el, 'touchmove', 0, startY + (endY - startY) / 2)
  triggerTouch(el, 'touchmove', 0, endY - 2)

  // in order to simulate the slowly drag, we add a time interval between the second and the third touchmove event.
  clock.tick(100)

  triggerTouch(el, 'touchmove', 0, endY)
  triggerTouch(el, 'touchend', 0, endY)

  clock.uninstall()
}

/**
 * drag an emelent to a point but DO NOT release
 *
 * @param el
 * @param x
 * @param y
 */
export function dragAndHoldHelper (el: HTMLElement|Wrapper<Vue>, x: number, y: number): void {
  triggerTouch(el, 'touchstart', 0, 0)
  triggerTouch(el, 'touchmove', x / 4, y / 4)
  triggerTouch(el, 'touchmove', x / 3, y / 3)
  triggerTouch(el, 'touchmove', x / 2, y / 2)
  triggerTouch(el, 'touchmove', x, y)
}

/**
 * promisify setTimeout
 *
 * @param delay
 * @returns {Promise<any>}
 */
export function later (delay: number): Promise<any> {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}
