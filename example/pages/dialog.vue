<template>
  <div class="page page-with-padding buttons">
    <wv-button type="default" @click.native="showDialog('ios', 'style1')">iOS Dialog 样式一</wv-button>
    <wv-button type="default" @click.native="showDialog('ios', 'style2')">iOS Dialog 样式二</wv-button>
    <wv-button type="default" @click.native="showDialog('android', 'style1')">Android Dialog 样式一</wv-button>
    <wv-button type="default" @click.native="showDialog('android', 'style2')">Android Dialog 样式二</wv-button>
  </div>
</template>

<script type="text/babel">
import Dialog from '../../src/components/dialog'

export default {
  methods: {
    showDialog (skin, style) {
      if (style === 'style1') {
        Dialog({
          title: '窗口标题',
          message: 'hello world',
          skin
        })
      } else {
        Dialog({
          message: 'hello world',
          skin
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .buttons {
    display: block;
    width: 80%;
    margin:20px auto;
  }
</style>
