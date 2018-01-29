<template>
  <div>
    <div v-if="title" class="weui-cells__title" v-html="title"/>
    <div class="weui-cells weui-cells_checkbox">
      <label
        v-for="option in options"
        :key="option.label || option"
        class="weui-cell weui-check__label"
        :class="{ 'weui-check__label-disabled': option.disabled }">
        <div class="weui-cell__hd">
          <input
            type="checkbox"
            class="weui-check"
            v-model="currentValue"
            :disabled="option.disabled"
            :value="option.value || option">
          <i class="weui-icon-checked"/>
        </div>
        <div class="weui-cell__bd">
          <p v-text="option.label || option"/>
        </div>
      </label>
    </div>
  </div>
</template>

<script>
import { create } from '../../utils'

export default create({
  name: 'wv-checklist',

  props: {
    max: {
      type: Number,
      validator: (val) => {
        return val >= 0
      }
    },
    title: String,
    align: String,
    options: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      currentValue: this.value
    }
  },

  created () {
    if (this.max && this.value.length > this.max) {
      this.currentValue = this.value.slice(0, this.max)
    } else {
      this.currentValue = this.value
    }
  },

  watch: {
    currentValue (val) {
      if (this.max && val.length > this.max) {
        this.currentValue = val.slice(0, this.max)
        return
      }

      this.$emit('input', val)
    },

    value (val, oldValue) {
      if (JSON.stringify(val) !== JSON.stringify(oldValue)) {
        this.$emit('change', val)
      }
    }
  }
})
</script>

<style scoped lang="scss">
  .weui-check__label-disabled {
    background-color: rgba(0, 0, 0, 0.1)
  }
</style>
