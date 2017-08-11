<template>
  <div class="page page-with-padding buttons">
    <wv-button type="primary" @click="showDialog('ios', '窗口标题')">iOS Dialog 有标题</wv-button>
    <wv-button type="primary" @click="showDialog('ios')">iOS Dialog 无标题</wv-button>
    <wv-button type="primary" @click="showDialog('android', '窗口标题')">Android Dialog 有标题</wv-button>
    <wv-button type="primary" @click="showDialog('android')">Android Dialog 无标题</wv-button>
  </div>
</template>

<script>
  import Dialog from '../../src/components/dialog'
  import Toast from '../../src/components/toast'

  export default {
    methods: {
      doSomething () {
        Toast('confirm btn clicked.')
      },

      showDialog (skin, title) {
        Dialog({
          title: title,
          message: '欢迎使用 we-vue!',
          skin,
          showCancelBtn: true
        },
        this.doSomething)
      }
    }
  }
</script>

<style scoped lang="scss">
  .buttons {
    display: block;
    width: 80%;
    margin: 20px auto;
  }
</style>
