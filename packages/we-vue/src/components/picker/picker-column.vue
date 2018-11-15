<template>
  <div
    class="weui-picker__group"
    @touchstart="onTouchstart"
    @touchmove.prevent="onTouchmove"
    @touchend="onTouchend"
    @touchcancel="onTouchend"
  >
    <div class="weui-picker__mask" :style="pickerMaskStyle"/>
    <div
      class="weui-picker__indicator"
      ref="indicator"
      :style="pickerIndicatorStyle"
    />
    <div class="weui-picker__content" :style="wrapperStyle">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="weui-picker__item"
        :class="{ 'weui-picker__item_disabled': isDisabled(option) }"
        v-html="getOptionText(option)"
        @click="setIndex(index, true)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { isObj } from '../../utils'
import deepClone from '../../utils/deep-clone'
import Vue from 'vue'

const range = (num, min, max) => Math.min(Math.max(num, min), max)

// height of th option item
const ITEM_HEIGHT = 34
// default transition
const DEFAULT_TRANSITION = 'all 150ms ease'

export default Vue.extend({
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
      validator: value => {
        return [3, 5, 7].indexOf(value) > -1
      }
    },
    defaultIndex: {
      type: Number,
      default: 0
    }
  },

  data: vm => ({
    startY: 0,
    startOffset: 0,
    offset: 0,
    prevY: 0,
    prevTime: null,
    velocity: 0, // moving velocity
    transition: '',
    currentOptions: deepClone(vm.options),
    currentIndex: vm.defaultIndex
  }),

  computed: {
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
        backgroundSize:
          '100% ' + Math.floor(this.visibleItemCount / 2) * ITEM_HEIGHT + 'px'
      }
    },

    count () {
      return this.currentOptions.length
    }
  },

  watch: {
    defaultIndex (value) {
      this.setIndex(value)
    }
  },

  created () {
    this.$parent.children && this.$parent.children.push(this)
    this.setIndex(this.currentIndex)
  },

  destroyed () {
    const { children } = this.$parent
    children && children.splice(children.indexOf(this), 1)
  },

  methods: {
    getOptionText (option) {
      return isObj(option) && this.valueKey in option
        ? option[this.valueKey]
        : option
    },

    isDisabled (option) {
      return isObj(option) && option.disabled
    },

    indexToOffset (index) {
      const baseOffset = Math.floor(this.visibleItemCount / 2)
      return (index - baseOffset) * -ITEM_HEIGHT
    },

    offsetToIndex (offset) {
      offset = Math.round(offset / ITEM_HEIGHT) * ITEM_HEIGHT
      return (
        -(offset - Math.floor(this.visibleItemCount / 2) * ITEM_HEIGHT) /
        ITEM_HEIGHT
      )
    },

    onTouchstart (event: TouchEvent): void {
      this.startOffset = this.offset
      this.startY = event.touches[0].clientY
      this.prevY = event.touches[0].clientY
      this.prevTime = new Date()
      this.transition = ''
    },

    onTouchmove (event: TouchEvent): void {
      const currentTime = +new Date()
      const currentY = event.touches[0].clientY
      const distance = currentY - this.startY
      this.offset = this.startOffset + distance

      // compute velocity
      this.velocity =
        (event.touches[0].clientY - this.prevY) / (currentTime - this.prevTime)
      this.prevY = currentY

      const t = currentTime - this.prevTime

      this.prevTime = currentTime
    },

    onTouchend (): void {
      this.transition = DEFAULT_TRANSITION
      const endOffset = this.offset + this.velocity * 150
      const index = this.offsetToIndex(endOffset)
      this.setIndex(index, true)
    },

    // adjust index, avoid disabled options
    adjustIndex (index: number): void {
      index = range(index, 0, this.count)
      for (let i = index; i < this.count; i++) {
        if (!this.isDisabled(this.currentOptions[i])) return i
      }
      for (let i = index - 1; i >= 0; i--) {
        if (!this.isDisabled(this.currentOptions[i])) return i
      }
    },

    setIndex (index: number, userAction: boolean = false): void {
      index = this.adjustIndex(index) || 0
      this.offset = this.indexToOffset(index)

      if (index !== this.currentIndex) {
        this.currentIndex = index
        userAction && this.$emit('change', index)
      }
    },

    getValue () {
      return this.currentOptions[this.currentIndex]
    },

    setValue (value) {
      const { options } = this
      const valueIndex = options.findIndex(option => {
        if (isObj(value)) {
          return this.getOptionText(option) === value[this.valueKey]
        } else {
          return this.getOptionText(option) === value
        }
      })
      this.setIndex(valueIndex > -1 ? valueIndex : 0)
    }
  }
})
</script>
