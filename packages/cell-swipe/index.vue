<template>
  <div
    class="weui-cell weui-cell_swiped"
    v-clickoutside:touchstart="onClickoutside"
  >
    <div
      class="weui-cell__bd"
      ref="cellBd"
      @touchstart="onTouchstart"
      @touchmove="onTouchmove"
      @touchend="onTouchend"
      @touchcancel="onTouchend"
      :style="style"
    >
      <wv-cell
        :title="title"
        :value="value"
        :is-link="isLink"
        :to="to"
        :url="url"
        ref="cell"
      >
        <template slot="icon">
          <slot name="icon"/>
        </template>
        <template slot="bd" v-if="!title">
          <slot name="bd"/>
        </template>
        <template slot="ft" v-if="typeof value === 'undefined'">
          <slot name="ft"/>
        </template>
      </wv-cell>
    </div>
    <div class="weui-cell__ft" ref="rightBtns">
      <slot name="right"/>
    </div>
  </div>
</template>

<script>
import { create, getTouch } from '../utils'
import Cell from '../cell/index'
import RouterLink from '../mixins/router-link'
import Clickoutside from '../utils/clickoutside'

export default create({
  name: 'cell-swipe',

  components: {
    [Cell.name]: Cell
  },

  directives: {
    Clickoutside
  },

  mixins: [RouterLink],

  props: {
    title: [String, Number],
    value: [String, Number],
    isLink: Boolean
  },

  data () {
    return {
      startPosX: 0,
      rightWidth: 0,
      offset: 0,
      startOffset: 0,
      deltaX: 0,
      transition: ''
    }
  },

  computed: {
    style () {
      return {
        transition: this.transition,
        transform: `translate3d(${this.offset}px, 0px, 0px)`
      }
    }
  },

  mounted () {
    this.rightWidth = this.$refs.rightBtns.clientWidth
  },

  methods: {
    onTouchstart (event) {
      const touch = getTouch(event)
      this.startPosX = touch.clientX

      this.startOffset = this.offset
      this.transition = ''
    },

    onTouchmove (event) {
      const touch = getTouch(event)
      this.deltaX = touch.clientX - this.startPosX

      const targetOffset = this.startOffset + this.deltaX

      this.offset = targetOffset > 0 ? 0 : targetOffset < -this.rightWidth ? -this.rightWidth : targetOffset
    },

    onTouchend () {
      this.transition = 'all 200ms ease'

      // when the moving distance is smaller than 20,
      // the state of the cell-swipe will recover
      if (Math.abs(this.deltaX) < 20) {
        this.offset = this.startOffset
        return
      }

      if (this.startOffset < 0 && this.deltaX > 0) {
        this.offset = 0
      } else if (this.startOffset === 0 && this.deltaX < 0) {
        this.offset = -this.rightWidth
      }
    },

    onClickoutside () {
      this.offset = 0
    }
  }
})
</script>

<style scoped lang="scss">
</style>
