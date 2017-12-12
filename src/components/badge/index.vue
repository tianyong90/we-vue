<template>
  <span class="weui-badge" :class="{ 'weui-badge_dot': isDot }" :style="{ 'background-color': color }">
    <slot v-if="!isDot"></slot>
  </span>
</template>

<script>
  import { create } from '../../utils'

  export default create({
    name: 'wv-badge',

    props: {
      color: String,
      isDot: Boolean
    }
  })
</script>

<style scoped lang="scss">
</style>
