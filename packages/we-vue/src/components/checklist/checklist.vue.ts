import '../../scss/checklist.scss'

import Vue from 'vue'

// Utils
import mixins from '../../utils/mixins'

// Mixins
import Colorable from '../../mixins/colorable'

import { PropValidator } from 'vue/types/options'

interface options extends Vue {
}

export default mixins<options>(
  Colorable
).extend({
  name: 'wv-checklist',

  props: {
    max: {
      type: Number,
      validator: (val: number) => {
        return val >= 0
      },
    },
    title: String,
    align: {
      type: String,
      default: 'left',
      validator: (val: string) => {
        return val === 'left' || val === 'right'
      },
    },
    options: {
      type: Array,
      required: true,
    } as PropValidator<Array<any>>,
    value: {
      type: Array,
      default: () => [],
    } as PropValidator<Array<any>>,
  },

  computed: {
    currentValue: {
      get (): Array<any> {
        return this.value
      },

      set (val: Array<any>): void {
        if (this.max && val.length > this.max) {
          val = val.slice(0, this.max)
        }

        this.$emit('input', val)
      },
    },
  },

  created () {
    this.currentValue = this.value
  },

  watch: {
    value (val, oldValue) {
      if (JSON.stringify(val) !== JSON.stringify(oldValue)) {
        this.$emit('change', val)
      }
    },
  },
})
