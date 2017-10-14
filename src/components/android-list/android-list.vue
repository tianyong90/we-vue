<template>
  <div class="wv-addroid-list-warpper">
    <div class="wv-android-list-content" ref="$content" v-swipe:any="this">
      <slot></slot>
    </div>
    <div class="wv-android-list-overflow-top" ref="$top"></div>
    <div class="wv-android-list-overflow-right" ref="$right"></div>
    <div class="wv-android-list-overflow-bottom" ref="$bottom"></div>
    <div class="wv-android-list-overflow-left" ref="$left"></div>
  </div>
</template>

<script>
  import { swipeDirective } from '../../custom/event/swipe.js'

  export default {
    name: 'wv-android-list',

    created (){
      this.triggerX = null;
      this.triggerY = null;
    },

    props: {
      
    },

    data () {
      return {
        
      }
    },

    mounted () {
      
    },

    methods: {
      onSwipe (info){
        let { $top, $right, $bottom, $left, $content } = this.$refs;
        let { movingX, movingY } = info;
        let { scrollHeight, scrollWidth, clientHeight, clientWidth, scrollTop, scrollLeft } = $content;
        let offset;

        this.triggerX === null && (this.triggerX = movingX);
        this.triggerY === null && (this.triggerY = movingY);

        let getOffset = (type) => {
          var offset, rest;

          if(type === 'Y')
            offset = Math.log2(Math.abs(movingY - this.triggerY)/(clientHeight/2) + 1);
          else if(type === 'X')
            offset = Math.log2(Math.abs(movingX - this.triggerX)/(clientWidth/2) + 1);
          
          if(offset > 1)
            offset = 1 + (offset - 1)/10;
          
          return  offset;
        };

        let trigger = ($edge, type) => {
          offset = getOffset(type);
          if(typeof $edge.lastOffset === 'number'){
            console.log(offset, $edge.lastOffset);
            if(offset > $edge.lastOffset){
              $edge.lastOffset = offset;
              $edge.style.transform = `scale${type}(${offset})`;
              $edge.style.opacity = offset/2;
              $edge.style.transitionDuration = '0s';
            }else
              $edge.lastOffset = 'toBeClear';
          }else if($edge.lastOffset === 'toBeClear'){
              this._reset($edge, false);
              $edge.lastOffset = false
            }
        }

        // 判断那边溢出了
        // 判断可以滚动的轴
        // 判断上下越界

        if(scrollHeight > clientHeight){
          if(scrollTop === 0){
            trigger($top,'Y');
          }else if(Math.ceil(scrollTop) === scrollHeight - clientHeight ){
            trigger($bottom,'Y');
          }else{
            this._reset($top, true);
            this._reset($bottom, true);
          }
        }
        
        if(scrollWidth > clientWidth){
          if(scrollLeft === 0){
            trigger($left,'X');
          }else if(Math.ceil(scrollLeft) === scrollWidth - clientWidth ){
            trigger($right,'X');
          }else{
            this._reset($right, true);
            this._reset($left, true);
          }
        }
      },

      onSwipeDone (){
        this.triggerX = null;
        this.triggerY = null;
        
        let { $top, $right, $bottom, $left } = this.$refs;
        this._reset($top, true);
        this._reset($right, true);
        this._reset($bottom, true);
        this._reset($left, true);
      },

      _reset ($edge, final) {
        $edge.style.opacity = null;
        $edge.style.transitionDuration = null;
        $edge.style.transform = null;
        final && ($edge.lastOffset = -0.01)
      }
    },

    directives: {
      swipe: swipeDirective
    }
  }
</script>

<style scoped lang="scss">
  .wv-addroid-list-warpper {
    position: relative;
    overflow: hidden;
  }

  .wv-android-list-content{
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .wv-android-list-overflow-top,
  .wv-android-list-overflow-right,
  .wv-android-list-overflow-bottom,
  .wv-android-list-overflow-left
  {
    position: absolute;
    padding: 60px;
    background-color: grey;
    opacity: 0;
    will-change: transform, opacity;
    border-radius: 100%;
    transition: all 0.8s ease;
  }

  .wv-android-list-overflow-top{
    left: -60px;
    top: -60px;
    width: 100%;
    height: 0px;
    transform: scaleY(0);
  }
  .wv-android-list-overflow-right{
    top: -60px;
    right: -60px;
    height: 100%;
    width: 0px;
    transform: scaleX(0);
  }
  .wv-android-list-overflow-bottom{
    left: -60px;
    bottom: -60px;
    width: 100%;
    height: 0px;
    transform: scaleY(0);
  }
  .wv-android-list-overflow-left{
    left: -60px;
    top: -60px;
    width: 0px;
    height: 100%;
    transform: scaleX(0);
  }
</style>
