<template>
  <div class="wv-pull-down_warpper" ref="wrapper" v-swipe:vertical="swipeConfig">
    <div class="wv-pull-down_panel" ref="panel">
      sdfsd
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
      this.status = 0;
      /**
       * 0 滚动状态
       * 1 未达到阈值
       * 2 达到阈值
       */
      this.startY = null;

      this.swipeConfig = {
        onSwipe: this._onSwipe,
        onSwipeDone: this._onSwipeDone
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
        
        if($wrapper.scrollTop !== 0 || info.directionFour === 'down') return

        var $content = this.$refs.content,
          $panel = this.$refs.panel,
          offset;
        
        switch (this.status){
          case 0: 
            //初始化
            this.status++;
            $content.style.willChange = 'transfrom, opacity';
            $panel.style.willChange = 'transfrom, opacity';
            $panel.style.transitionDuration = '0ms';
            $content.style.transitionDuration = '0ms';
            $panel.style.visibility = 'visible';
            
            this.startY = info.movingY;
          break;
          case 1: 
            //未达到阈值
            offset = (info.movingY - this.startY)/1.4;

            if(offset > 50) {
              this.status++;
            };
            requestAnimationFrame(() => {
              $panel.style.transform = `translateY(${offset}px)`;
              $content.style.transform = `translateY(${offset}px)`;
            });
          break;
          case 2: 
            //达到阈值
            offset = (info.movingY - this.startY)/1.4;
            requestAnimationFrame(() => {
              $panel.style.transform = `translateY(${offset}px)`;
              $content.style.transform = `translateY(${offset}px)`;
            });
          break;
        }
        
      },

      _onSwipeDone (){
        var $content = this.$refs.content,
          $panel = this.$refs.panel;

        this.status = 0;
        requestAnimationFrame(() => {
          $panel.style.transform = null;
          $content.style.transform = null;
          $panel.style.transitionDuration = null;
          $content.style.transitionDuration = null;
        });
      },

      _initForAnimation ($dom){
        $dom.style.willChange = 'transfrom, opacity';
      },

      _backToStatic ($dom){
        $dom.style.willChange = null;
      },
    },

    directives: {
      swipe: swipeDirective
    }
  }
</script>

<style scoped lang="scss">
  .wv-pull-down_warpper {
    overflow: auto;

  }

  .wv-pull-down_content{
    transition: all 250ms ease 0ms;
  }

  .wv-pull-down_panel{
    position: absolute;
    visibility: hidden;
    height: 50px;
    width: 100%;
    transition: all 250ms ease 0ms;
  }
</style>
