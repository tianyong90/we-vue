<template>
	<div class="weui-slider-box">
    <div class="weui-slider">
      <div class="weui-slider__inner" ref="runWay">
        <div :style="{width: progress + '%'}" class="weui-slider__track"></div>
        <div :style="{left: progress + '%'}" class="weui-slider__handler" ref="thumb"></div>
      </div>
    </div>
    <div class="weui-slider-box__value">{{ value }}</div>
  </div>
</template>

<script>
import draggable from '../../utils/draggable.js'

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
    disabled: Boolean
  },

  computed: {
    progress () {
      const value = this.value
      if (typeof value === 'undefined' || value === null) return 0

      return Math.floor((value - this.min) / (this.max - this.min) * 100)
    }
  },

  mounted () {
    const thumb = this.$refs.thumb
    const runWay = this.$refs.runWay

    const getStartPositionX = () => {
      const runWayBox = runWay.getBoundingClientRect()
      const thumbBox = thumb.getBoundingClientRect()

      return thumbBox.left - runWayBox.left
    }

    let startPositionX = 0
    draggable(thumb, {
      start: () => {
        if (this.disabled) return
        startPositionX = getStartPositionX()
      },
      drag: (event) => {
        if (this.disabled) return
        const runWayBox = runWay.getBoundingClientRect()
        const deltaX = event.pageX - runWayBox.left - startPositionX
        const stepCount = Math.ceil((this.max - this.min) / this.step)
        const newPositionX = (startPositionX + deltaX) - (startPositionX + deltaX) % (runWayBox.width / stepCount)

        let newProgress = newPositionX / runWayBox.width

        if (newProgress < 0) {
          newProgress = 0
        } else if (newProgress > 1) {
          newProgress = 1
        }

        this.$emit('input', Math.round(this.min + newProgress * (this.max - this.min)))
      },
      end: (e) => {
        if (this.disabled) return
        this.$emit('change', this.value)
        startPositionX = 0
      }
    })
  }
}
</script>
