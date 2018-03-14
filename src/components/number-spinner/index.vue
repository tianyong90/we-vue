<template>
  <div class="wv-number-spinner">
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
      @blur="onBlur"
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
    }
  },

  methods: {
    onBlur () {
      if (this.currentValue === '') {
        this.currentValue = this.min
      }
    },

    increase () {
      this.currentValue += this.step
    },

    decrease () {
      this.currentValue -= this.step
    },

    onChange (event) {
      //
    },

    onPaste (event) {
      if (!/^-?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?$/.test(event.clipboardData.getData('text'))) {
        event.preventDefault()
      }
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
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 13px;
    overflow: hidden;
    position: relative;
    height: 2.5em;

    input {
      display: inline-block;
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
