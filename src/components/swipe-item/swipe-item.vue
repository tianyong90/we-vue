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
