<template>
  <div class="weui-grid" @click="onClick">
    <div class="weui-grid__icon" v-if="$slots.icon">
      <slot name="icon" />
    </div>
    <p class="weui-grid__label" v-if="$slots.label">
      <slot name="label" />
    </p>
    <slot />
  </div>
</template>

<script>
import gridItem from './grid-item.vue.ts'
export default gridItem
</script>
