import scrollUtil from '../../utils/scroll'

const CONTEXT = '@@InfiniteScroll'
const DISTANCE = 300

function doBindEvent () {
  if (this.el[CONTEXT].binded) {
    return
  }
  this.el[CONTEXT].binded = true

  this.scrollEventTarget = scrollUtil.getScrollEventTarget(this.el)
  this.scrollEventListener = scrollUtil.debounce(handleScrollEvent.bind(this), 200)
  this.scrollEventTarget.addEventListener('scroll', this.scrollEventListener, true)

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

  const immediateCheckExpr = this.el.getAttribute('infinite-scroll-immediate-check')
  let immediateCheck = true
  if (immediateCheckExpr) {
    immediateCheck = Boolean(this.vm[immediateCheckExpr])
  }
  this.immediateCheck = immediateCheck

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

  const targetScrollTop = scrollUtil.getScrollTop(scrollEventTarget)
  const targetBottom = targetScrollTop + scrollUtil.getVisibleHeight(scrollEventTarget)
  const targetVisibleHeight = scrollUtil.getVisibleHeight(scrollEventTarget)

  // return when the targetElement has no height (treat as hidden)
  if (!targetVisibleHeight) {
    return
  }

  let needLoadMore = false
  if (scrollEventTarget === element) {
    needLoadMore = scrollEventTarget.scrollHeight - targetBottom < this.distance
  } else {
    const elementBottom = scrollUtil.getElementTop(element) - scrollUtil.getElementTop(scrollEventTarget) + scrollUtil.getVisibleHeight(element)

    needLoadMore = elementBottom - targetVisibleHeight < this.distance
  }

  if (needLoadMore && this.expression) {
    this.expression()
  }
}

function startBind (el) {
  const context = el[CONTEXT]

  context.vm.$nextTick(function () {
    if (scrollUtil.isAttached(el)) {
      doBindEvent.call(el[CONTEXT])
    }
  })
}

function doCheckStartBind (el) {
  const context = el[CONTEXT]

  if (context.vm._isMounted) {
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
    if (el[CONTEXT] && el[CONTEXT].scrollEventTarget) {
      el[CONTEXT].scrollEventTarget.removeEventListener('scroll', el[CONTEXT].scrollEventListener)
    }
  }
}
