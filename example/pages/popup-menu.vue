<template>
  <div class="page" ref="page">
    <br>
    <wv-group title="底部弹出菜单示例">
      <wv-cell title="背景模糊" is-link @click="click"></wv-cell>
      <wv-cell title="支持animation.css动画库" is-link @click="click2"></wv-cell>
      <wv-cell title="bounceInUp, bounceOutDown" is-link @click="click3"></wv-cell>
      <wv-cell title="flipInX, flipOutX" is-link @click="click4"></wv-cell>
      <wv-cell title="jackInTheBox hinge" is-link @click="click12"></wv-cell>
    </wv-group>

    <wv-group title="通过animation实现过度示例">
      <wv-cell title="支持通过animation实现更多效果" is-link @click="click7"></wv-cell>
    </wv-group>

    <wv-group title="上下居中的菜单示例">
      <wv-cell title="支持有事件上下文的动效" is-link @click="click5"></wv-cell>
      <wv-cell title="支持有事件上下文的动效absolute" is-link @click="click15"></wv-cell>
    </wv-group>

    <wv-group title="微信长按菜单示例">
      <wv-cell title="根据点击的位置定位" is-link @click="click6"></wv-cell>
    </wv-group>

    <wv-group title="支持相对于dom定位">
      <div class="btn" ref="btn8" @click="click8">按钮</div>
      <div class="btn" ref="btn9" @click="click9">按钮</div>
      <div class="btn" ref="btn10" @click="click10">按钮</div>
      <div class="btn" ref="btn11" @click="click11">按钮</div>
      <div class="btn" ref="btn13" @click="click13">absolute定位</div>
      <div class="btn" ref="btn16" @click="click16">popover</div>
      <div class="btn" ref="btn17" @click="click17">popover(absolute)</div>
      <div class="btn"></div>
    </wv-group>
  </div>
</template>

<script>
  import { once } from '../../src/utils/dom.js'
  import ByAnimation from '../../src/components/popup-by-animation'
  import DomRelative from '../../src/components/popup-dom-relative'

  export default {

    mounted () {
      
      this.bottomMenu = new this.$bottomMenu({
        items: [
          {
            name: '这里的popUp系列支持返回键',
            click: () => {console.log('btn0 clicked');}
          },{
            name: '分享二维码',
            click: () => {console.log('btn1 clicked');}
          },
          {
            name: '换个样式',
            click: () => {alert('不换~')}
          },
          {
            name: '保存到手机',
            click: () => {this.bottomMenu2.open()}
          },
          {
            name: '扫描二维码',
            click: () => {this.bottomMenu2.open()}
          }
        ],

        onOpen: function(){
          this.$refs.page.style.filter = 'blur(0.5px)';
          this.$refs.page.style.transition = 'all 300ms ease 0ms';
        }.bind(this),

        onClose: function(){
          this.$refs.page.style.filter = null;
          once(this.$refs.page, 'transitionend', function(){
            this.$refs.page.style.transition = null;
          }.bind(this))
        }.bind(this)
      })

      this.bottomMenu2 = new this.$bottomMenu({
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

      this.centerMenu = new this.$centerMenu({
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

      this.centerMenu2 = new this.$centerMenu({
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

      this.pressMenu = new this.$pressMenu({
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

      this.pressMenu2 = new this.$pressMenu({
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

      this.byAnimation = new ByAnimation({
        items: [
          {
            name: '分享二维码',
            click: () => {console.log('btn0 clicked');}
          },
          {
            name: '换个样式',
            click: (e) => {this.byAnimation2.open(e)}
          },
          {
            name: '保存到手机',
            click: (e) => {this.byAnimation2.open(e)}
          },
          {
            name: '扫描二维码',
            click: (e) => {this.byAnimation2.open(e)}
          }
        ]
      })

      this.byAnimation2 = new ByAnimation({
        items: [
          {
            name: '样式一',
            click: () => {
              console.log('btn2 clicked');
              this.byAnimation2.close();
            }
          },
          {
            name: '样式二',
            click: () => {
              console.log('btn3 clicked');
              this.byAnimation2.close();
            }
          }
        ]
      })

      this.pressMenu_topLeft_belowAfter = new DomRelative({
        refDom: this.$refs.btn8,
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

      this.pressMenu_topRight_belowAfter = new DomRelative({
        refDom: this.$refs.btn9,
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

      this.pressMenu_bottomRight_aboveAfter = new DomRelative({
        refDom: this.$refs.btn10,
        refCorner: 'bottom right',
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

      this.pressMenu_centerRight_aboveAfter = new DomRelative({
        refDom: this.$refs.btn11,
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

      this.popupOver = new this.$popupOver({
        refDom: this.$refs.btn16,
        refCorner: 'center right',
        relativeToCorner: 'above after',
        items: [
          {
            name: '扫描',
            click: e => {console.log('btn0 clicked');},
            src: 'https://gw.alipayobjects.com/zos/rmsportal/tOtXhkIWzwotgGSeptou.svg'
          },{
            name: '二维码',
            click: e => {this.popupOver.close(e)},
            src: 'https://gw.alipayobjects.com/zos/rmsportal/PKAgAqZWJVNwKsAJSmXd.svg'
          },{
            name: '帮助',
            click: e => {this.popupOver.close(e)},
            src: 'https://gw.alipayobjects.com/zos/rmsportal/uQIYTFeRrjPELImDRrPt.svg'
          }
        ]
      })
    },

    methods: {
      click (e) {
        this.bottomMenu.open(e)
      },

      click2 (e) {
        this.bottomMenu.open(e, {
          animation: {
            in: ['animated', 'bounceIn'],
            out: ['animated', 'bounceOut']
          }
        })
      },

      click3 (e) {
        this.bottomMenu.open(e, {
          animation: {
            in: ['animated', 'bounceInUp'],
            out: ['animated', 'bounceOutDown']
          }
        })
      },

      click4 (e) {
        this.bottomMenu.open(e, {
          animation: {
            in: ['animated', 'flipInX'],
            out: ['animated', 'flipOutX']
          }
        })
      },

      click5 (e) {
        this.centerMenu.open(e)
      },

      click15 (e) {
        this.centerMenu.open(e,{
          positionType: 'absolute',
          position: 'center'
        })
      },

      click6 (e) {
        this.pressMenu.open(e)
      },

      click7 (e) {
        this.byAnimation.open(e)
      },

      click8 (e) {
        this.pressMenu_topLeft_belowAfter.open(e)
      },
      click9 (e) {
        this.pressMenu_topRight_belowAfter.open(e)
      },
      click10 (e) {
        this.pressMenu_bottomRight_aboveAfter.open(e)
      },
      click11 (e) {
        this.pressMenu_centerRight_aboveAfter.open(e)
      },
      click12 (e) {
        this.bottomMenu.open(e, {
          animation: {
            in: ['animated', 'jackInTheBox'],
            out: ['animated', 'hinge']
          }
        })
      },
      click13 (e) {
        this.pressMenu_centerRight_aboveAfter.open(e, {
          positionType: 'absolute'
        })
      },

      click16 (e){
        this.popupOver.open(e, {

        })
      },

      click17 (e){
        this.popupOver.open(e, {
          refDom: this.$refs.btn17,
          positionType: 'absolute'
        })
      }
    }
  }
</script>

<style scoped>
  img {
    position: fixed;
    z-index: 1000000000000000000000000000;
    top: 50%;
    left: 50%;
    width: 100px;
    margin: -50px 0 0 -50px;
    /* 用于测试z-index的绝对覆盖 */
  }

  span{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .btn {
    width: 180px;
    height: 38px;
    background: #009688;
    color: #fff;
    border-radius: 3px;
    font-size: 17px;
    margin: 30px auto 0 auto;
    text-align: center;
    line-height: 38px;
  }
  .btn:last-child {
    margin-bottom: 100px;
  }
</style>

