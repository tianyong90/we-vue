<template>
  <div class="weui-dialog" :class="{ 'weui-skin_android': skin === 'android' }">
    <div class="weui-dialog__hd" v-if="title"><strong class="weui-dialog__title" v-html="title"></strong></div>
    <div class="weui-dialog__bd" v-html="message"></div>
    <div class="weui-dialog__ft">
      <a class="weui-dialog__btn weui-dialog__btn_default" v-if="showCancelBtn"
          @click="cancelClick" v-text="cancelText"></a>
      <a class="weui-dialog__btn weui-dialog__btn_primary" v-if="showConfirmBtn"
          @click="confirmClick" v-text="confirmText"></a>
    </div>
  </div>
</template>

<script>
  const CONFIRM_TEXT = '确定'
  const CANCEL_TEXT = '取消'

  export default {
    name: 'wv-popup-dialog',

    props: {
      e: {
        default: null
      },
      onCancel: Function,
      onComfrim: Function,

      //原本
      skin: {
        type: String,
        default: 'ios'
      },
      title: String,
      message: String,
      confirmText: {
        type: String,
        default: CONFIRM_TEXT
      },
      cancelText: {
        type: String,
        default: CANCEL_TEXT
      },
      showConfirmBtn: {
        type: Boolean,
        default: true
      },
      showCancelBtn: {
        type: Boolean,
        default: true
      }
    },

    created () {
      this.event = {
        beforeEnter: () => {
          var $el = this.$el;

          $el.classList.add('inital');
          requestAnimationFrame(function(){
            $el.classList.remove('inital');
            $el.classList.add('inAnimation');
          })
        },
        afterEnter: () => {},
        beforeLeave: () => {
          var $el = this.$el;
          $el.classList.add('outAnimation');
          requestAnimationFrame(function(){
            $el.classList.remove('inAnimation');
          })
        },
        afterLeave: () => {},
      }
    },

    methods: {

      close (){
        this._controller.close();
      },

      confirmClick () {
        if(typeof this.onComfrim === 'function')
          this.onComfrim()
        this.close()
      },

      cancelClick () {
        if(typeof this.onCancel === 'function')
          this.onCancel()
        this.close()
      }

    }
  }
</script>

<style scoped lang="scss">
  .weui-dialog {
    will-change: opacity, transform;
    display: inline-block;
    background: white;
    border-radius: 3px;
    font-size: 15px;
    transition: all 200ms ease 0s;
    //清除原本的定位方式...唉
    position: static;
    z-index: unset;
    top: unset;
    left: unset;

    &.inital {
      opacity: 0;
      transform: scale(0.9) translateZ(0);
    }

    &.inAnimation {
      opacity: 1;
      transform: scale(1) translateZ(0);
    }

    &.outAnimation {
      opacity: 0;
      transform: scale(0.9) translateZ(0);
      transition-duration: 300ms;
    }
  }

</style>
<style lang="scss">
  //这里编写用class可以应用到mask上面的,不过命名尽量不要污染太多

</style>

