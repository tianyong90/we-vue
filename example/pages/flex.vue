<template>
  <div class="page-with-padding">
    <wv-flex>
      <wv-flex-item>
        <div class="placeholder"></div>
      </wv-flex-item>
    </wv-flex>

    <wv-flex>
      <wv-flex-item>
        <div class="placeholder">1/2</div>
      </wv-flex-item>
      <wv-flex-item>
        <div class="placeholder">1/2</div>
      </wv-flex-item>
    </wv-flex>

    <wv-flex>
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

    <wv-flex>
      <wv-flex-item>
        <div class="placeholder">1/4</div>
      </wv-flex-item>
      <wv-flex-item>
        <div class="placeholder">1/4</div>
      </wv-flex-item>
      <wv-flex-item>
        <div class="placeholder">1/4</div>
      </wv-flex-item>
      <wv-flex-item>
        <div class="placeholder">1/4</div>
      </wv-flex-item>
    </wv-flex>
  </div>
</template>

<script type="text/babel">
export default {
  mounted () {
  },

  data () {
    return {
    }
  },

  methods: {
  }
}
</script>

<style scoped lang="scss">
  .placeholder {
    background-color: #c0c0c0;
    height: 2.3em;
    line-height: 2.3em;
    text-align: center;
    margin: 5px;
    color: #fff;
  }
</style>
