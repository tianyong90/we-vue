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

const getTranslate3d = function (target) {
  const transform = getTransform(target)

  const matchObj = /translate3d\((-?[\d.]+)px,\s*(-?[\d.]+)px,\s*(-?[\d.]+)px\)/.exec(transform)

  if (!matchObj) return [0, 0, 0]

  return [Number.parseInt(matchObj[1]), Number.parseInt(matchObj[2]), Number.parseInt(matchObj[3])]
}

/**
 * 获取 translate
 * @param target
 * @returns {*}
 */
const getTranslateX = function (target) {
  return getTranslate3d(target)[0]
}

/**
 * 设置 translateX
 * @param target
 * @param value
 */
const setTranslateX = function (target, value) {
  setTransform(target, `translate3d(${value}px, 0, 0)`)
}

/**
 * 设置 translateX
 * @param target
 * @returns {number}
 */
const getTranslateY = function (target) {
  return getTranslate3d(target)[1]
}

/**
 * 设置 translateY
 * @param target
 * @param value
 */
const setTranslateY = function (target, value) {
  setTransform(target, `translate3d(0, ${value}px, 0)`)
}

export {
  getTranslateX,
  setTranslateX,
  getTranslateY,
  setTranslateY
}
