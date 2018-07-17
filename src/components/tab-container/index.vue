<template>
  <div
    @touchstart="onTouchstart"
    @mousedown="onTouchstart"
    @touchmove="onTouchmove"
    @mousemove="onTouchmove"
    @touchend="onTouchend"
    @mouseup="onTouchend"
    class="wv-tab-container"
  >
    <div
      ref="wrap"
      class="wv-tab-container-wrap"
      @transitionend.once="onTransitionend"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { create } from '../../utils'

export default create({
  name: 'wv-tab-container',

  props: {
    value: {},
    swipeable: Boolean
  },

  data () {
    return {
      start: { x: 0, y: 0 },
      swiping: false,
      activeItems: [],
      pageWidth: 0,
      limitWidth: 0,
      currentActive: this.value
    }
  },

  mounted () {
    if (!this.swipeable) return

    this.wrap = this.$refs.wrap
    this.pageWidth = this.wrap.clientWidth
    this.limitWidth = this.pageWidth / 4
  },

  methods: {
    onTransitionend () {
      this.wrap.classList.add('swipe-transition')
      this.swipeMove(-this.index * this.pageWidth)

      this.wrap.classList.remove('swipe-transition')
      this.wrap.style.webkitTransform = ''
      this.swiping = false
      this.index = null
    },

    swipeLeaveTransition (lastIndex = 0) {
      if (typeof this.index !== 'number') {
        this.index = this.$children.findIndex(child => child.id === this.currentActive)
        this.swipeMove(-lastIndex * this.pageWidth)
      }
    },

    swipeMove (offset) {
      this.wrap.style.webkitTransform = `translate3d(${offset}px, 0, 0)`
      this.swiping = true
    },

    onTouchstart (evt) {
      if (!this.swipeable) return

      evt = evt.changedTouches ? evt.changedTouches[0] : evt
      this.dragging = true
      this.start.x = evt.pageX
      this.start.y = evt.pageY
    },

    onTouchmove (evt) {
      if (!this.dragging) return
      let swiping
      const e = evt.changedTouches ? evt.changedTouches[0] : evt
      const offsetTop = e.pageY - this.start.y
      const offsetLeft = e.pageX - this.start.x
      const y = Math.abs(offsetTop)
      const x = Math.abs(offsetLeft)
      swiping = !(x < 5 || (x >= 5 && y >= x * 1.73))
      if (!swiping) return

      evt.preventDefault()

      const len = this.$children.length - 1
      const index = this.$children.findIndex(child => child.id === this.currentActive)

      const currentPageOffset = index * this.pageWidth
      const offset = offsetLeft - currentPageOffset
      const absOffset = Math.abs(offset)
      if (absOffset > len * this.pageWidth ||
        (offset > 0 && offset < this.pageWidth)) {
        this.swiping = false
        return
      }
      this.offsetLeft = offsetLeft
      this.index = index

      this.swipeMove(offset)
    },

    onTouchend () {
      if (!this.swiping) return
      this.dragging = false
      const direction = this.offsetLeft > 0 ? -1 : 1
      const isChange = Math.abs(this.offsetLeft) > this.limitWidth
      if (isChange) {
        this.index += direction
        const child = this.$children[this.index]
        if (child) {
          this.currentActive = child.id
          return
        }
      }
      this.swipeLeaveTransition()
    }
  },

  watch: {
    value (val) {
      this.currentActive = val
    },

    currentActive (val, oldValue) {
      this.$emit('input', val)
      if (!this.swipeable) return

      const lastIndex = this.$children.findIndex(child => child.id === oldValue)
      this.swipeLeaveTransition(lastIndex)
    }
  }
})
</script>

<style scoped lang="scss">
  .wv-tab-container {
    overflow: hidden;
    position: relative;

    &-wrap {
      display: flex;
    }

    .swipe-transition {
      transition: all 150ms ease-in-out;
    }
  }
</style>
