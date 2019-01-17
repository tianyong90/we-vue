import Vue from 'vue'
import '../../scss/button.scss'
import { classesObject } from '../../globals'

export default Vue.extend({
  name: 'wv-button',

  props: {
    type: {
      type: String,
      default: 'default',
    },
    isLoading: Boolean,
    disabled: Boolean,
    mini: Boolean,
    plain: Boolean,
  },

  methods: {
    onClick (event: MouseEvent): void {
      this.$emit('click', event)
    },
  },

  computed: {
    classes (): classesObject {
      let ret: classesObject = {}

      let classType = this.plain
        ? `weui-btn_plain-${this.type}`
        : `weui-btn_${this.type}`
      let classDisabled = this.plain
        ? 'weui-btn_plain-disabled'
        : 'weui-btn_disabled'

      ret[classType] = true
      ret[classDisabled] = this.disabled
      ret['weui-btn_loading'] = this.isLoading
      ret['weui-btn_mini'] = this.mini

      return ret
    },
  },
})
