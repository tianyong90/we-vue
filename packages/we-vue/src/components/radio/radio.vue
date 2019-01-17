<template>
  <div>
    <div v-if="title" class="weui-cells__title" v-html="title" />
    <div class="weui-cells weui-cells_radio">
      <label
        v-for="option in options"
        :key="option.label || option"
        class="weui-cell weui-check__label"
        :class="{ 'weui-check__label-disabled': option.disabled }"
      >
        <div class="weui-cell__bd">
          <p v-text="option.label || option" />
        </div>
        <div class="weui-cell__ft">
          <input
            type="radio"
            class="weui-check"
            v-model="internalValue"
            :disabled="option.disabled"
            :value="option.value || option"
          >
          <span class="weui-icon-checked" />
        </div>
      </label>
    </div>
  </div>
</template>

<script>
import radio from './radio.vue.ts'
export default radio
</script>
