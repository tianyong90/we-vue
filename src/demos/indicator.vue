<template>
  <div>
    <div class="buttons">
      <vui-button type="default" @click.native="openIndicator">显示加载指示</vui-button>
    </div>
  </div>
</template>

<script type="text/babel">
import Indicator from '../components/indicator/index.js'

export default {
  methods: {
    openIndicator () {
      Indicator.open()

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
    width: 80%;
    margin:20px auto;
  }
</style>