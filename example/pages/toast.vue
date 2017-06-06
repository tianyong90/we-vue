<template>
  <div class="page-with-padding">
    <wv-button type="default" @click="showSuccess">成功提示</wv-button>
    <wv-button type="default" @click="showError">出错提示</wv-button>
    <wv-button type="default" @click="showText">纯文本提示</wv-button>
  </div>
</template>

<script>
  import Toast from '../../src/components/toast'

  export default {
    methods: {
      showSuccess () {
        Toast('操作成功')
      },

      showError () {
        Toast({
          duration: 1000,
          message: '操作失败',
          icon: 'warn'
        })
      },

      showText () {
        Toast({
          duration: 1000,
          message: 'hello',
          type: 'text'
        })
      }
    }
  }
</script>
