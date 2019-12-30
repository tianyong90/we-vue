<template>
  <div class="p-6">
    <w-progress class="my-6" :percent="percent1" :show-clear="false"/>
    <w-progress class="my-6" :percent="percent2" @cancel="onCancel"/>
    <w-progress class="my-6" percent="10"/>
    <w-progress class="my-6" percent="12" color="red" background-color="rgba(0, 0, 0, 0.2)" />
    <w-progress class="my-6" percent="60" :stroke-width="10"/>
    <w-progress class="my-6" percent="60" :stroke-width="10" :border-radius="5"/>

    <w-button type="primary" @click="upload">上传</w-button>
  </div>
</template>

<script>
import { Toast } from 'we-vue'

export default {
  data () {
    return {
      percent1: 35,
      percent2: 0,
    }
  },

  methods: {
    upload () {
      let temp = 0

      const ticker = setInterval(() => {
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
        type: 'text',
      })
    },
  },
}
</script>

<style scoped lang="scss">
</style>
