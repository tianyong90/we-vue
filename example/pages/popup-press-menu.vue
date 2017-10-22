<template>
  <div class="page" ref="page">
    <wv-group title="弹出菜单示例">
      <wv-cell title="根据点击的位置" is-link @click="click"></wv-cell>
    </wv-group>
  </div>
</template>


<script>
  import PressMenu from '../../src/components/popup-press-menu'

  export default {

    created () {
      this.pressMenu = new PressMenu({
        items: [
          {
            name: '分享二维码',
            click: () => {console.log('btn0 clicked');}
          },
          {
            name: '换个样式',
            click: (e) => {this.pressMenu2.open(e)}
          },
          {
            name: '保存到手机',
            click: (e) => {this.pressMenu2.open(e)}
          },
          {
            name: '扫描二维码',
            click: (e) => {this.pressMenu2.open(e)}
          }
        ]
      })

      this.pressMenu2 = new PressMenu({
        items: [
          {
            name: '样式一',
            click: () => {
              console.log('btn2 clicked');
              this.pressMenu2.close();
            }
          },
          {
            name: '样式二',
            click: () => {
              console.log('btn3 clicked');
              this.pressMenu2.close();
            }
          }
        ]
      })
    },

    methods: {
      click (e) {
        this.pressMenu.open(e)
      }
    }
  }
</script>

<style scoped>
  
</style>

