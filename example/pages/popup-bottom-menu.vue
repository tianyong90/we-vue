<template>
  <div class="page" @click="click">
    <img :src="logoImg" alt="">
  </div>
</template>

<script>
  import BottomMenu from '../../src/components/popup-bottom-menu'
  import logoImg from '../assets/images/logo.png'

  export default {
    data () {
      return {
        logoImg
      }
    },

    created () {
      this.bottomMenu = new BottomMenu({
        items: [
          {
            name: '分享二维码',
            click: () => {console.log('btn0 clicked');}
          },
          {
            name: '换个样式',
            click: () => {this.bottomMenu2.open()}
          },
          {
            name: '保存到手机',
            click: () => {this.bottomMenu2.open()}
          },
          {
            name: '扫描二维码',
            click: () => {this.bottomMenu2.open()}
          }
        ]
      })

      this.bottomMenu2 = new BottomMenu({
        items: [
          {
            name: '样式一',
            click: () => {
              console.log('btn2 clicked');
              this.bottomMenu2.close();
            }
          },
          {
            name: '样式二',
            click: () => {
              console.log('btn3 clicked');
              this.bottomMenu2.close();
            }
          }
        ]
      })
    },

    methods: {
      click (e) {
        this.bottomMenu.open(e)
      }
    }
  }
</script>

<style scoped>
  img {
    position: fixed;
    z-index: 1000000000000000000000000000;
  }
</style>

