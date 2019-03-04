/**
 * v-click-outside
 *
 * ```vue
 * <div v-click-outside="onClickOutside">
 * ```
 */

import { VNodeDirective } from 'vue/types/vnode'

interface ClickOutsideDirective extends VNodeDirective{
  value: (e: Event) => void
}

export default {
  inserted (el: HTMLElement, binding: ClickOutsideDirective) {
    el._clickOutside = (e: Event) => {
      if (!el.contains(e.target as HTMLElement)) {
        binding.value(e)
      }
    }
    document.body.addEventListener('click', el._clickOutside, true)
  },

  unbind (el: HTMLElement) {
    /* istanbul ignore next */
    if (!el._clickOutside) {
      return
    }

    document.body.removeEventListener('click', el._clickOutside, true)
    delete el._clickOutside
  },
}
