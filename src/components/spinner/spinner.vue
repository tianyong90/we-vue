<template>
  <i class="weui-loading" style="{ 'fontSize': size + 'px', 'color': color }"></i>
</template>

<script>
  export default {
    name: 'wv-spinner',

    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: {
        type: Number,
        default: 28
      },
      color: {
        type: String,
        default: '#ccc'
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
