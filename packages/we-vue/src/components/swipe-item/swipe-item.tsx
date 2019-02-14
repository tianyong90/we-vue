import Vue from 'vue'

interface options extends Vue {
  $parent: Vue & {
    width: number
    swipes: Array<any>
  }
}

export default Vue.extend<options>().extend({
  name: 'wv-swipe-item',

  data () {
    return {
      offset: 0 as number,
    }
  },

  beforeCreate (): void {
    this.$parent && this.$parent.swipes.push(this)
  },

  destroyed (): void {
    this.$parent &&
    this.$parent.swipes.splice(this.$parent.swipes.indexOf(this), 1)
  },

  render (h) {
    const { width } = this.$parent

    const style = {
      width: width + 'px',
      transform: `translate3d(${this.offset}px, 0, 0)`,
    }

    return (
      <div class="wv-swipe-item" style={style}>
        {this.$slots.default}
      </div>
    )
  },
})
