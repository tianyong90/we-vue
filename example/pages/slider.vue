<template>
  <div class="page page-with-padding">
    <wv-slider :value="50" :min="10" :max="100" disabled :show-value-box="false"></wv-slider>
    <wv-slider v-model="percent" :min="10" :max="80"></wv-slider>
  </div>
</template>

<script>
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
    padding-top: 5em;
    background-color: white;
  }
</style>
