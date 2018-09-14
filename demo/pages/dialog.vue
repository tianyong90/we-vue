<template>
  <div class="page">
    <wv-radio title="选择皮肤" :options="['ios', 'android']" v-model="skin" />

    <div class="buttons">
      <wv-button type="primary" @click="showAlert()">Alert</wv-button>
      <wv-button type="warn" @click="showConfirm()">Confirm</wv-button>
    </div>
  </div>
</template>

<script>
import { Dialog } from '../../packages'

export default {
  data () {
    return {
      skin: 'ios'
    }
  },

  methods: {
    showAlert () {
      Dialog.alert({
        title: '提示窗口',
        message: 'Hello WE-VUE!'
      })
    },

    showConfirm () {
      Dialog.confirm({
        title: '确认窗口',
        message: '你确定吗？'
      }).then(() => {
        this.$toast.text('confirmed')
      }).catch(() => {
        this.$toast.text('canceled')
      })
    }
  },

  watch: {
    skin (val) {
      Dialog.setDefaultOptions({
        skin: val
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .buttons {
    width: 80%;
    margin: 20px auto;
  }
</style>
