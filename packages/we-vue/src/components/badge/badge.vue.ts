import '../../scss/badge.scss'
import Vue from 'vue'

export default Vue.extend({
  name: 'wv-badge',

  props: {
    color: String,
    isDot: Boolean,
  },
})
