<template>
  <div class="page page-with-padding">
    <wv-button type="primary" @click="openTips">显示提示 (5S)</wv-button>
    <wv-button type="warn" @click="closeTips">关闭提示</wv-button>
  </div>
</template>

<script>
import TopTips from '../../packages/top-tips'

export default {
  methods: {
    openTips () {
      TopTips({
        message: '提示信息',
        duration: 5000
      })
    },

    closeTips () {
      TopTips.close()
    }
  }
}
</script>

<style scoped lang="scss">
  .page {
    margin-top: 50px
  }
</style>
