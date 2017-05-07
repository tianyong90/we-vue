<template>
  <div class="weui-tabbar" :style="{ position: fixed ? 'fixed' : 'absolute' }">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'wv-tabbar',

    props: {
      fixed: Boolean
    }
  }
</script>

<style scoped lang="scss">
</style>
