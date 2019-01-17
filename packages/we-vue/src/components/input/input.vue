<template>
  <div class="weui-cell" :class="{ 'weui-cell_warn': !valid }">
    <div class="weui-cell__hd">
      <label
        class="weui-label"
        v-html="label"
        v-if="label"
        :style="{ width: labelWidth + 'px' }"
      />
    </div>
    <div class="weui-cell__bd">
      <input
        class="weui-input"
        ref="input"
        :type="type"
        :auto-complete="autoComplete"
        :autofocus="autofocus"
        :placeholder="placeholder"
        :value="currentValue"
        :readonly="readonly"
        :number="type === 'number'"
        :maxlength="maxlength"
        :minlength="minlength"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange"
        @input="handleInput"
      >
    </div>
    <div class="weui-cell__ft">
      <wv-icon type="warn" v-if="!valid" />
      <slot name="ft" />
    </div>
  </div>
</template>

<script>
import input from './input.vue.ts'
export default input
</script>
