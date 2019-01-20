import '../../scss/form-preview.scss'

import Vue from 'vue'

export default Vue.extend({
  name: 'wv-form-preview',

  props: {
    title: String,
    value: String,
    dataItems: {
      type: Array,
      default: () => [],
    },
    buttons: {
      type: Array,
      default: () => [],
    },
  },
})
