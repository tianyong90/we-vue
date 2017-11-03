<template>
  <div class="page page-with-padding buttons">
    <wv-button type="primary" @click="showDialog('ios', '窗口标题')">iOS Dialog 有标题</wv-button>
    <wv-button type="primary" @click="showDialog('ios')">iOS Dialog 无标题</wv-button>
    <wv-button type="primary" @click="showDialog('android', '窗口标题')">Android Dialog 有标题</wv-button>
    <wv-button type="primary" @click="showDialog('android')">Android Dialog 无标题</wv-button>
  </div>
</template>

<script>
  import Toast from '../../src/components/toast'

  export default {

    created (){
      this.dialog = new this.$popUpDialog({
        message: '欢迎使用 we-vue!',
        showCancelBtn: true,
        onComfrim: this.doSomething
      })
    },

    methods: {
      doSomething () {
        Toast('confirm btn clicked.')
      },

      showDialog (skin, title) {
        this.dialog.open(null, {
          skin: skin,
          title: title
        })
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
