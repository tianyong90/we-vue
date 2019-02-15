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
// TODO
// import { Dialog } from 'we-vue'

export default {
  data () {
    return {
      skin: 'ios'
    }
  },

  methods: {
    showAlert () {
      this.$dialog.alert({
        title: '提示窗口',
        message: 'Hello WE-VUE!'
      })
    },

    showConfirm () {
      this.$dialog.confirm({
        title: '确认窗口',
        message: '你确定吗？'
      })
        .then(() => {
          this.$toast.text('confirmed')
        })
        .catch(() => {
          this.$toast.text('canceled')
        })
    }
  },

  watch: {
    skin (val) {
      this.$dialog.setDefaultOptions({
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
