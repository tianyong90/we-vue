import Vue from 'vue'
import '../../scss/icon.scss'

// Types
import { classesObject } from '../../globals'
import { VNode } from 'vue/types/vnode'

export default Vue.extend({
  name: 'wv-icon',

  props: {
    type: {
      type: String,
      required: true,
    },
    large: Boolean,
  },

  computed: {
    classes (): classesObject {
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
