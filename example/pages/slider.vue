<template>
  <div class="page page-with-padding">
    <wv-slider v-model="percent" :min="10" :max="80" :disabled="false"></wv-slider>
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
    background-color: white;
  }
</style>
