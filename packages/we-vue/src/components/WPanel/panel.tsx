import Vue from 'vue'
import '../../scss/panel.scss'

export default Vue.extend({
  name: 'w-panel',

  props: {
    title: String,
  },

  render (h) {
    return (
      <div class="weui-panel weui-panel_access">
        {
          this.title
            ? <div
              class="weui-panel__hd"
              domPropsInnerHTML={this.title}
            />
            : h()
        }
        <div class="weui-panel__bd">
          {this.$slots.default}
        </div>
        <div class="weui-panel__ft">
          {this.$slots.ft}
        </div>
      </div>
    )
  },
})
