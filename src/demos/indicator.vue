<template>
  <div class="page-with-padding">
    <div class="buttons">
      <wv-button type="default" @click.native="openIndicator">显示加载指示</wv-button>
    </div>
  </div>
</template>

<script type="text/babel">
import Indicator from '../components/indicator/index.js'

export default {
  methods: {
    openIndicator () {
      Indicator.open('loading')

      setTimeout(() => {
        Indicator.close()
      }, 3000)
    }
  }
}
</script>

<style scoped lang="scss">
  .buttons {
    display: block;
  }
</style>
