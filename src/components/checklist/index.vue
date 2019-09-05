<template>
  <div>
    <div v-if="title" class="weui-cells__title" v-html="title" />
    <div class="weui-cells weui-cells_checkbox">
      <label
        v-for="option in options"
        :key="option.label || option"
        class="weui-cell weui-check__label"
        :class="{ 'weui-check__label-disabled': option.disabled }"
        @click="handleClick(option)"
      >
        <div class="weui-cell__hd" v-if="align === 'left'">
          <i class="weui-icon-checked" :class="{ checked: isChecked(option) }" />
        </div>
        <div class="weui-cell__bd">
          <p v-text="option.label || option" />
        </div>
        <div class="weui-cell__hd" v-if="align === 'right'">
          <i class="weui-icon-checked" :class="{ checked: isChecked(option) }" />
        </div>
      </label>
    </div>
  </div>
</template>

<script>
import { create } from '../../utils'

export default create({
  name: 'checklist',

  props: {
    max: {
      type: Number,
      validator: val => {
        return val >= 0
      }
    },
    title: String,
    align: {
      type: String,
      default: 'left',
      validator: val => {
        return val === 'left' || val === 'right'
      }
    },
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
    this.currentValue = this.value
  },

  watch: {
    value (val, oldValue) {
      this.currentValue = val
      if (JSON.stringify(val) !== JSON.stringify(oldValue)) {
        this.$emit('change', val)
      }
    },

    currentValue (val) {
      if (this.max && val.length > this.max) {
        val = val.slice(0, this.max)
      }

      this.$emit('input', val)
    }
  },

  methods: {
    handleClick (option) {
      if (option.disabled) return

      this.toggle(option)
    },

    toggle (option) {
      if (this.currentValue.includes(option.value)) {
        this.currentValue = this.currentValue.filter(item => item !== option.value)
      } else {
        this.currentValue = [...this.currentValue, ...[option.value]]
      }
    },

    isChecked (option) {
      return this.currentValue.includes(option.value)
    }
  }
})
</script>

<style scoped lang="scss">
  .weui-check__label-disabled {
    background-color: rgba(0, 0, 0, 0.1)
  }

  .checked::before {
    content: '\EA06';
    color: #07c160;
  }
</style>
