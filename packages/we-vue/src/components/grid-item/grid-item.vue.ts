// TODO
// import '../../scss/grid-item.scss'

import Routeable from '../../mixins/routable'

import mixins from '../../utils/mixins'

export default mixins(
  Routeable
  /* @vue/component */
).extend({
  name: 'wv-grid-item',

  methods: {
    onClick () {
      this.$emit('click')
      this.routeLink()
    },
  },
})
