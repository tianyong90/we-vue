<template>
  <div class="page page-with-padding">
    <w-button
      type="primary"
      @click="openTips"
    >显示提示 (3S)</w-button>
    <w-button
      type="warn"
      @click="closeTips"
    >关闭提示</w-button>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$toptips.setDefaultOptions({
      duration: 200
    })
  },

  methods: {
    openTips () {
      console.log(this.$toptips.defaultOptions)

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
