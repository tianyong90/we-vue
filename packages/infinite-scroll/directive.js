import Utils from '../utils/scroll'
import { on, off } from '../utils/event'

const CONTEXT = '@@InfiniteScroll'
const DISTANCE = 300

function doBindEvent () {
  /* istanbul ignore if */
  if (this.el[CONTEXT].binded) {
    return
  }
  this.el[CONTEXT].binded = true

  this.scrollEventListener = Utils.debounce(handleScrollEvent.bind(this), 200)
  this.scrollEventTarget = Utils.getScrollEventTarget(this.el)

  const disabledExpr = this.el.getAttribute('infinite-scroll-disabled')
  let disabled = false
  if (disabledExpr) {
    this.vm.$watch(disabledExpr, (value) => {
      this.disabled = value
      this.scrollEventListener()
    })
    disabled = Boolean(this.vm[disabledExpr])
  }
  this.disabled = disabled

  let distance = this.el.getAttribute('infinite-scroll-distance')
  this.distance = Number(distance) || DISTANCE

  on(this.scrollEventTarget, 'scroll', this.scrollEventListener, true)

  const immediateCheckExpr = this.el.getAttribute('infinite-scroll-immediate-check')

  let immediateCheck = immediateCheckExpr ? Boolean(this.vm[immediateCheckExpr]) : true

  if (immediateCheck) {
    this.scrollEventListener()
  }
}

/**
 * handle the scroll event
 */
function handleScrollEvent () {
  const scrollEventTarget = this.scrollEventTarget
  const element = this.el

  if (this.disabled) {
    return
  }

  const targetScrollTop = Utils.getScrollTop(scrollEventTarget)
  const targetBottom = targetScrollTop + Utils.getVisibleHeight(scrollEventTarget)
  const targetVisibleHeight = Utils.getVisibleHeight(scrollEventTarget)

  // return when the targetElement has no height (treat as hidden)
  if (!targetVisibleHeight) {
    return
  }

  let needLoadMore = false
  if (scrollEventTarget === element) {
    needLoadMore = scrollEventTarget.scrollHeight - targetBottom < this.distance
  } else {
    const elementBottom = Utils.getElementTop(element) - Utils.getElementTop(scrollEventTarget) + Utils.getVisibleHeight(element)

    needLoadMore = elementBottom - targetVisibleHeight < this.distance
  }

  if (needLoadMore && this.expression) {
    this.expression()
  }
}

function startBind (el) {
  const context = el[CONTEXT]

  context.vm.$nextTick(function () {
    if (Utils.isAttached(el)) {
      doBindEvent.call(el[CONTEXT])
    }
  })
}

function doCheckStartBind (el) {
  const context = el[CONTEXT]

  if (context.vm._isMounted) {
    /* istanbul ignore next */
    startBind(el)
  } else {
    context.vm.$on('hook:mounted', function () {
      startBind(el)
    })
  }
}

export default {
  bind (el, binding, vnode) {
    if (!el[CONTEXT]) {
      el[CONTEXT] = {
        el,
        vm: vnode.context,
        expression: binding.value
      }
    }
    el[CONTEXT].expression = binding.value

    doCheckStartBind(el)
  },

  update (el) {
    const context = el[CONTEXT]
    context.scrollEventListener && context.scrollEventListener()
  },

  unbind (el) {
    const context = el[CONTEXT]
    if (context.scrollEventTarget) {
      off(context.scrollEventTarget, 'scroll', context.scrollEventListener)
    }
  }
}
