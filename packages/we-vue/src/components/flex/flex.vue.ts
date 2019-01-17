import '../../scss/flex.scss'

import mixins from '../../utils/mixins'

import { PropValidator } from 'vue/types/options'

// Mixins
import Colorable from '../../mixins/colorable'

export default mixins(
  Colorable
  /* @vue/component */
).extend({
  name: 'wv-flex',

  provide (): object {
    return { flexComponent: this }
  },

  props: {
    gutter: {
      type: [Number, String],
      default: 0,
      validator: (val: number | string) => {
        return Number(val) >= 0
      },
    } as PropValidator<number | string>,
  },

  computed: {
    style (): object {
      const margin = `-${Number(this.gutter) / 2}px`

      return this.gutter ? { marginLeft: margin, marginRight: margin } : {}
    },
  },
})
