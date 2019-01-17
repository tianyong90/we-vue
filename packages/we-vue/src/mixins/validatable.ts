// Mixins
import Colorable from './colorable'

// Types
// import { PropValidator } from 'vue/types/options'

// Utils
import mixins from '../utils/mixins'

export default mixins(
  Colorable
).extend({
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
