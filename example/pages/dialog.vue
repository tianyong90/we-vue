<template>
  <div class="page page-with-padding buttons">
    <wv-button type="default" @click="showDialog('ios', '窗口标题')">iOS Dialog 有标题</wv-button>
    <wv-button type="default" @click="showDialog('ios')">iOS Dialog 无标题</wv-button>
    <wv-button type="default" @click="showDialog('android', '窗口标题')">Android Dialog 有标题</wv-button>
    <wv-button type="default" @click="showDialog('android')">Android Dialog 无标题</wv-button>
  </div>
</template>

<script>
  import Dialog from '../../src/components/dialog'

  export default {
    methods: {
      doSomething () {
        console.log('hello')
      },

      showDialog (skin, title) {
        Dialog({
          title: title,
          message: 'hello world',
          skin
        },
        this.doSomething)
      }
    }
  }
</script>

<style scoped lang="scss">
  .buttons {
    display: block;
    margin: 20px auto;
    padding: 0 30px;
  }
</style>
