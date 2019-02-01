import WVIcon from '../icon/index'
import WVSpinner from '../spinner/index'
import PopupMixin from '../../mixins/popup'

import Vue from 'vue'

export default Vue.extend({
  name: 'wv-toast',

  components: {
    WVIcon,
    WVSpinner,
  },

  mixins: [PopupMixin],

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
})
