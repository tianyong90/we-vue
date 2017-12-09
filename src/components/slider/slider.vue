<template>
  <div class="weui-slider-box">
    <div class="weui-slider">
      <div class="weui-slider__inner" ref="runWay">
        <div :style="{width: progress + '%'}" class="weui-slider__track"></div>
        <div :style="{left: progress + '%'}"
             class="weui-slider__handler"
             ref="thumb"
             @touchstart="onTouchstart"
             @touchmove="onTouchmove"
             @touchend="onTouchend"
             @touchcancel="onTouchend"
        ></div>
      </div>
    </div>
    <div class="weui-slider-box__value" v-if="showValueBox">
      <slot name="value-box">{{ value }}</slot>
    </div>
  </div>
</template>

<script>
  import { getTouch } from '../../utils/touches'

  export default {
    name: 'wv-slider',

    props: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      },
      value: {
        type: Number
      },
      showValueBox: {
        type: Boolean,
        default: true
      },
      disabled: Boolean
    },

    data () {
      return {
        startPositionX: 0
      }
    },

    computed: {
      progress () {
        if (typeof this.value === 'undefined' || this.value === null) return 0

        return Math.floor((this.value - this.min) / (this.max - this.min) * 100)
      }
    },

    methods: {
      getStartPositionX () {
        const runWayBox = this.$refs.runWay.getBoundingClientRect()
        const thumbBox = this.$refs.thumb.getBoundingClientRect()

        return thumbBox.left - runWayBox.left
      },

      onTouchstart () {
        if (this.disabled) return
        this.startPositionX = this.getStartPositionX()
      },

      onTouchmove (event) {
        if (this.disabled) return

        const touch = getTouch(event)
        const runWayBox = this.$refs.runWay.getBoundingClientRect()
        const deltaX = touch.pageX - runWayBox.left - this.startPositionX
        const stepCount = Math.ceil((this.max - this.min) / this.step)
        const newPositionX = (this.startPositionX + deltaX) - (this.startPositionX + deltaX) % (runWayBox.width / stepCount)

        let newProgress = newPositionX / runWayBox.width

        if (newProgress < 0) {
          newProgress = 0
        } else if (newProgress > 1) {
          newProgress = 1
        }

        this.$emit('input', Math.round(this.min + newProgress * (this.max - this.min)))
      },

      onTouchend () {
        if (this.disabled) return
        this.$emit('change', this.value)
        this.startPositionX = 0
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
