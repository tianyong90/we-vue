<template>
  <div>
    <div class="buttons">
      <vui-button type="default" @click.native="showSuccess">成功提示</vui-button>
      <vui-button type="default" @click.native="showError">出错提示</vui-button>
    </div>
  </div>
</template>

<script type="text/babel">
import Toast from '../components/toast/index.js'

export default {
  methods: {
    showSuccess () {
      Toast('操作成功')
    },

    showError () {
      Toast('操作失败')
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