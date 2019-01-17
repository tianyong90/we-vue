import '../../scss/top-tips.scss'
import Vue from 'vue'
import PopupMixin from '../../mixins/popup'

export default Vue.extend({
  name: 'wv-top-tips',

  mixins: [PopupMixin],

  props: {
    message: {
      type: String,
      default: '',
      required: false
    },
  },
})
