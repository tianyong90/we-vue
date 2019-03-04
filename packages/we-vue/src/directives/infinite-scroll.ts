import { VNode, VNodeDirective } from 'vue/types/vnode'
import Utils from '../utils/scroll'
import throttle from 'lodash/throttle'

const DISTANCE = 300

interface InfiniteScrollDirective extends VNodeDirective {
  value: () => any
}

/**
 * handle the scroll event
 */
function handleScrollEvent (el: HTMLElement, binding: InfiniteScrollDirective): void {
  const scrollEventTarget = el._onInfiniteScroll!.target

  if (el._onInfiniteScroll!.disabled) {
    return
  }

  const targetScrollTop = Utils.getScrollTop(scrollEventTarget)
  const targetBottom =
    targetScrollTop + Utils.getVisibleHeight(scrollEventTarget)
  const targetVisibleHeight = Utils.getVisibleHeight(scrollEventTarget)

  // return when the targetElement has no height (treat as hidden)
  if (!targetVisibleHeight) {
    return
  }

  let needLoadMore = false
  if (scrollEventTarget === el) {
    needLoadMore = (scrollEventTarget as HTMLElement).scrollHeight - targetBottom < el._onInfiniteScroll!.distance
  } else {
    const elementBottom =
      Utils.getElementTop(el) -
      Utils.getElementTop(scrollEventTarget) +
      Utils.getVisibleHeight(el)

    needLoadMore = elementBottom - targetVisibleHeight < el._onInfiniteScroll!.distance
  }

  if (needLoadMore && binding.value) {
    binding.value()
  }
}

export default {
  inserted (el: HTMLElement, binding: InfiniteScrollDirective, vnode: VNode) {
    vnode.context!.$nextTick(function () {
      const target = Utils.getScrollEventTarget(el) as HTMLElement
      const listener = throttle(handleScrollEvent.bind(null, el, binding), 200)

      const disabledExpr = el.getAttribute('infinite-scroll-disabled')
      let disabled = false

      if (disabledExpr) {
        vnode.context!.$watch(disabledExpr, (value: boolean) => {
          el._onInfiniteScroll!.disabled = value
          listener()
        })
        disabled = Boolean((vnode.context! as any)[disabledExpr])
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
        binding.value()
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
