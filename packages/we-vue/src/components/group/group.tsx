import Vue from 'vue'
import '../../scss/group.scss'

export default Vue.extend({
  name: 'wv-group',

  functional: true,

  props: {
    title: String,
    titleColor: String,
  },

  render (h, context) {
    return (
      <div {...context.data}>
        {
          context.props.title
            ? <div
              style={{ color: context.props.titleColor }}
              class="weui-cells__title"
              domPropsInnerHTML={context.props.title}
            />
            : h()
        }
        <div class="weui-cells">
          {context.children}
        </div>
      </div>
    )
  },
})
