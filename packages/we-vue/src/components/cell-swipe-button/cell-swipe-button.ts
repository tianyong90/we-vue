import '../../scss/cell-swipe-button.scss'

import Vue from 'vue'
import { VNode } from 'vue/types/vnode'

export default Vue.extend({
  name: 'wv-cell-swipe-button',

  props: {
    type: {
      type: String,
      default: 'default',
    },
  },

  render (h): VNode {
    const classes = [
      'weui-swiped-btn',
      'weui-swiped-btn_' + this.type,
    ]

    return h('div', {
      class: classes,
    }, [
      this.$slots.default,
    ])
  },
})
