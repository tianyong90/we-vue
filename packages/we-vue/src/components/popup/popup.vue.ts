import '../../scss/popup.scss'

import PopupMixin from '../../mixins/popup'

import mixins from '../../utils/mixins'

export default mixins(
  PopupMixin
  /* @vue/component */
).extend({
  name: 'wv-popup',

  mixins: [PopupMixin],

  props: {
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
  },

  computed: {
    style (): object {
      return {
        height: /^\d+$/.test(this.height) ? parseInt((this as any).height) + 'px' : (this as any).height,
      }
    },
  },

  mounted () {
    if (this.visible) {
      this.open()
    }
  },
})
