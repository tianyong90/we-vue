import Vue from 'vue'
import '../../scss/group.scss'

export default Vue.extend({
  name: 'wv-group',

  props: {
    title: String,
    titleColor: String,
  },

  render (h) {
    return (
      <div>
        {
          this.title
            ? <div
              style={{ color: this.titleColor }}
              class="weui-cells__title"
              domPropsInnerHTML={this.title}
            />
            : h()
        }
        <div class="weui-cells">
          {this.$slots.default}
        </div>
      </div>
    )
  },
})
