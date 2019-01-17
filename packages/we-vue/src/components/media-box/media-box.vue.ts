import '../../scss/media-box.scss'

import Routeable from '../../mixins/routable'

import mixins from '../../utils/mixins'

export default mixins(
  Routeable
  /* @vue/component */
).extend({
  name: 'wv-media-box',

  props: {
    type: {
      type: String,
      default: 'appmsg',
    },
    thumb: String,
    title: String,
    description: String,
  },

  methods: {
    onClick () {
      this.$emit('click')
      this.routeLink()
    },
  },
})
