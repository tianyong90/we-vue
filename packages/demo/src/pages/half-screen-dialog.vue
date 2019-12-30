<template>
  <div class="page">
    <div class="buttons">
      <w-button type="primary" @click="showAlert()">Alert</w-button>
      <w-button type="warn" @click="showConfirm()">Confirm</w-button>
    </div>

    <w-half-screen-dialog :visible="true">
      asdfas
    </w-half-screen-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },

  methods: {
    showAlert () {
      this.$dialog.alert({
        title: '提示窗口',
        message: 'Hello WE-VUE!',
      })
    },

    showConfirm () {
      this.$dialog.confirm({
        title: '确认窗口',
        message: '你确定吗？',
      })
        .then(() => {
          this.$toast.text('confirmed')
        })
        .catch(() => {
          this.$toast.text('canceled')
        })
    },
  },
}
</script>

<style scoped lang="scss">
.buttons {
  width: 80%;
  margin: 20px auto;
}
</style>
