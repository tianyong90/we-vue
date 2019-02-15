/**
 * v-click-outside
 *
 * ```vue
 * <div v-click-outside="onClickOutside">
 * ```
 */

import { VNode, VNodeDirective } from 'vue/types/vnode'
import { DirectiveOptions } from 'vue/types/options'

interface ClickOutsideDirective extends VNodeDirective{
  value: (e: Event) => void
}

export default {
  inserted (el: HTMLElement, binding: ClickOutsideDirective, vnode: VNode, oldVnode: VNode) {
    el._clickOutside = (e: Event) => {
      if (!el.contains(e.target as HTMLElement)) {
        binding.value(e)
      }
    }
    document.body.addEventListener('click', el._clickOutside, true)
  },

  unbind (el: HTMLElement, binding: ClickOutsideDirective, vnode: VNode, oldVnode: VNode) {
    /* istanbul ignore next */
    if (!el._clickOutside) {
      return
    }

    document.body.removeEventListener('click', el._clickOutside, true)
    delete el._clickOutside
  },
} as DirectiveOptions
