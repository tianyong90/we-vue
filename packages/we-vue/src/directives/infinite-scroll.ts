import { VNode, VNodeDirective } from 'vue/types/vnode'
import { getScrollEventTarget, getScrollTop, getVisibleHeight, getElementTop } from '../utils/scroll'
import throttle from 'lodash/throttle'

const DISTANCE = 300

interface InfiniteScrollDirective extends VNodeDirective {
  value?: () => any
}

/**
 * handle the scroll event
 */
function handleScrollEvent (el: HTMLElement, binding: InfiniteScrollDirective): void {
  const scrollEventTarget = el._onInfiniteScroll!.target as HTMLElement

  if (el._onInfiniteScroll!.disabled) {
    return
  }

  const targetScrollTop = getScrollTop(scrollEventTarget)
  const targetBottom =
    targetScrollTop + getVisibleHeight(scrollEventTarget)
  const targetVisibleHeight = getVisibleHeight(scrollEventTarget)

  // return when the targetElement has no height (treat as hidden)
  if (!targetVisibleHeight) {
    return
  }

  let needLoadMore = false
  if (scrollEventTarget === el) {
    needLoadMore = (scrollEventTarget as HTMLElement).scrollHeight - targetBottom < el._onInfiniteScroll!.distance
  } else {
    const elementBottom =
      getElementTop(el) -
      getElementTop(scrollEventTarget) +
      getVisibleHeight(el)

    needLoadMore = elementBottom - targetVisibleHeight < el._onInfiniteScroll!.distance
  }

  if (needLoadMore && binding.value) {
    binding.value()
  }
}

const infiniteScroll = {
  inserted (el: HTMLElement, binding: InfiniteScrollDirective, vnode: VNode) {
    vnode.context!.$nextTick(function () {
      const target = getScrollEventTarget(el) as HTMLElement
      const listener = throttle(handleScrollEvent.bind(null, el, binding), 200)

      const disabledExpr = el.getAttribute('infinite-scroll-disabled')
      let disabled = false

      if (disabledExpr) {
        vnode.context!.$watch(disabledExpr, (value: boolean) => {
          el._onInfiniteScroll!.disabled = value
          listener()
        })
        disabled = Boolean(disabledExpr)
      }

      let distance = Number(el.getAttribute('infinite-scroll-distance')) || DISTANCE

      target.addEventListener('scroll', listener, true)

      const immediateCheckExpr = el.getAttribute(
        'infinite-scroll-immediate-check'
      )

      let immediateCheck = immediateCheckExpr
        ? Boolean((vnode.context! as any)[immediateCheckExpr])
        : true

      if (immediateCheck && !disabled) {
        binding.value!()
      }

      el._onInfiniteScroll = {
        listener: listener,
        target: target,
        disabled: disabled,
        distance: distance,
      }
    })
  },

  unbind (el: HTMLElement): void {
    /* istanbul ignore next */
    if (!el._onInfiniteScroll) {
      return
    }

    if (el._onInfiniteScroll!.target) {
      el._onInfiniteScroll!.target.removeEventListener('scroll', el._onInfiniteScroll.listener)
    }
    delete el._onInfiniteScroll
  },
}

export { infiniteScroll }
export default infiniteScroll
