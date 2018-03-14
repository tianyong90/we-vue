<template>
  <div
    class="wv-number-spinner"
    :class="{[`wv-number-spinner--${size}`]: size }"
    v-on="listeners"
  >
    <button
      class="spinner-btn btn-decrease"
      @click="decrease"
      :disabled="disabled || readonly || !decreasable"
    />
    <input
      ref="input"
      type="number"
      :value="currentValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled || (!decreasable && !increasable)"
      :readonly="readonly"
      @change="onChange"
      @paste="onPaste"
      v-bind="$attrs"
      :style="inputStyle">
    <button
      class="spinner-btn btn-increase"
      @click="increase"
      :disabled="disabled || readonly || !increasable"
    />
  </div>
</template>

<script>
import { create } from '../../utils'

const isNaN = Number.isNaN || window.isNaN

export default create({
  name: 'wv-number-spinner',

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
    inputWidth: {
      type: String,
      default: '3em'
    },
    readonly: Boolean,
    disabled: Boolean,
    align: {
      type: String,
      default: 'center'
    },
    size: String,
    value: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      currentValue: this.value
    }
  },

  inheritAttrs: false,

  model: {
    event: 'change'
  },

  computed: {
    increasable () {
      const num = this.currentValue

      return isNaN(num) || num < this.max
    },

    decreasable () {
      const num = this.currentValue

      return isNaN(num) || num > this.min
    },

    inputStyle () {
      return {
        width: this.inputWidth,
        textAlign: this.align
      }
    },

    listeners () {
      const listeners = { ...this.$listeners }
      delete listeners.change
      return listeners
    }
  },

  created () {
    if (this.min < this.max) {
      this.currentValue = Math.min(this.max, Math.max(this.min, this.value))
    }
  },

  methods: {
    decrease () {
      if (this.decreasable) {
        let { currentValue } = this
        if (isNaN(currentValue)) {
          currentValue = 0
        }
        this.setValue(Math.min(this.max, Math.max(this.min, currentValue - this.step)))
      }
    },

    increase () {
      if (this.increasable) {
        let { currentValue } = this
        if (isNaN(currentValue)) {
          currentValue = 0
        }
        this.setValue(Math.min(this.max, Math.max(this.min, currentValue + this.step)))
      }
    },

    onChange (event) {
      this.setValue(Math.min(this.max, Math.max(this.min, event.target.value)))
    },

    onPaste (event) {
      if (!/^-?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?$/.test(event.clipboardData.getData('text'))) {
        event.preventDefault()
      }
    },

    setValue (val) {
      const oldValue = this.currentValue

      this.currentValue = val
      this.$emit('change', val, oldValue)
      this.$nextTick(() => {
        this.$refs.input.value = val
      })
    }
  },

  watch: {
    currentValue (val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },

    value (val) {
      if (typeof val === 'number') {
        if (val <= this.min) {
          this.currentValue = this.min
        } else if (val >= this.max) {
          this.currentValue = this.max
        } else {
          this.currentValue = val
        }
      } else if (val === '') {
        this.currentValue = ''
      }
    }
  }
})
</script>

<style scoped lang="scss">
  .wv-number-spinner {
    display: block;
    min-width: 100%;
    font-size: 13px;
    overflow: hidden;
    position: relative;

    input {
      display: block;
      float: left;
      border: none;
      outline: none;
      padding: 0 .5em;
    }

    .spinner-btn {
      border: 0;
      border-radius: .25rem;
      top: 0.0625rem;
      bottom: 0.0625rem;
      position: absolute;
      background-color: transparent;
      width: 2.5em;

      &::before,
      &::after {
        background-color: #111;
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: background-color .15s;
      }

      &::before {
        height: 0.0625rem;
        width: 50%;
      }

      &::after {
        height: 50%;
        width: 0.0625rem;
      }
    }

    .btn-decrease {
      border-right: 1px solid #ccc;
    }

    .btn-increase {
      border-left: 1px solid #ccc;
    }

    .spinner-btn[disabled] {
      color: #888;
    }
  }
</style>
