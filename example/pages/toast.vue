<template>
  <div class="page-with-padding">
    <wv-button type="primary" @click.native="showSuccess">成功提示</wv-button>
    <wv-button type="warn" @click.native="showError">出错提示</wv-button>
  </div>
</template>

<script type="text/babel">
import Toast from '../../src/components/toast'

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