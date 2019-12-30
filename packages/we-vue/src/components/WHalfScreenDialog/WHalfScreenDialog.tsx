import '@/scss/half-screen-dialog.scss'

import PopupMixin from '@/mixins/popup'

import mixins, { ExtractVue } from '@/utils/mixins'
import Vue from 'vue'

interface options extends Vue {

}

export default mixins<options &
  ExtractVue<[typeof PopupMixin]>
>(
  PopupMixin,
  /* @vue/component */
).extend({
  name: 'w-popup',

  props: {
    visible: Boolean,
    height: {
      type: [String, Number],
      default: 'auto',
      validator: (val: string | number) => {
        return /^(auto)|(\d+(px|vh|%)?)$/.test(val.toString())
      },
    },
    mask: {
      type: Boolean,
      default: true,
    },
    lockOnScroll: {
      type: Boolean,
      default: true,
    },
    closeOnClickMask: {
      type: Boolean,
      default: true,
    },
    maskClass: {
      type: String,
      default: 'weui-mask',
    },
    backgroundColor: String,
  },

  computed: {
    style (): object {
      return {
        backgroundColor: this.backgroundColor,
        height: /^\d+$/.test(this.height.toString()) ? parseInt((this as any).height) + 'px' : (this as any).height,
      }
    },
  },

  mounted () {
    if (this.visible) {
      this.open()
    }
  },

  render () {
    return (
      <transition
        enter-active-class="weui-animate-slide-up"
        leave-active-class="weui-animate-slide-down"
      >
        <div
          class="weui-half-screen-dialog weui-half-screen-dialog_show"
          vShow={this.visible}
          style={this.style}
        >
          <div class="weui-half-screen-dialog__hd">
            <div class="weui-half-screen-dialog__hd__side">
              <button class="weui-icon-btn weui-icon-btn_close">关闭</button>
            </div>
            <div class="weui-half-screen-dialog__hd__main">
              <strong class="weui-half-screen-dialog__title">标题</strong>
            </div>
          </div>

          <div class="weui-half-screen-dialog__bd">
            {this.$slots.default}
          </div>
        </div>
      </transition>
    )
  },
})
