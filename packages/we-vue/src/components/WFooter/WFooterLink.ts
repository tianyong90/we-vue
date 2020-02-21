import { VNode } from 'vue/types/vnode'

import Routeable from '@/mixins/routable'

import mixins from '@/utils/mixins'

/* @vue/component */
export default mixins(
  Routeable,
).extend({
  name: 'w-footer-link',

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
