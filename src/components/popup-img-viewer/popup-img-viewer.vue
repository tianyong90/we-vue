<template>
  <wv-swipeplus class="demo-swipe" :auto="0" :continuous="false" overflow="backDrag" ref="swiper">
      <wv-swipe-item v-for="(img, $index) in imgs" :key="$index">
        <img src="img.src" alt="">
      </wv-swipe-item>
    </wv-swipeplus>
</template>

<script>

  export default {
    name: 'wv-popup-img-viewer',

    created () {
      this.event = {
        // beforeEnter: () => {},
        // afterEnter: () => {},
        // beforeLeave: () => {},
        // afterLeave: () => {},
      }
    },

    methods: {
      init (config, e) {
        this.imgs = config.imgs
        
        var $originalImg = e.target,
            i_height = $originalImg.naturalHeight,
            i_width = $originalImg.naturalWidth,
            i_ratio = i_width/i_height,

            w_height = window.innerHeight,
            w_width = window.innerWidth,
            w_rotaio = w_width/w_height,

            rect = $originalImg.getBoundingClientRect();

        this.event.beforeEnter = () => {
          //生成结束位置
          if(d_ratio > w_rotaio){

          }else{

          }

          //生成开始位置

          //开始动画
        }
      },


    }
  }
</script>

<style scoped lang="scss">
  .wv-popup-press-menu {
    will-change: opacity, transform;
    box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.15);
    transition: all 350ms ease 0s;
    flex: 0 0 auto;

    &.inital {
      opacity: 0;
      transform: scale(0.8) translateZ(0);
    }

    &.inAnimation {
      opacity: 1;
      transform: scale(1) translateZ(0);
    }

    &.outAnimation {
      opacity: 0;
      transform: scale(0.75) translateZ(0);
      transition-duration: 400ms;
    }
  }

  .wv-popup-press-menu-li {
    height: 43px;
    line-height: 43px;
    padding: 0 30px 0 15px;
    font-size: 14px;
    display: block;
    background: white;
    min-width: calc(90px - 45px);
  }

  .wv-popup-press-menu-li:active {
    background: #E8E8E8;
    transition: all 80ms linear 0ms;
  }
</style>
