<template>
  <div class="wv-pull-down-warpper" ref="wrapper" v-swipe:vertical="swipeConfig">
    <div class="wv-pull-down-panel" ref="panel">
      <div class="wv-pull-down-panel-message">下拉刷新</div>
      <div class="wv-pull-down-panel-message">松开刷新</div>
      <div class="wv-pull-down-panel-message">正在刷新</div>
      <div class="wv-pull-down-panel-message">刷新成功</div>
    </div>
    <div class="wv-pull-down_content" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { swipeDirective } from '../../custom/event/swipe.js'

  export default {
    name: 'wv-pull-down',

    created (){
      this.swipeConfig = {
        onSwipe: this._onSwipe,
        onSwipeDone: this._onSwipeDone
      }
    },

    /** status
     * 0 滚动状态
     * 1 未达到阈值
     * 2 达到阈值
     * 3 正在加载
     */

    data (){
      return {
        status: 0,
        startY: null
      }
    },

    props: {
      
    },

    mounted () {
      this.$refs.panel.style.marginTop = -this.$refs.panel.clientHeight + 'px';
    },

    methods: {
      _onSwipe (info){
        var $wrapper = this.$refs.wrapper;
debugger
        if($wrapper.scrollTop === 0 || info.directionFour === 'up') return;

        var $panel = this.$refs.panel,
          $content = this.$refs.content,
          status = this.status,
          offset;

        if(status === 0){
          this.status = 1;
          $panel.style.willChange = 'transform, opacity';
          $content.style.willChange = 'transform, opacity';
          $panel.style.transitionDuration = '0ms';
          $content.style.transitionDuration = '0ms';
          this.startY = info.movingY;
          this._message(0);
        }else {
          offset = (info.movingY - this.startY) / 2;
          $panel.style.transform = `translateY(${offset}px)`;
          $content.style.transform = `translateY(${offset}px)`;

          if(offset > 50) {
            this.status = 2;
            this._message(1);
          };
        }
      },

      _onSwipeDone (){
        var $panel = this.$refs.panel,
          $content = this.$refs.content,
          status = this.status;

        $panel.style.transitionDuration = '';
        $content.style.transitionDuration = '';

        if(status === 1){
          //回到默认
          this._backToStatic();
        }else if(status === 2){
          //开始加载
          this._startLoad();

          setTimeout(() => {
            
            this._endLoad();
          },2000);
        }
      },

      _backToStatic (){
        var $panel = this.$refs.panel,
          $content = this.$refs.content;

        this.status = 0;
        $panel.style.transform = null;
        $content.style.transform = null;
      },

      _startLoad(){
        var $panel = this.$refs.panel,
          $content = this.$refs.content;

        this.status = 3;
        this._message(2);

        $panel.style.transform = `translateY(50px)`;
        $content.style.transform = `translateY(50px)`;

        console.log('开始加载');
      },

      _endLoad(){
        console.log('加载完成');
        this._message(3);

        this._backToStatic();
      },
      
      _message(which){
        var $panel = this.$refs.panel,
          $messages = $panel.children,
          $active = $panel.getElementsByClassName('active');
        
        $active.classList.remove('active');
        $messages[which].classList.add('active');
      }

      
    },

    directives: {
      swipe: swipeDirective
    }
  }
</script>

<style scoped lang="scss">
  .wv-pull-down-warpper {
    overflow: auto;

  }

  .wv-pull-down-content{
    transition: all 250ms ease 0ms;
  }

  .wv-pull-down-panel{
    position: absolute;
    visibility: hidden;
    height: 50px;
    width: 100%;
    transition: all 250ms ease 0ms;
  }

  .wv-pull-down-panel-message {
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 0;
  }

  .wv-pull-down-panel-message.active {
    opacity: 1;
  }
</style>
