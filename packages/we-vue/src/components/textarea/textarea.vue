<template>
  <div class="weui-cell">
    <div class="weui-cell__bd">
      <textarea
        @change="$emit('change', internalValue)"
        @focus="onFocus"
        @blur="onBlur"
        class="weui-textarea"
        ref="rextarea"
        :placeholder="placeholder"
        :rows="rows"
        :disabled="disabled"
        :readonly="readonly"
        v-model="internalValue"
      />
      <div class="weui-textarea-counter" v-if="showCounter">
        {{ `${length}/${maxLength}` }}
      </div>
    </div>
  </div>
</template>

<script>
import textarea from './textarea.vue.ts'
export default textarea
</script>
