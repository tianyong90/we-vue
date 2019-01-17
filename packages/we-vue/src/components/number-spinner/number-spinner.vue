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
      :style="inputStyle"
    >
    <button
      class="spinner-btn btn-plus"
      @click="increase"
      :disabled="disabled || readonly || !increasable"
    />
  </div>
</template>

<script>
import numberSpinner from './number-spinner.vue.ts'
export default numberSpinner
</script>
