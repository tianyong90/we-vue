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
// import AlloyFinger from 'alloyfinger'

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

  data () {
    return {
      af: null
    }
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

    const getStartPositionX = () => {
      return 1
    }

    let dragState = {}
    draggable(thumb, {
      start: (e) => {
        // if (this.disabled) return

        console.log(e)

        dragState = getStartPositionX()
      },
      drag: (e) => {
        // console.log(e)
      },
      end: (e) => {
        if (this.disabled) return
        this.$emit('change', this.value)
        // startPositionX = null
      }
    })
  },

  methods: {
    onTouchmove (e) {
      if (this.disabled) return

      const runWayBox = this.$refs.runWay.getBoundingClientRect()

      let newValue = this.value + (this.max - this.min) * e.deltaX / runWayBox.width

      if (newValue < this.min) {
        newValue = this.min
      } else if (newValue > this.max) {
        newValue = this.max
      }

      return this.$emit('input', Math.round(newValue))
    },

    onTouchend (e) {
      if (this.disabled) return
      this.$emit('change', this.value)
    }
  }
}
</script>
