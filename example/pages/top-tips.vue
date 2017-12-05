<template>
  <div class="page page-with-padding">
    <wv-button type="primary" @click="showTips">显示提示 (2S)</wv-button>
  </div>
</template>

<script>
  import TopTips from '../../src/components/top-tips'

  export default {
    methods: {
      showTips () {
        TopTips({
          message: '提示信息',
          duration: 2000
        })
      }
    }
  }
</script>
