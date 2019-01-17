// Utils
import mixins from '../../utils/mixins'

// Mixins
import Routeable from '../../mixins/routable'

export default mixins(
  Routeable
).extend({
  name: 'wv-tabbar-item',

  mixins: [Routeable],

  props: {
    isOn: Boolean,
  },

  methods: {
    onClick () {
      this.$emit('click')
      this.routeLink()
    },
  },
})
