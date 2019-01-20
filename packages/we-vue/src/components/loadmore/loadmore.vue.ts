import Vue from 'vue'
import '../../scss/loadmore.scss'

import WVSpinner from '../spinner'

export default Vue.extend({
  name: 'wv-loadmore',

  components: {
    WVSpinner,
  },

  props: {
    type: {
      type: String,
      default: 'default',
    },
    text: {
      type: String,
      default: '正在加载',
    },
  },
})
