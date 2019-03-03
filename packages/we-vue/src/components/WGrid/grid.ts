import Vue, { VNode } from 'vue'
import '../../scss/grid.scss'

export default Vue.extend({
  name: 'w-grid',

  functional: true,

  render (h, context): VNode {
    return h('div', {
      ...context.data,
      class: 'weui-grids',
    }, context.children)
  },
})
