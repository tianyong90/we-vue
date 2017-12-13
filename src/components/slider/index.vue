<template>
  <div class="weui-slider-box">
    <div class="weui-slider">
      <div class="weui-slider__inner" ref="inner" @click.prevent="onClick">
        <div :style="{width: percent + '%'}" class="weui-slider__track" />
        <div :style="{left: percent + '%'}"
             class="weui-slider__handler"
             ref="handler"
             @touchstart="onTouchstart"
             @touchmove="onTouchmove"
         />
      </div>
    </div>
    <div class="weui-slider-box__value" v-if="showValue">
      <slot name="value-box">{{ value }}</slot>
    </div>
  </div>
</template>

<script>
  import { getTouch } from '../../utils/touches'

  import { create } from '../../utils'

  export default create({
    name: 'wv-slider',

    props: {
      min: {
        type: Number,
        default: 0,
        validator: value => {
          return value >= 0
        }
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1,
        validator: value => {
          return value > 0
        }
      },
      value: {
        type: Number
      },
      showValue: {
        type: Boolean,
        default: true
      },
      enableClick: {
        type: Boolean,
        default: true
      },
      disabled: Boolean
    },

    data () {
      return {
        handlerStartPos: 0,
        sliderLeft: 0,
        sliderLength: 0
      }
    },

    computed: {
      percent () {
        if (typeof this.value === 'undefined' || this.value === null) return 0

        return Math.floor((this.value - this.min) / (this.max - this.min) * 100)
      },

      stepWidth () {
        return this.sliderLength * this.step / (this.max - this.min)
      }
    },

    created () {
      if (this.min >= this.max) {
        throw new Error('property:max must be bigger than property:min')
      }
    },

    mounted () {
      this.sliderLeft = this.$refs.inner.offsetLeft
      this.sliderLength = this.$refs.inner.getBoundingClientRect().width
    },

    methods: {
      getHandlerStartPos () {
        const innerRect = this.$refs.inner.getBoundingClientRect()
        const handlerRect = this.$refs.handler.getBoundingClientRect()

        return handlerRect.left - innerRect.left
      },

      onClick (evt) {
        if (this.disabled || !this.enableClick) return

        // 距初始值的目标步数
        const steps = Math.round((evt.pageX - this.sliderLeft) / this.stepWidth)

        const value = this.min + this.step * steps

        this.$emit('input', value)
        this.$emit('change', value)
      },

      onTouchstart () {
        if (this.disabled) return
        this.handlerStartPos = this.getHandlerStartPos()
      },

      onTouchmove (evt) {
        if (this.disabled) return

        const touch = getTouch(evt)

        // 距初始值的目标步数
        const steps = Math.round((touch.pageX - this.sliderLeft) / this.stepWidth)

        let value = this.min + this.step * steps
        value = value < this.min ? this.min : value > this.max ? this.max : value

        this.$emit('input', value)
        this.$emit('change', value)
      }
    }
  })
</script>

<style scoped lang="scss">
</style>
