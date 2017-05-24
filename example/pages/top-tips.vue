<template>
  <div class="page-with-padding">
    <wv-button type="primary" @click="showTips">显示提示 (5S)</wv-button>
  </div>
</template>

<script>
import TopTips from '../../src/components/top-tips'

export default {
  methods: {
    showTips () {
      TopTips({
        message: '提示信息',
        duration: 5000
      })
    }
  }
}
</script>
