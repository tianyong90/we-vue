<template>
  <div class="page">
    <wv-slider :value="percent" :disabled="false"></wv-slider>
  </div>
</template>

<script type="text/babel">
export default {
  data () {
    return {
      percent: 55
    }
  }
}
</script>

<style scoped lang="scss">
  .page {
    display: block;
    background-color: white;
  }
</style>