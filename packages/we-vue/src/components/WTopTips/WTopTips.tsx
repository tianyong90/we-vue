import '@/scss/top-tips.scss'
import PopupMixin from '@/mixins/popup'

import mixins from '@/utils/mixins'
import { VNode } from 'vue'

export default mixins(
  PopupMixin,
).extend({
  name: 'w-top-tips',

  props: {
    message: {
      type: String,
      default: '',
      required: false,
    },
  },

  render (): VNode {
    return (
      <transition
        enter-active-class="weui-animate-fade-in"
        leave-active-class="weui-animate-fade-out"
      >
        <div
          class="weui-toptips weui-toptips_warn"
          vShow={this.visible}
          domPropsInnerHTML={this.message}
        />
      </transition>
    )
  },
})
