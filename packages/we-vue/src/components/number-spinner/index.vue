<template>
  <div
    class="wv-number-spinner"
    v-on="listeners"
  >
    <button
      class="spinner-btn btn-minus"
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
      @keypress="onKeypress"
      v-bind="$attrs"
      :style="inputStyle">
    <button
      class="spinner-btn btn-plus"
      @click="increase"
      :disabled="disabled || readonly || !increasable"
    />
  </div>
</template>

<script lang="ts">
import '../../scss/number-spinner.scss'

import Vue from 'vue'

export default Vue.extend({
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
    fillable: {
      type: Boolean,
      default: true
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

  model: {
    event: 'change'
  },

  computed: {
    increasable (): boolean {
      const num = this.currentValue

      return Number.isNaN(num) || num < this.max
    },

    decreasable (): boolean {
      const num = this.currentValue

      return Number.isNaN(num) || num > this.min
    },

    inputStyle (): object {
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
    decrease (): void {
      if (this.decreasable) {
        let { currentValue } = this
        if (Number.isNaN(currentValue)) {
          currentValue = 0
        }
        this.setValue(
          Math.min(this.max, Math.max(this.min, currentValue - this.step))
        )
      }
    },

    increase (): void {
      if (this.increasable) {
        let { currentValue } = this
        if (Number.isNaN(currentValue)) {
          currentValue = 0
        }
        this.setValue(
          Math.min(this.max, Math.max(this.min, currentValue + this.step))
        )
      }
    },

    onChange (event) {
      this.setValue(Math.min(this.max, Math.max(this.min, event.target.value)))
    },

    onPaste (event): void {
      if (
        !this.fillable ||
        !/^-?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?$/.test(
          event.clipboardData.getData('text')
        )
      ) {
        event.preventDefault()
      }
    },

    onKeypress (event): void {
      if (!this.fillable) {
        event.preventDefault()
      }
    },

    setValue (val): void {
      const oldValue = this.currentValue

      this.currentValue = val
      this.$emit('change', val, oldValue)
      this.$refs.input.value = val
    }
  },

  watch: {
    currentValue (val): void {
      this.$emit('input', val)
      this.$emit('change', val)
    },

    value (val): void {
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
