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

<script>
import Cell from '../cell/index'
import { create, getTouch } from '../../utils'

// 开关的行程
const THUMB_STROKE = 20

export default create({
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

      this.transition = '-webkit-transform .35s cubic-bezier(0.4, 0.4, 0.25, 1.35)'
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

<style scoped lang="scss">
  $wv-switch-height: 32px;
  $thumb-background-color: #fff;
  $on-color: #04BE02;
  $off-color: #FDFDFD;
  $thumb-color: #fff;

  .wv-switch {
    position: relative;
    width: 52px;
    height: $wv-switch-height;
    border: 1px solid #DFDFDF;
    outline: 0;
    border-radius: 16px;
    box-sizing: border-box;
    background-color: #DFDFDF;
    transition: background-color .1s, border .1s;

    .background {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      width: 50px;
      height: $wv-switch-height - 2;
      border-radius: 15px;
      background-color: #FDFDFD;
      transition: transform .35s cubic-bezier(0.45, 1, 0.4, 1);
    }

    .thumb {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      width: $wv-switch-height - 2;
      height: $wv-switch-height - 2;
      border-radius: 15px;
      background-color: $thumb-color;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    }

    &.wv-switch-on {
      border-color: $on-color;
      background-color: $on-color;

      .background {
        transform: scale(0);
      }

      .thumb {
        transform: translateX(20px);
      }
    }
  }

  .wv-switch-disabled {
    &.wv-switch-on {
      border-color: #dedede;
      background-color: #dedede;
    }
    .background {
      background-color: #dedede;
    }

    .thumb {
      background-color: lightgray;
    }
  }

  // 兼容IE Edge的版本
  .wv-switch-cp__input {
    position: absolute;
    left: -9999px;
  }

  .wv-switch-cp__box {
    display: block;
  }
</style>
