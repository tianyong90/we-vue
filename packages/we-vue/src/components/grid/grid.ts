import Vue, { VNode } from 'vue'
import '../../scss/grid.scss'

export default Vue.extend({
  name: 'wv-grid',

  render (h): VNode {
    return h('div', {
      class: 'weui-grids',
    }, this.$slots.default)
  },
})
