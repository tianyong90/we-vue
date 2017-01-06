<template>
  <div class="page">
    <wv-swipe :height="200">
      <wv-swipe-item></wv-swipe-item>
      <wv-swipe-item></wv-swipe-item>
      <wv-swipe-item></wv-swipe-item>
    </wv-swipe>
  </div>
</template>

<script type="text/babel">
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
  .page {
    background-color: white;
  }
</style>
