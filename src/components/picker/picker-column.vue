<template>
  <div
    class="weui-picker__group"
    v-if="!divider"
    @touchstart="onTouchstart"
    @touchmove.prevent="onTouchmove"
    @touchend="onTouchend"
    @touchcancel="onTouchend"
    @click="onClick"
  >
    <div class="weui-picker__mask" :style="pickerMaskStyle"/>
    <div class="weui-picker__indicator" ref="indicator" :style="pickerIndicatorStyle"/>
    <div class="weui-picker__content" :style="wrapperStyle">
      <div
        class="weui-picker__item"
        :class="{ 'weui-picker__item_disabled': isDisabled(option) }"
        v-for="(option, index) in options"
        :key="index"
        v-text="getOptionText(option)"
      />
    </div>
  </div>
  <div class="wv-picker-column-divider" v-else v-html="content"/>
</template>

<script>
import { create, getTouch } from '../../utils'

const range = (num, min, max) => Math.min(Math.max(num, min), max)

// height of th option item
const ITEM_HEIGHT = 34

export default create({
  name: 'wv-picker-column',

  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {},
    valueKey: String,
    visibleItemCount: {
      type: Number,
      default: 7,
      validator: (value) => {
        return [3, 5, 7].indexOf(value) > -1
      }
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    divider: {
      type: Boolean,
      default: false
    },
    content: {}
  },

  data () {
    return {
      startTime: null,
      startY: 0,
      startOffset: 0,
      offset: 0,
      prevY: 0,
      prevTime: null,
      velocity: 0, // moving velocity
      transition: '',
      currentIndex: this.defaultIndex
    }
  },

  computed: {
    minTranslateY () {
      return ITEM_HEIGHT * (Math.ceil(this.visibleItemCount / 2) - this.options.length)
    },

    maxTranslateY () {
      return ITEM_HEIGHT * Math.floor(this.visibleItemCount / 2)
    },

    wrapperStyle () {
      return {
        transition: this.transition,
        transform: `translate3d(0, ${this.offset}px, 0)`
      }
    },

    pickerIndicatorStyle () {
      return {
        top: Math.floor(this.visibleItemCount / 2) * ITEM_HEIGHT + 'px'
      }
    },

    pickerMaskStyle () {
      return {
        backgroundSize: '100% 68px'
      }
    },

    count () {
      return this.options.length
    },

    currentValue () {
      return this.options[this.currentIndex]
    }
  },

  created () {
    this.$parent && this.$parent.children.push(this)
  },

  mounted () {
    this.setIndex(this.currentIndex)
  },

  destroyed () {
    this.$parent && this.$parent.children.splice(this.$parent.children.indexOf(this), 1)
  },

  methods: {
    getOptionText (item) {
      if (typeof item === 'object') {
        return item[this.valueKey]
      } else {
        return item
      }
    },

    isDisabled (item) {
      return typeof item === 'object' && item.disabled
    },

    indexToOffset (index) {
      const baseOffset = Math.floor(this.visibleItemCount / 2)
      return (index - baseOffset) * -ITEM_HEIGHT
    },

    offsetToIndex (offset) {
      offset = Math.round(offset / ITEM_HEIGHT) * ITEM_HEIGHT
      return -(offset - Math.floor(this.visibleItemCount / 2) * ITEM_HEIGHT) / ITEM_HEIGHT
    },

    onTouchstart (event) {
      const touch = getTouch(event)

      this.startTime = new Date()
      this.startOffset = this.offset
      this.startY = touch.clientY
      this.prevY = touch.clientY
      this.prevTime = new Date()
      this.transition = ''
    },

    onTouchmove (event) {
      const touch = getTouch(event)

      const currentTime = +new Date()
      const currentY = touch.clientY

      const distance = currentY - this.startY

      this.offset = this.startOffset + distance

      // compute velocity
      this.velocity = (touch.clientY - this.prevY) / (currentTime - this.prevTime)
      this.prevY = currentY
      this.prevTime = currentTime
    },

    onTouchend () {
      this.transition = 'all 150ms ease'

      const endOffset = this.offset + this.velocity * 150

      const index = this.offsetToIndex(endOffset)

      this.setIndex(index)
      this.$emit('change', index)
    },

    onClick (event) {
      const indicator = this.$refs.indicator

      this.transition = 'all 150ms ease'

      // treat the event as 'click' when the moving distance is shorter than 10px
      const indicatorRect = indicator.getBoundingClientRect()
      const clickOffset = Math.floor((event.clientY - indicatorRect.top) / ITEM_HEIGHT) * ITEM_HEIGHT

      const targetOffset = this.offset - clickOffset

      // offset should be within the range
      this.offset = range(targetOffset, this.minTranslateY, this.maxTranslateY)

      this.currentIndex = this.offsetToIndex(this.offset)
    },

    // adjust index, avoid disabled options
    adjustIndex (index) {
      index = range(index, 0, this.count)
      for (let i = index; i < this.count; i++) {
        if (!this.isDisabled(this.options[i])) return i
      }
      for (let i = index - 1; i >= 0; i--) {
        if (!this.isDisabled(this.options[i])) return i
      }
    },

    setIndex (index) {
      index = this.adjustIndex(index)
      this.offset = this.indexToOffset(index)
      this.currentIndex = index
    },

    setValue (value) {
      const { options } = this
      const valueIndex = options.findIndex(option => {
        return this.getOptionText(option) === value
      })
      if (valueIndex > -1) {
        this.setIndex(valueIndex)
      }
    }
  },

  watch: {
    defaultIndex (index) {
      this.setIndex(index)
    },

    options (val, oldValue) {
      if (JSON.stringify(val) !== JSON.stringify(oldValue)) {
        this.setIndex(0)
      }
    }
  }
})
</script>

<style scoped lang="scss">
  .wv-picker-column-divider {
    transform: translateY(106px);
  }
</style>
