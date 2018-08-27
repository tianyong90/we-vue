<template>
  <span
    class="weui-badge"
    :class="{ 'weui-badge_dot': isDot }"
    :style="{ 'background-color': color }"
  >
    <slot v-if="!isDot"/>
  </span>
</template>

<script>
import { create } from '../utils'

export default create({
  name: 'badge',

  props: {
    color: String,
    isDot: Boolean
  }
})
</script>

<style scoped lang="scss">
</style>
