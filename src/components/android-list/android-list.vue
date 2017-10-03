<template>
  <div class="wv-addroid-list-warpper">
    <div class="wv-android-list-content" ref="content" v-swipe:any="this">
      <slot></slot>
    </div>
    <div class="wv-android-list-overflow-top" ref="top"></div>
    <div class="wv-android-list-overflow-right" ref="right"></div>
    <div class="wv-android-list-overflow-bottom" ref="bottom"></div>
    <div class="wv-android-list-overflow-left" ref="left"></div>
  </div>
</template>

<script>
  import { swipeDirective } from '../../custom/event/swipe.js'

  export default {
    name: 'wv-android-list',

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
        let { top, right, bottom, left, content} = this.$refs;

        console.log(content.scrollHeight,content.scrollWidth, content.scrollTop, content.scrollLeft);

        console.log(info);
      },

      onSwipeDone (info){

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
    opacity: 0.3;
    will-change: transform, opacity;
    border-radius: 100%;
  }

  .wv-android-list-overflow-top{
    left: -60px;
    top: -60px;
    width: 100%;
    height: 0px;
    transform: scaleY(1);
  }
  .wv-android-list-overflow-right{
    top: -60px;
    right: -60px;
    height: 100%;
    width: 0px;
    transform: scaleX(1);
  }
  .wv-android-list-overflow-bottom{
    left: -60px;
    bottom: -60px;
    width: 100%;
    height: 0px;
    transform: scaleY(1);
  }
  .wv-android-list-overflow-left{
    left: -60px;
    top: -60px;
    width: 0px;
    height: 100%;
    transform: scaleX(1);
  }
</style>
