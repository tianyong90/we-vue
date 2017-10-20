<template>
  <div class="wv-popUp-dialog">
    <div class="dialog-content">
      <p>保存本次编辑?</p>
    </div>
    <div class="controll-bar">
      <div class="btn-cancel controll-item" @click="cancelClick">不保存</div>
      <div class="btn-confirm controll-ttem" @click="confirmClick">保存</div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'wv-popup-dialog',

    props: {
      config: {
        type: Object,
        default: null
      },
      e: {
        default: null
      }
    },

    created () {
      this.event = {
        beforeEnter: () => {
          var $el = this.$el;

          console.log('slot before enter');
          //先手动更新样式
          $el.classList.add('inital');
          requestAnimationFrame(function(){
            $el.classList.remove('inital');
            $el.classList.add('inAnimation');
          })
        },
        afterEnter: () => {
          console.log('afterEntered')
        },
        beforeLeave: () => {
          var $el = this.$el;
          $el.classList.add('outAnimation');
          requestAnimationFrame(function(){
            $el.classList.remove('inAnimation');
          })
        },
        afterLeave: () => {
          console.log('afterLeaved')
        },
      }
    },

    data () {
      return {
        cancelText: '取消',
        confirmText: '确认'
      }
    },

    mounted () {
      var config = this.config ,
        e = this.e;

      this.items = config.items
      this.animationClassName = config.animation
      this.onCancel = config.onCancel
      this.onComfrim = config.onComfrim

      config.confirmText != undefined && 
      typeof config.confirmText === 'string' &&
        (this.confirmText = config.confirmText)

      config.cancelText != undefined && 
      typeof config.cancelText === 'string' &&
        (this.cancelText = config.cancelText)

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
  .wv-popUp-dialog {
    will-change: opacity, transform;
    flex: 0 0 auto;
    width: 244.5px;
    padding: 22px 22px 14.5px 22px;
    background: white;
    border-radius: 3px;
    font-size: 15px;
    transition: all 270ms ease 0s;

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

  .wv-popup-bottom-menu-li {
    background: white;
    padding: 0 21px;
    font-size: 16px;
    width: calc(100vw - 21px*2);
    color: #5e5e5e;
    min-height: 42px;
    display: inline-flex;
    align-items: center;
  }

  .dialog-content{
    margin-bottom: 15px;
    margin-top: calc(43px/3);
    display: flex;
    align-items: center;
  }

  .controll-bar{
    position: relative;
    left:7px;
    height: 27px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .controll-item{
    flex:0 0 57.5px;
    width: 57.5px;
    text-align: center;
  }

  .btn-cancel{
    color: #7F7F7F;
  }

  .btn-confirm{
    color: #14AB20;
  }
</style>
<style lang="scss">
  //这里编写用class可以应用到mask上面的,不过命名尽量不要污染太多

</style>

