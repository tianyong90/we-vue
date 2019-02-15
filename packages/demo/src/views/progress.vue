<template>
  <div class="page page-with-padding">
    <wv-progress :percent="percent1" :show-clear="false"/>
    <wv-progress :percent="percent2" @cancel="onCancel"/>
    <wv-progress percent="10"/>

    <wv-button type="primary" @click="upload">上传</wv-button>
  </div>
</template>

<script>
import { Toast } from 'we-vue'

export default {
  data () {
    return {
      percent1: 35,
      percent2: 0
    }
  },

  methods: {
    upload () {
      let temp = 0

      let ticker = setInterval(() => {
        temp++

        this.percent1 = temp
        this.percent2 = temp

        if (temp >= 100) {
          clearInterval(ticker)
        }
      }, 10)
    },

    onCancel () {
      Toast({
        message: 'canceled',
        type: 'text'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.weui-progress {
  height: 50px;
}
</style>
