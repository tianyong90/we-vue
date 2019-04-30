import Vue from 'vue'

interface options extends Vue {
  $parent: Vue & {
    vertical: number
    computedWidth: number
    computedHeight: number
    swipes: Array<any>
  }
}

export default Vue.extend<options>().extend({
  name: 'w-swipe-item',

  data () {
    return {
      offset: 0,
    }
  },

  beforeCreate (): void {
    this.$parent.swipes.push(this)
  },

  destroyed (): void {
    this.$parent.swipes.splice(this.$parent.swipes.indexOf(this), 1)
  },

  render (h) {
    const { vertical, computedWidth, computedHeight } = this.$parent

    const style = {
      width: computedWidth + 'px',
      height: vertical ? computedHeight + 'px' : '100%',
      transform: vertical ? `translate3d(0, ${this.offset}px, 0)` : `translate3d(${this.offset}px, 0, 0)`,
    }

    return (
      <div class="wv-swipe-item" style={style} {...{ on: this.$listeners }}>
        {this.$slots.default}
      </div>
    )
  },
})
