<template>
  <div class="page">
    <wv-swipe :height="200" :pages="pages">
      <wv-swipe-item>1</wv-swipe-item>
      <wv-swipe-item>2</wv-swipe-item>
      <wv-swipe-item>3</wv-swipe-item>
    </wv-swipe>
  </div>
</template>

<script type="text/babel">
export default {
  data () {
    return {
      pages: [
        1,
        2,
        3
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .page {
    background-color: white;
  }
</style>
