<template>
  <button
    class="weui-btn"
    :class="classes"
    @click="onClick"
    :disabled="disabled"
  >
    <i class="weui-loading" v-if="isLoading" />
    <slot />
  </button>
</template>

<script>
import button from './button.vue.ts'
export default button
</script>
