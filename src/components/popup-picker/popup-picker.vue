<template>
  <div class="weui-picker">
    <div class="weui-picker__hd">
      <a class="weui-picker__action noExpand" @click="_cancel" v-text="cancelText"></a>
      <a class="weui-picker__action"></a>
      <a class="weui-picker__action noExpand" @click="_confirm" v-text="confirmText"></a>
    </div>
    <wv-picker-view 
      :slots="slots" 
      :onChange="onChange"
      :defaultValues="defaultValues"
      :valueKey="valueKey"
      :showItemNum="showItemNum"
      :showItemHeight="showItemHeight"
      ref="picker"
    ></wv-picker-view>
  </div>
</template>

<script>

  const fixZero = function (val){
    if(val < 10) val = '0'+val
    return val
  }

  export default {
    name: 'wv-picker',

    props: {
      slots: Array,
      showItemNum: Number,
      showItemHeight: Number,
      defaultValues: Array,
      valueKey: String,
      onChange: Function,

      confirmText: {
        type: String,
        default: '确定'
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      onConfirm: Function,
      onCancel: Function,
    },

    created () {
      this.event = {
        beforeEnter: () => {
          var $el = this.$el;

          $el.classList.add('inital');
          requestAnimationFrame(function(){
            setTimeout(()=>{//给50ms来处理dom的一些设置
              $el.classList.remove('inital');
              $el.classList.add('inAnimation');

              this.onOpen instanceof Function && this.onOpen();
            }, 50)
          }.bind(this))
        },
        beforeLeave: () => {
          var $el = this.$el;
          $el.classList.add('outAnimation');
          requestAnimationFrame(function(){
            $el.classList.remove('inAnimation');

            this.onClose instanceof Function && this.onClose();
          }.bind(this))
        }
      }
    },

    methods: {
      _cancel (e){
        this.onCancel instanceof Function && this.onCancel(this.$refs.picker)
        this._controller.close()
      },

      _confirm (e){
        this.onConfirm instanceof Function && this.onConfirm(this.$refs.picker)
        this._controller.close()
      }
    }
  }
</script>

<style scoped lang="scss">
  .weui-picker{
    will-change: opacity, transform;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: auto;
    transition: all 250ms ease 0s;

    &.inital {
      opacity: 0.3;
      transform: translateY(100%) translateZ(0);
    }

    &.inAnimation {
      opacity: 1;
      transform: translateY(0%) translateZ(0);
    }

    &.outAnimation {
      opacity: 0;
      transform: translateY(100%) translateZ(0);
      transition-duration: 280ms;
    }
  }

  .weui-picker__action.noExpand{
    flex: 0 0 auto;
    padding: 0 5px;
    transition: all 40ms linear 0ms;

    &:active {
      background: #ececec;
    }
  }
</style>
