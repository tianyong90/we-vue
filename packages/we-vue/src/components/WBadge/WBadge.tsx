import '@/scss/badge.scss'
import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'w-badge',

  functional: true,

  props: {
    color: String,
    isDot: Boolean,
  },

  render (h, context): VNode {
    const style = {
      backgroundColor: context.props.color,
    }

    return (
      <span
        class={{
          'weui-badge': true,
          'weui-badge_dot': context.props.isDot,
        }}
        style={style}
        {...context.data}
      >
        { !context.props.isDot && context.children }
      </span>
    )
  },
})
