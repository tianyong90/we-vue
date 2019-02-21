import Vue, { VNode } from 'vue'
import '../../scss/grid.scss'

export default Vue.extend({
  name: 'wv-grid',

  functional: true,

  render (h, context): VNode {
    return h('div', {
      class: 'weui-grids',
    }, context.children)
  },
})
