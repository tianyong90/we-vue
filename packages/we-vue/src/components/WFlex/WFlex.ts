import Vue from 'vue'
import '@/scss/flex.scss'
import { PropValidator } from 'vue/types/options'
import { VNode } from 'vue/types/vnode'

export default Vue.extend({
  name: 'w-flex',

  provide (): object {
    return { flexComponent: this }
  },

  props: {
    gutter: {
      type: [Number, String],
      default: 0,
      validator: (val: number | string) => {
        return Number(val) >= 0
      },
    } as PropValidator<number | string>,
  },

  computed: {
    style (): object {
      const margin = `-${Number(this.gutter) / 2}px`

      return this.gutter ? { marginLeft: margin, marginRight: margin } : {}
    },
  },

  render (h): VNode {
    return h('div', {
      class: 'weui-flex',
      style: this.style,
    }, [
      this.$slots.default,
    ])
  },
})
