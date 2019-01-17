<template>
  <span
    class="weui-badge"
    :class="{ 'weui-badge_dot': isDot }"
    :style="{ 'background-color': color }"
  >
    <slot v-if="!isDot" />
  </span>
</template>

<script>
import badge from './badge.vue.ts'
export default badge
</script>
