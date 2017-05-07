<template>
  <a :class="'weui-swiped-btn weui-swiped-btn_' + type"><slot></slot></a>
</template>

<script>
  export default {
    name: 'wv-cell-swipe-button',

    props: {
      type: {
        type: String,
        default: 'default'
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
