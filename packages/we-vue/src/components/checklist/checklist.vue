<template>
  <div>
    <div v-if="title" class="weui-cells__title" v-html="title" />
    <div class="weui-cells weui-cells_checkbox">
      <label
        v-for="option in options"
        :key="option.label || option"
        class="weui-cell weui-check__label"
        :class="{ 'weui-check__label-disabled': option.disabled }"
      >
        <div class="weui-cell__hd" v-if="align === 'left'">
          <input
            type="checkbox"
            class="weui-check"
            v-model="currentValue"
            :disabled="option.disabled"
            :value="option.value || option"
          >
          <i class="weui-icon-checked" />
        </div>
        <div class="weui-cell__bd">
          <p v-text="option.label || option" />
        </div>
        <div class="weui-cell__hd" v-if="align === 'right'">
          <input
            type="checkbox"
            class="weui-check"
            v-model="currentValue"
            :disabled="option.disabled"
            :value="option.value || option"
          >
          <i class="weui-icon-checked" />
        </div>
      </label>
    </div>
  </div>
</template>

<script>
import checklist from './checklist.vue.ts'
export default checklist
</script>
