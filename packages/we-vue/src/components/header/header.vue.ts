import Vue from 'vue'
import '../../scss/header.scss'

export default Vue.extend({
  name: 'wv-header',

  props: {
    title: String,
    fixed: {
      type: Boolean,
      default: true,
    },
    backgroundColor: {
      type: String,
      default: '#21292c',
    },
  },
})
