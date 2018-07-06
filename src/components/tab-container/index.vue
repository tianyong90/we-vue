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
      currentActive: this.value
    }
  },

  methods: {
    onTouchstart (e) {
      console.log(e)
    },

    onTouchmove (e) {
      console.log(e)
    },

    onTouchend (e) {
      console.log(e)
    }
  },

  watch: {

  }
})
</script>

<style scoped lang="scss">
</style>
