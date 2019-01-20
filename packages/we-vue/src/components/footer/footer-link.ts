import { VNode } from 'vue/types/vnode'

// <template>
//   <div class="weui-footer__link" @click="onClick" v-text="text" />
// </template>

import Routeable from '../../mixins/routable'

import mixins from '../../utils/mixins'

/* @vue/component */
export default mixins(
  Routeable
).extend({
  name: 'wv-footer-link',

  props: {
    text: String,
  },

  methods: {
    onClick () {
      this.$emit('click')
      this.routeLink()
    },
  },

  render (h): VNode {
    return h('div', {
      class: 'weui-footer__link',
      on: {
        click: this.onClick,
      },
    }, this.text)
  },
})
