<template>
  <div class="page" @click="click">
    <div class="btn" ref="btn0" @click="click0">蓝精灵</div>
    <div class="btn" ref="btn1" @click="click1">蓝精灵</div>
    <div class="btn" ref="btn2" @click="click2">蓝精灵</div>
    <div class="btn" ref="btn3" @click="click3">蓝精灵</div>
  </div>
</template>

<script>
  import PressMenu from '../../src/components/popup-dom-relative'

  export default {

    mounted () {
      this.pressMenu_topLeft_belowAfter = new PressMenu({
        refDom: this.$refs.btn0,
        refCorner: 'top left',
        relativeToCorner: 'below after',
        items: [
          {
            name: '分享二维码',
            click: () => {console.log('btn0 clicked');}
          },
          {
            name: '换个样式',
            click: (e) => {this.pressMenu.open(e)}
          }
        ]
      })

      this.pressMenu = new PressMenu({
        items: [
          {
            name: '样式一',
            click: () => {
              console.log('btn2 clicked');
              this.pressMenu.close();
            }
          },
          {
            name: '样式二',
            click: () => {
              console.log('btn3 clicked');
              this.pressMenu.close();
            }
          }
        ]
      })

      this.pressMenu_topRight_belowAfter = new PressMenu({
        refDom: this.$refs.btn1,
        refCorner: 'top right',
        relativeToCorner: 'below after',
        items: [
          {
            name: '分享二维码',
            click: () => {console.log('btn0 clicked');}
          },
          {
            name: '换个样式',
            click: (e) => {this.pressMenu.open(e)}
          }
        ]
      })

      this.pressMenu_topRight_aboveAfter = new PressMenu({
        refDom: this.$refs.btn2,
        refCorner: 'top right',
        relativeToCorner: 'above after',
        items: [
          {
            name: '分享二维码',
            click: () => {console.log('btn0 clicked');}
          },
          {
            name: '换个样式',
            click: (e) => {this.pressMenu.open(e)}
          }
        ]
      })

      this.pressMenu_centerRight_aboveAfter = new PressMenu({
        refDom: this.$refs.btn3,
        refCorner: 'bottom center',
        relativeToCorner: 'below before',
        items: [
          {
            name: '分享二维码',
            click: () => {console.log('btn0 clicked');}
          },
          {
            name: '换个样式',
            click: (e) => {this.pressMenu.open(e)}
          }
        ]
      })
    },

    methods: {
      click (e){
        console.log('from page',e);
      },
      click0 (e) {
        console.log(e);
        this.pressMenu_topLeft_belowAfter.open(e)
      },
      click1 (e) {
        this.pressMenu_topRight_belowAfter.open(e)
      },
      click2 (e) {
        this.pressMenu_topRight_aboveAfter.open(e)
      },
      click3 (e) {
        this.pressMenu_centerRight_aboveAfter.open(e)
      },
    }
  }
</script>

<style scoped>
  .btn {
    width: 92px;
    height: 38px;
    background: #009688;
    color: #fff;
    border-radius: 3px;
    font-size: 17px;
    margin: 30px auto 0 auto;
    text-align: center;
    line-height: 38px;
  }
</style>

