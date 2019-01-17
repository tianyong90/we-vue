import Vue from 'vue'

// Utils
import mixins from '../../utils/mixins'

// Mixins
import Colorable from '../../mixins/colorable'

interface options extends Vue {
  $parent: Vue & {
    width: number
    swipes: Array<any>
  }
}

export default mixins<options>(
  Colorable
).extend({
  name: 'wv-swipe-item',

  data () {
    return {
      offset: 0 as number,
    }
  },

  computed: {
    style (): object {
      return {
        width: this.$parent.width + 'px',
        transform: `translate3d(${this.offset}px, 0, 0)`,
      }
    },
  },

  beforeCreate (): void {
    this.$parent && this.$parent.swipes.push(this)
  },

  destroyed (): void {
    this.$parent &&
    this.$parent.swipes.splice(this.$parent.swipes.indexOf(this), 1)
  },
})
