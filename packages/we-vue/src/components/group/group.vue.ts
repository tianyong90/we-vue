import Vue from 'vue'
import '../../scss/group.scss'

export default Vue.extend({
  name: 'wv-group',

  props: {
    title: String,
    titleColor: String,
  },
})
