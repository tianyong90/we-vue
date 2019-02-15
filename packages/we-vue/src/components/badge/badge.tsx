import '../../scss/badge.scss'
import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'wv-badge',

  props: {
    color: String,
    isDot: Boolean,
  },

  render (h): VNode {
    return (
      <span
        class={{
          'weui-badge': true,
          'weui-badge_dot': this.isDot,
        }}
        style={{
          backgroundColor: this.color,
        }}
      >
        { !this.isDot ? this.$slots.default : h() }
      </span>
    )
  },
})
