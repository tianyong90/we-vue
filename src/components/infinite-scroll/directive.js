import Vue from 'vue'

const ctx = '@@InfiniteScroll'

let throttle = function (fn, delay) {
  let now, lastExec, timer, context, args

  let execute = function () {
    fn.apply(context, args)
    lastExec = now
  }

  return function () {
    context = this
    args = arguments

    now = Date.now()

    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    if (lastExec) {
      let diff = delay - (now - lastExec)
      if (diff < 0) {
        execute()
      } else {
        timer = setTimeout(() => {
          execute()
        }, diff)
      }
    } else {
      execute()
    }
  }
}

let getScrollTop = function (element) {
  if (element === window) {
    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
  }

  return element.scrollTop
}

let getComputedStyle = Vue.prototype.$isServer ? {} : document.defaultView.getComputedStyle

let getScrollEventTarget = function (element) {
  let currentNode = element
  // bugfix, see http://w3help.org/zh-cn/causes/SD9013 and http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
  while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
    let overflowY = getComputedStyle(currentNode).overflowY
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode
    }
    currentNode = currentNode.parentNode
  }
  return window
}

let getVisibleHeight = function (element) {
  if (element === window) {
    return document.documentElement.clientHeight
  }

  return element.clientHeight
}

let getElementTop = function (element) {
  if (element === window) {
    return getScrollTop(window)
  }
  return element.getBoundingClientRect().top + getScrollTop(window)
}

let isAttached = function (element) {
  let currentNode = element.parentNode
  while (currentNode) {
    if (currentNode.tagName === 'HTML') {
      return true
    }
    if (currentNode.nodeType === 11) {
      return false
    }
    currentNode = currentNode.parentNode
  }
  return false
}

let doBind = function () {
  if (this.binded) return
  this.binded = true

  let directive = this
  let element = directive.el

  directive.scrollEventTarget = getScrollEventTarget(element)
  directive.scrollListener = throttle(doCheck.bind(directive), 200)
  directive.scrollEventTarget.addEventListener('scroll', directive.scrollListener)

  let disabledExpr = element.getAttribute('infinite-scroll-disabled')
  let disabled = false

  if (disabledExpr) {
    this.vm.$watch(disabledExpr, function (value) {
      directive.disabled = value
      if (!value && directive.immediateCheck) {
        doCheck.call(directive)
      }
    })
    disabled = Boolean(directive.vm[disabledExpr])
  }
  directive.disabled = disabled

  let distanceExpr = element.getAttribute('infinite-scroll-distance')
  let distance = 0
  if (distanceExpr) {
    distance = Number(directive.vm[distanceExpr] || distanceExpr)
    if (isNaN(distance)) {
      distance = 0
    }
  }
  directive.distance = distance

  let immediateCheckExpr = element.getAttribute('infinite-scroll-immediate-check')
  let immediateCheck = true
  if (immediateCheckExpr) {
    immediateCheck = Boolean(directive.vm[immediateCheckExpr])
  }
  directive.immediateCheck = immediateCheck

  if (immediateCheck) {
    doCheck.call(directive)
  }

  let eventName = element.getAttribute('infinite-scroll-listen-for-event')
  if (eventName) {
    directive.vm.$on(eventName, function () {
      doCheck.call(directive)
    })
  }
}

let doCheck = function (force) {
  let scrollEventTarget = this.scrollEventTarget
  let element = this.el
  let distance = this.distance

  if (force !== true && this.disabled) return //eslint-disable-line
  let viewportScrollTop = getScrollTop(scrollEventTarget)
  let viewportBottom = viewportScrollTop + getVisibleHeight(scrollEventTarget)

  let shouldTrigger = false

  if (scrollEventTarget === element) {
    shouldTrigger = scrollEventTarget.scrollHeight - viewportBottom <= distance
  } else {
    let elementBottom = getElementTop(element) - getElementTop(scrollEventTarget) + element.offsetHeight + viewportScrollTop

    shouldTrigger = viewportBottom + distance >= elementBottom
  }

  if (shouldTrigger && this.expression) {
    this.expression()
  }
}

export default {
  bind (el, binding, vnode) {
    el[ctx] = {
      el,
      vm: vnode.context,
      expression: binding.value
    }
    const args = arguments
    let cb = function () {
      el[ctx].vm.$nextTick(function () {
        if (isAttached(el)) {
          doBind.call(el[ctx], args)
        }

        el[ctx].bindTryCount = 0

        let tryBind = function () {
          if (el[ctx].bindTryCount > 10) return //eslint-disable-line
          el[ctx].bindTryCount++
          if (isAttached(el)) {
            doBind.call(el[ctx], args)
          } else {
            setTimeout(tryBind, 50)
          }
        }

        tryBind()
      })
    }
    if (el[ctx].vm._isMounted) {
      cb()
      return
    }
    el[ctx].vm.$on('hook:mounted', cb)
  },

  unbind (el) {
    if (el[ctx] && el[ctx].scrollEventTarget) {
      el[ctx].scrollEventTarget.removeEventListener('scroll', el[ctx].scrollListener)
    }
  }
}
