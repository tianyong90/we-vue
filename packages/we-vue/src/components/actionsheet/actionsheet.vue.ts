import '../../scss/actionsheet.scss'

import Vue from 'vue'

import { PropValidator } from 'vue/types/options'

export default Vue.extend({
  name: 'wv-actionsheet',

  props: {
    type: {
      type: String,
      default: 'ios',
    },
    title: String,
    actions: {
      type: Array,
      default: () => [],
    } as PropValidator<Array<any>>,
    cancelText: {
      type: String,
      default: 'Cancel',
    },
    value: Boolean,
  },

  data () {
    return {
      currentValue: this.value as boolean,
    }
  },

  watch: {
    currentValue (val) {
      this.$emit('input', val)
    },

    value (val) {
      this.currentValue = val
    },
  },

  methods: {
    itemClick (item: any): void {
      if (item.method && typeof item.method === 'function') {
        item.method()
      }
      this.currentValue = false
    },
  },
})
