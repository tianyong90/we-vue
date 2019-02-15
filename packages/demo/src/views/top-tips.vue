<template>
  <div class="page page-with-padding">
    <wv-button
      type="primary"
      @click="openTips"
    >显示提示 (3S)</wv-button>
    <wv-button
      type="warn"
      @click="closeTips"
    >关闭提示</wv-button>
  </div>
</template>

<script>
export default {
  methods: {
    openTips () {
      this.$toptips({
        message: '提示信息',
        duration: 3000
      })
    },

    closeTips () {
      this.$toptips.close()
    }
  }
}
</script>

<style scoped lang="scss">
.page {
  margin-top: 50px;
}
</style>
