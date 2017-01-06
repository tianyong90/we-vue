<template>
  <div class="wv-swipe-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'wv-swipe-item',

  mounted () {
    this.$parent && this.$parent.swipeItemCreated(this)
  },

  destroyed () {
    this.$parent && this.$parent.swipeItemDestroyed(this)
  }
}
</script>

<style scoped lang="scss">
  .wv-swipe-item {
    display: flex;
    width: 100%;
    height: 100%;
    float: left;
    overflow: hidden;
    background: yellow;
    justify-content: center;
    align-items: center;
  }
</style>
