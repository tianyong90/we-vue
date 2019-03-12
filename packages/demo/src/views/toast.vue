<template>
  <div class="page page-with-padding">
    <w-button type="default" @click="showSuccess">成功提示</w-button>
    <w-button type="default" @click="showError">出错提示</w-button>
    <w-button type="default" @click="showText">纯文本提示</w-button>
    <w-button type="default" @click="showLoading">加载提示</w-button>
  </div>
</template>

<script>
// 按需引入
// import { WToast } from 'we-vue/lib'

export default {
  mounted () {
    this.$toast.setDefaultOptions({
      duration: 1000
    })
  },

  methods: {
    showSuccess () {
      this.$toast.success('操作成功')
    },

    showError () {
      this.$toast.fail({
        duration: 1000,
        message: '操作失败'
      })
    },

    showText () {
      this.$toast.text({
        duration: 1000,
        message: 'hello'
      })
    },

    showLoading () {
      this.$toast.loading({
        message: 'Loaidng',
        duration: 2000
      })
    }
  }
}
</script>
