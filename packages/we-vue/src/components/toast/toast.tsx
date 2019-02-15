import WVIcon from '../icon/index'
import WVSpinner from '../spinner/index'
import PopupMixin from '../../mixins/popup'

import mixins from '../../utils/mixins'
import { CreateElement, VNode } from 'vue'

export default mixins(
  PopupMixin
).extend({
  name: 'wv-toast',

  components: {
    WVIcon,
    WVSpinner,
  },

  props: {
    mask: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      default: 'success-no-circle',
    },
    type: {
      type: String,
      default: 'success',
      validator: (val: string) => {
        return (
          ['success', 'fail', 'loading', 'text', 'html'].indexOf(val) !== -1
        )
      },
    },
    spinnerType: {
      type: String,
      default: 'default',
    },
    message: {
      type: String,
      default: '',
    },
    maskClass: {
      type: String,
      default: 'weui-mask_transparent',
    },
  },

  render (h: CreateElement): VNode {
    return (
      <transition
        enter-active-class="weui-animate-fade-in"
        leave-active-class="weui-animate-fade-out"
      >
        <div
          class={{
            'weui-toast': true,
            'weui-toast_text': this.type === 'text',
          }}
          ref="toast"
          vShow={this.visible}
        >
          {
            this.type !== 'text' && this.type !== 'loading'
              // @ts-ignore
              ? <WVIcon
                type={this.icon}
                class="weui-icon_toast"
              />
              : h()
          }
          {
            this.type === 'loading' && this.spinnerType !== 'none'
              // @ts-ignore
              ? <WVSpinner
                size={25}
                type={this.spinnerType}
                class="weui-icon_toast"
              />
              : h()
          }
          <p class="weui-toast__content" domPropsTextContent="message" />
        </div>
      </transition>
    )
  },
})
