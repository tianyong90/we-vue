<template>
  <div class="page">
    <wv-swipe :height="180" :pages="pages"></wv-swipe>
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
