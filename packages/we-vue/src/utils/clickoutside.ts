/**
 * v-clickoutside
 *
 * ```vue
 * <div v-clickoutside="onClose">
 * ```
 */

import { isServer } from './index'

const context: string = '@@clickoutsideContext'

export default {
  bind (el, binding): void {
    const handler = event => {
      if (!el.contains(event.target)) {
        el[context].callback()
      }
    }

    el[context] = {
      handler,
      callback: binding.value,
      arg: binding.arg || 'click'
    }

    !isServer && document.addEventListener(el[context].arg, handler)
  },

  update (el, binding): void {
    /* istanbul ignore next */
    el[context].callback = binding.value
  },

  unbind (el): void {
    !isServer &&
      document.removeEventListener(el[context].arg, el[context].handler)
  },

  install (Vue): void {
    Vue.directive('clickoutside', {
      bind: this.bind,
      unbind: this.unbind
    })
  }
}
