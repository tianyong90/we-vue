<template>
  <div class="page">
    <wv-swipe :height="180" :pages="pages">
      <wv-swipe-item style="background-color: red"></wv-swipe-item>
      <wv-swipe-item style="background-color: yellow"></wv-swipe-item>
      <wv-swipe-item style="background-color: green"></wv-swipe-item>
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
</style>
