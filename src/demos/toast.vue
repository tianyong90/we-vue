<template>
  <div>
    <div class="buttons">
      <vui-button type="default" @click.native="success">成功提示</vui-button>
      <vui-button type="default" @click.native="loading">加载中提示</vui-button>
    </div>
  </div>
</template>

<script>
import Toast from '../components/toast/index.js'

export default {
  methods: {
    success () {
      console.log(Toast)
    },

    loading () {

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