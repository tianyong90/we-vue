<template>
  <div class="page-with-padding">
    <vui-button type="primary" @click.native="showSuccess">成功提示</vui-button>
    <vui-button type="warn" @click.native="showError">出错提示</vui-button>
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