import Vue from 'vue'
import '../../scss/icon.scss'
// Types
import { VNode } from 'vue/types/vnode'

export default Vue.extend({
  name: 'w-icon',

  props: {
    type: {
      type: String,
      required: true,
    },
    large: Boolean,
  },

  computed: {
    classes (): object {
      let classType = `weui-icon-${this.type}`

      return {
        [classType]: true,
        'weui-icon_msg': this.large,
      }
    },
  },

  render (h): VNode {
    return h('span', {
      class: this.classes,
    })
  },
})
