<template>
  <div>
    <div
      :style="{ color: titleColor }"
      class="weui-cells__title"
      v-html="title"
      v-if="title"
    />
    <div class="weui-cells">
      <slot />
    </div>
  </div>
</template>

<script>
import group from './group.vue.ts'
export default group
</script>
