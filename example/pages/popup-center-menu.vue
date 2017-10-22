<template>
  <div class="page" @click="click" ref="page">
    <img :src="logoImg" alt=""><br>
    <wv-group title="上下居中的菜单示例">
      <wv-cell title="点击弹出" is-link></wv-cell>
    </wv-group>
  </div>
</template>

<script>
  import CenterMenu from '../../src/components/popup-center-menu'

  export default {

    created () {
      this.centerMenu = new CenterMenu({
        items: [
          {
            name: '分享二维码',
            click: () => {
              console.log('btn0 clicked');
              this.centerMenu.close()
            }
          },
          {
            name: '换个样式',
            click: () => {this.centerMenu2.open()}
          },
          {
            name: '保存到手机',
            click: () => {this.centerMenu2.open()}
          },
          {
            name: '扫描二维码',
            click: () => {this.centerMenu2.open()}
          }
        ]
      })

      this.centerMenu2 = new CenterMenu({
        items: [
          {
            name: '样式一',
            click: () => {
              console.log('btn2 clicked');
              this.centerMenu2.close();
            }
          },
          {
            name: '样式二',
            click: () => {
              console.log('btn3 clicked');
              this.centerMenu2.close();
            }
          }
        ]
      })
    },

    methods: {
      click (e) {
        this.centerMenu.open(e)
      }
    }
  }
</script>

<style scoped>
  
</style>

