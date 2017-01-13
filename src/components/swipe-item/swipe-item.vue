<template>
  <div class="wv-swipe-item">
    <slot>hahahah</slot>
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
    display: block;
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
    transition: all .2s ease-in-out;
  }
</style>
