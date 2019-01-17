import Vue from 'vue'

import '../../scss/progress.scss'

export default Vue.extend({
  name: 'wv-progress',

  props: {
    percent: {
      type: [Number, String],
    },
    showClear: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    onClickCancel (e: MouseEvent) {
      e.preventDefault()
      this.$emit('cancel', this)
    },
  },
})
