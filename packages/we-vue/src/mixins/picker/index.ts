// Mixins
import Toggleable, { factory as ToggleableFactory } from '../toggleable'

// Utils
import mixins, { ExtractVue } from '../../utils/mixins'

export default mixins<
  ExtractVue<[typeof Toggleable]>
>(
  ToggleableFactory('visible', 'update:visible')
).extend({
  name: 'picker',

  props: {
    confirmText: {
      type: String,
      default: '确定',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    closeOnClickMask: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    open (): void {
      this.isActive = true
    },

    close (): void {
      this.isActive = false
    },
  },
})
