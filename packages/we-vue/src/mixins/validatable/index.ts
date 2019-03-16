import Vue from 'vue'

export default Vue.extend({
  name: 'validatable',

  props: {
    value: {
      required: false,
    },
  },

  data () {
    return {
      lazyValue: this.value,
      valid: false,
    }
  },
})
