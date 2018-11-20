<template>
  <div>
    <div v-if="title" class="weui-cells__title" v-html="title"/>
    <div class="weui-cells weui-cells_radio">
      <label
        v-for="option in options"
        :key="option.label || option"
        class="weui-cell weui-check__label"
        :class="{ 'weui-check__label-disabled': option.disabled }">
        <div class="weui-cell__bd">
          <p v-text="option.label || option"/>
        </div>
        <div class="weui-cell__ft">
          <input
            type="radio"
            class="weui-check"
            v-model="currentValue"
            :disabled="option.disabled"
            :value="option.value || option">
          <span class="weui-icon-checked"/>
        </div>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import '../../scss/radio.scss'

import { PropValidator } from 'vue/types/options'

import Themeable from '../../mixins/themeable'

import mixins from '../../utils/mixins'

export default mixins(
  Themeable
  /* @vue/component */
).extend({
  name: 'wv-radio',

  props: {
    title: String,
    align: {
      type: String,
      default: 'left'
    },
    options: {
      type: Array,
      required: true
    },
    value: null as any as PropValidator<any>
  },

  data () {
    return {
      // TODO
      currentValue: (this as any).value
    }
  },

  watch: {
    currentValue (val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },

    value (val) {
      this.currentValue = val
    }
  }
})
</script>
