import '../../scss/tabbar.scss'

import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'w-tabbar',

  props: {
    fixed: Boolean,
  },

  render (h): VNode {
    const style = { position: this.fixed ? 'fixed' : 'absolute' }

    return h('div', {
      class: 'weui-tabbar',
      style: style,
    }, this.$slots.default)
  },
})
