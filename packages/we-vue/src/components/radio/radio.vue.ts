// import Vue from 'vue'
import '../../scss/radio.scss'

// Utils
import mixins from '../../utils/mixins'

// Mixins
import Colorable from '../../mixins/colorable'

import { PropValidator } from 'vue/types/options'

export default mixins(
  Colorable
).extend({
  name: 'wv-radio',

  props: {
    title: String,
    align: {
      type: String,
      default: 'left',
    },
    options: {
      type: Array,
      required: true,
    } as PropValidator<Array<any>>,
    value: null as any as PropValidator<any>,
  },

  data () {
    return {
      internalValue: this.value,
    }
  },

  watch: {
    internalValue (val): void {
      this.$emit('input', val)
      this.$emit('change', val)
    },

    value (val): void {
      this.internalValue = val
    },
  },
})
