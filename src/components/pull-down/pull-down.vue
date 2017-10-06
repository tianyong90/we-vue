<template>
  <div class="wv-pull-down-warpper" ref="wrapper" v-swipe:vertical="swipeConfig">
    <div class="wv-pull-down-panel" ref="panel">
      <div class="wv-pull-down-panel-icons" ref="icons">
        <div class="loading-circle-icon" ref="circle"></div>
        <div class="arrows-icon" ref="arrow"></div>
        <div class="done-icon" ref="done"></div>
        <div class="error-icon" ref="error"></div>
      </div>
      <div class="wv-pull-down-panel-message" ref="message"></div>
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
     * 4 加载失败
     */

    /** 事件
     * onLoad 用户一定交互之后会触发加载更多
     */

    data (){
      return {
        status: 0,
        startY: null,
        messages: [
          '下拉刷新',
          '松开刷新',
          '正在刷新',
          '刷新成功',
          '加载失败',
          '没有更多'
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
        var $wrapper = this.$refs.wrapper;
        
        if(
          $wrapper.scrollTop !== 0 || 
          info.directionFour !== 'down'
        ){
          this.status = 0;
          return;
        };

        if(this.status === 3) return ;

        var $panel = this.$refs.panel,
          $content = this.$refs.content,
          offset;

        if(this.status === 0){
          this.startY = info.movingY;
          this.status = 1;
        }else {
          offset = parseInt((info.movingY - this.startY) / 2);
          $panel.style.transform = `translateY(${offset}px)`;
          $content.style.transform = `translateY(${offset}px)`;

          if(offset > 110 && this.status === 1)
            this.status = 2;

          if(offset < 110 && this.status === 2)
            this.status = 1;
        }
      },

      _onSwipeDone (){
        var $panel = this.$refs.panel,
          $content = this.$refs.content;

        requestAnimationFrame(()=>{
          $panel.style.transitionDuration = null;
          $content.style.transitionDuration = null;

          if(this.status === 1)
            this.status = 0;
          else if(this.status === 2)
            this.status = 3;
        });
      },

      _success(){
        this._message(3);
        setTimeout(() => this.status = 0, 720);
      },

       _error(){
        this._message(4);
        setTimeout(() => this.status = 0, 720);
      },

      _noMore(){
        this._message(5);
        setTimeout(() => this.status = 0, 720);
      },

      _message(which){
        var $message = this.$refs.message,
          $panel = this.$refs.panel,
          $active = this.$refs.icons.getElementsByClassName('active')[0];

        $message.innerText = this.messages[which];
        $active && $active.classList.remove('active');

        if(which === 2)
          this.$refs.circle.classList.add('active');
        else if(which === 0 || which === 1){
          this.$refs.arrow.classList.add('active');

          if(which === 1){
            this.$refs.arrow.classList.add('reverse');
          }else
            this.$refs.arrow.classList.remove('reverse');
        }else{
          ( which === 3 || which === 5) && 
            this.$refs.done.classList.add('active');
          which === 4 && 
            this.$refs.error.classList.add('active');

          requestAnimationFrame(()=>{
            $panel.style.opacity = 0;
            $panel.style.transitionDuration = '0s';
            requestAnimationFrame(()=>{
              $panel.style.opacity = 1;
              $panel.style.transitionDuration = null;
            })
          });
        }
      }

    },

    watch: {
      status (val) {
        var $panel = this.$refs.panel,
          $content = this.$refs.content;

        switch(val){
          case 0:
            $panel.style.transform = null;
            $content.style.transform = null;
            $panel.style.visibility = null;
            $panel.style.willChange = null;
            $content.style.willChange = null;
          break;
          case 1:
            $panel.style.willChange = 'transform, opacity';
            $content.style.willChange = 'transform, opacity';
            $panel.style.transitionDuration = '0ms';
            $content.style.transitionDuration = '0ms';
            $panel.style.visibility = 'visible';
            this._message(0);
          break;
          case 2:
            this._message(1);
          break;
          case 3:
            this._message(2);

            $panel.style.transform = `translateY(50.4px)`;
            $content.style.transform = `translateY(50.4px)`;

            this.$emit('onLoad', this._success, this._error, this._noMore);
          break;
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
    z-index: 0;
    position: relative;
  }

  .wv-pull-down-content{
    transition: all 250ms ease 0ms;
    z-index: 0;
    position: relative;
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
    z-index: 1;
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

  .error-icon {
    display: inline-block;
    font-size: 2em;
    vertical-align: middle;
    position: relative;
    transition: transform .3s ease;
    height: calc(100% - 2px);
    width: calc(100% - 2px);
    border: 1px solid;
    border-radius: 100%;
    margin-left: -13px;

    &:before,
    &:after {
      content: '';
      position: absolute;
      font-size: .5em;
      width: 12.5px;
      top: 50%;
      left: 23%;
      border-top: 1px solid;
    }

    &:before {
      transform: rotate(45deg);
    }

    &:after {
      transform: rotate(-45deg);
    }
  }

  @keyframes circle {
    0%{transform: rotate(0deg);}
    100%{transform: rotate(1080deg);}
  }
</style>
