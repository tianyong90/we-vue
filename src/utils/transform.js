/*
* translate 相关操作
*
* 使用 traanslate3d 开启硬件加速
*/

const getTransform = function (el) {
  return el.style.transform ||
    el.style.webkitTransform
}

const setTransform = function (el, transformVal) {
  el.style.transform = transformVal
  el.style.webkitTransform = transformVal
}

const getTranslate3d = function (el) {
  const transform = getTransform(el)

  const matchObj = /translate3d\((-?[\d.]+)px,\s*(-?[\d.]+)px,\s*(-?[\d.]+)px\)/.exec(transform)

  if (!matchObj) return [0, 0, 0]

  return [Number.parseInt(matchObj[1]), Number.parseInt(matchObj[2]), Number.parseInt(matchObj[3])]
}

/**
 * 获取 translate
 * @param el
 * @returns {*}
 */
const getTranslateX = function (el) {
  return getTranslate3d(el)[0]
}

/**
 * 设置 translateX
 * @param el
 * @param value
 */
const setTranslateX = function (el, value) {
  setTransform(el, `translate3d(${value}px, 0, 0)`)
}

/**
 * 设置 translateX
 * @param el
 * @returns {number}
 */
const getTranslateY = function (el) {
  return getTranslate3d(el)[1]
}

/**
 * 设置 translateY
 * @param el
 * @param value
 */
const setTranslateY = function (el, value) {
  setTransform(el, `translate3d(0, ${value}px, 0)`)
}

export {
  getTranslateX,
  setTranslateX,
  getTranslateY,
  setTranslateY
}
