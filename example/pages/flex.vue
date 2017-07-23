<template>
  <div class="page page-with-padding">
    <wv-flex :gutter="10" class="demo-flex">
      <wv-flex-item>
        <div class="placeholder"></div>
      </wv-flex-item>
    </wv-flex>

    <wv-flex :gutter="10" class="demo-flex">
      <wv-flex-item>
        <div class="placeholder">1/2</div>
      </wv-flex-item>
      <wv-flex-item>
        <div class="placeholder">1/2</div>
      </wv-flex-item>
    </wv-flex>

    <wv-flex :gutter="10" class="demo-flex">
      <wv-flex-item>
        <div class="placeholder">1/3</div>
      </wv-flex-item>
      <wv-flex-item>
        <div class="placeholder">1/3</div>
      </wv-flex-item>
      <wv-flex-item>
        <div class="placeholder">1/3</div>
      </wv-flex-item>
    </wv-flex>

    <wv-flex :gutter="10" class="demo-flex">
      <wv-flex-item>
        <div class="placeholder">1/4</div>
      </wv-flex-item>
      <wv-flex-item flex="2">
        <div class="placeholder">1/2</div>
      </wv-flex-item>
      <wv-flex-item>
        <div class="placeholder">1/4</div>
      </wv-flex-item>
    </wv-flex>
  </div>
</template>

<script>
  export default {
    mounted () {
    },

    data () {
      return {}
    },

    methods: {}
  }
</script>

<style scoped lang="scss">
  .demo-flex {
    margin: 15px 0;
  }

  .placeholder {
    background-color: #c0c0c0;
    height: 2.3em;
    line-height: 2.3em;
    text-align: center;
    color: #fff;
  }
</style>
