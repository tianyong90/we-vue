<template>
  <span class="weui-badge" :style="{ backgroundColor: color }">
    <slot></slot>
  </span>
</template>

<script type="text/babel">
export default {
  name: 'vui-badge',

  props: {
    color: String,
    type: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<style scoped lang="scss">
</style>