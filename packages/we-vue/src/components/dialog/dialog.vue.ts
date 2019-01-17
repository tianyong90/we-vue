import PopupMixin from '../../mixins/popup'

import Vue from 'vue'

const CONFIRM_TEXT = '确定'
const CANCEL_TEXT = '取消'

type action = 'cancel' | 'confirm'

export default Vue.extend({
  name: 'wv-dialog',

  mixins: [PopupMixin],

  props: {
    skin: {
      type: String,
      default: 'ios',
    },
    title: String,
    message: String,
    confirmButtonText: {
      type: String,
      default: CONFIRM_TEXT,
    },
    cancelButtonText: {
      type: String,
      default: CANCEL_TEXT,
    },
    showConfirmButton: {
      type: Boolean,
      default: true,
    },
    showCancelButton: {
      type: Boolean,
      default: true,
    },
    callback: Function,
    beforeClose: Function,
  },

  methods: {
    handleAction (action: action): void {
      if (this.beforeClose) {
        this.beforeClose(action, (state: boolean) => {
          if (state !== false) {
            this.onClose(action)
          }
        })
      } else {
        this.onClose(action)
      }
    },

    onClose (action: action): void {
      this.$emit('update:visible', false)
      this.$emit(action)
      this.callback && this.callback(action)
    },
  },
})
