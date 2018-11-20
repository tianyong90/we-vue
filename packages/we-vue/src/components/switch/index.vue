<template>
  <cell :title="title" v-if="isInCell">
    <wv-switch
      :is-in-cell="false"
      slot="ft"
      v-model="currentValue"
      :disabled="disabled"
    />
  </cell>

  <div
    class="wv-switch"
    :class="{ 'wv-switch-on': currentValue, 'wv-switch-disabled': disabled }"
    @click="onClick"
    v-else
  >
    <div class="background"/>
    <div
      class="thumb"
      :style="thumbStyle"
      @touchstart="onTouchstart"
      @touchmove="onTouchmove"
      @touchend="onTouchend"
      @touchcancel="onTouchend"
    />
  </div>
</template>

<script lang="ts">
import '../../scss/switch.scss'

import { getTouch } from '../../utils'
import Cell from '../cell/index'
import Themeable from '../../mixins/themeable'

import mixins from '../../utils/mixins'

// 开关的行程
const THUMB_STROKE = 20

export default mixins(
  Themeable
).extend({
  name: 'wv-switch',

  components: {
    Cell
  },

  props: {
    title: String,
    disabled: Boolean,
    isInCell: {
      type: Boolean,
      default: true
    },
    value: Boolean
  },

  data () {
    return {
      currentValue: this.value,
      startX: 0,
      offset: 0,
      startOffset: 0,
      transition: ''
    }
  },

  computed: {
    thumbStyle () {
      return {
        transition: this.transition,
        transform: `translate3d(${this.offset}px, 0, 0)`
      }
    }
  },

  mounted () {
    this.offset = this.currentValue ? THUMB_STROKE : 0
  },

  methods: {
    onClick (event) {
      event.preventDefault()
      if (this.disabled) return

      this.currentValue = !this.currentValue
    },

    onTouchstart (event) {
      if (this.disabled) return

      const touch = getTouch(event)

      this.startX = touch.clientX
      this.startOffset = this.offset
      this.transition = ''
    },

    onTouchmove (event) {
      if (this.disabled) return

      const touch = getTouch(event)
      const deltaX = touch.clientX - this.startX

      const targetOffset = this.startOffset + deltaX

      if (targetOffset >= 0 && targetOffset <= THUMB_STROKE) {
        this.offset = targetOffset
      } else if (targetOffset < 0) {
        this.offset = 0
      } else if (targetOffset > THUMB_STROKE) {
        this.offset = THUMB_STROKE
      }
    },

    onTouchend (event) {
      if (this.disabled) return

      const touch = getTouch(event)

      let deltaX = touch.clientX - this.startX

      this.transition =
        '-webkit-transform .35s cubic-bezier(0.4, 0.4, 0.25, 1.35)'
      if (this.currentValue) {
        if (deltaX < THUMB_STROKE / -2) {
          this.currentValue = false
        } else {
          this.offset = THUMB_STROKE
        }
      } else {
        if (deltaX > THUMB_STROKE / 2) {
          this.currentValue = true
        } else {
          this.offset = 0
        }
      }
    }
  },

  watch: {
    value (val) {
      this.currentValue = val
    },

    currentValue (val) {
      this.$emit('input', val)
      this.$emit('change', val)

      this.offset = val ? THUMB_STROKE : 0
    }
  }
})
</script>
