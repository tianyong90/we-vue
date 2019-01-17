import '../../scss/cell.scss'

import Routeable from '../../mixins/routable'

import mixins from '../../utils/mixins'

export default mixins(
  Routeable
  /* @vue/component */
).extend({
  name: 'wv-cell',

  props: {
    title: {
      type: [String, Number],
    },
    value: {
      type: [String, Number],
    },
    isLink: Boolean,
  },

  methods: {
    onClick () {
      this.$emit('click')
      this.routeLink()
    },
  },
})
