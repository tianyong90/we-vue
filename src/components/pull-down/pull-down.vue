<template>
  <div class="wv-pull-down-warpper" ref="wrapper" v-swipe:vertical="swipeConfig">
    <div class="wv-pull-down-panel" ref="panel">
      <div class="wv-pull-down-panel-icons" ref="icons">
        <div class="loading-circle-icon" ref="circle"></div>
        <div class="arrows-icon" ref="arrow"></div>
        <div class="done-icon" ref="done"></div>
      </div>
      <div class="wv-pull-down-panel-message" ref="message">下拉刷新</div>
    </div>
    <div class="wv-pull-down-content" ref="content">
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
        startY: null,
        messages: [
          '下拉刷新',
          '松开刷新',
          '正在刷新',
          '刷新成功'
        ]
      }
    },

    props: {
      
    },

    mounted () {
      this.$refs.panel.style.marginTop = -this.$refs.panel.clientHeight + 'px';
    },

    methods: {
      _onSwipe (info){
        var $wrapper = this.$refs.wrapper,
          status = this.status;
        
        if(
          $wrapper.scrollTop !== 0 || 
          info.directionFour !== 'down' ||
          status === 3
        ) return;

        var $panel = this.$refs.panel,
          $content = this.$refs.content,
          offset;

        if(status === 0){
          this.status = 1;
          $panel.style.willChange = 'transform, opacity';
          $content.style.willChange = 'transform, opacity';
          $panel.style.transitionDuration = '0ms';
          $content.style.transitionDuration = '0ms';
          $panel.style.visibility = 'visible';
          this.startY = info.movingY;
          this._message(0);
        }else {
          offset = parseInt((info.movingY - this.startY) / 2);
          $panel.style.transform = `translateY(${offset}px)`;
          $content.style.transform = `translateY(${offset}px)`;

          if(offset > 130 && this.status === 1) {
            this.status = 2;
            this._message(1);
          };

          if(offset < 130 && this.status === 2) {
            this.status = 1;
            this._message(0);
          };
        }
      },

      _onSwipeDone (){
        var $panel = this.$refs.panel,
          $content = this.$refs.content,
          status = this.status;

        requestAnimationFrame(()=>{
          $panel.style.transitionDuration = null;
          $content.style.transitionDuration = null;

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
        });
      },

      _backToStatic (){
        var $panel = this.$refs.panel,
          $content = this.$refs.content;

        this.status = 0;
        $panel.style.transform = null;
        $content.style.transform = null;
        $panel.style.visibility = null;
        $panel.style.willChange = null;
        $content.style.willChange = null;
      },

      _startLoad(){
        var $panel = this.$refs.panel,
          $content = this.$refs.content;

        this.status = 3;
        this._message(2);

        $panel.style.transform = `translateY(50.4px)`;
        $content.style.transform = `translateY(50.4px)`;

        console.log('开始加载');
      },

      _endLoad(){
        console.log('加载完成');
        this._message(3);

        setTimeout(this._backToStatic, 500);
      },
      
      _message(which){
        var $message = this.$refs.message,
          $panel = this.$refs.panel,
          $active = this.$refs.icons.getElementsByClassName('active')[0];

        $message.innerText = this.messages[which];
        $active && $active.classList.remove('active');

        if(which === 2)
          this.$refs.circle.classList.add('active');
        else if(which === 3){
          this.$refs.done.classList.add('active');
          $panel.style.opacity = 0;
          $panel.style.transitionDuration = '0s';
          requestAnimationFrame(()=>{
            requestAnimationFrame(()=>{
              $panel.style.opacity = 1;
              $panel.style.transitionDuration = null;
            })
          });
        }else{
          this.$refs.arrow.classList.add('active');

          if(which === 1){
            this.$refs.arrow.classList.add('reverse');
          }else
            this.$refs.arrow.classList.remove('reverse');
        }
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
    height: 50px;
    width: 100%;
    transition: all 250ms ease 0ms;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    color: #7676a1;
  }

  .wv-pull-down-panel-message {
    display: inline-block;
    margin-left: 10px;
  }

  .wv-pull-down-panel-icons{
    width: 24px;
    height: 24px;
    display: inline-block;
    position: relative;
    text-align: center;

    & > div{
      position: absolute;
      opacity: 0;
    }

    & > .active{
      opacity: 1;
    }
  }

  .loading-circle-icon{
    width: 20px;
    height: 20px;
    border-radius: 100%;
    border: 1px solid ;
    border-top-color: transparent;
    animation: circle 1s linear infinite;
  }

  .arrows-icon{
    transition: all 0.3s ease;

    &.reverse{
      transform: rotate(180deg);
    }
  }

  .done-icon{
    transition: opacity 0.3s ease;
    display: inline-block;
    box-sizing: content-box;
    vertical-align: middle;
    font-size: 20px;
    height: calc(100% - 2px);
    width: calc(100% - 2px);
    border: 1px solid;
    border-radius: 100%;
    position: relative;
    margin-left: -13px;

    &:before{
      content: '';
      position: absolute;
      top: 3px;
      left: 8px;
      height: 12px;
      width: 6.5px;
      border: solid;
      border-width: 0 1px 1px 0;
      transform: rotate(40deg);
    }
  }

  .arrows-icon {
    display: inline-block;
    font-size: 2em;
    vertical-align: middle;
    height: 100%;
    border-left: 1px solid;
    position: relative;
    transition: transform .3s ease;

    &:before,
    &:after {
      content: '';
      position: absolute;
      font-size: .5em;
      width: 12.5px;
      bottom: 0px;
      border-top: 1px solid;
    }

    &:before {
      right: 1px;
      transform: rotate(50deg);
      transform-origin: right;
    }

    &:after {
      left: 0px;
      transform: rotate(-50deg);
      transform-origin: left;
    }

  }

  @keyframes circle {
    0%{transform: rotate(0deg);}
    100%{transform: rotate(1080deg);}
  }
</style>
