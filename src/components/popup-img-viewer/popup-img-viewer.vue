<template>
  <wv-swipeplus class="popup-swipe" overflow="backDrag" :defaultIndex="defaultIndex" ref="swiper">
      <wv-swipe-item v-for="(img, $index) in originalImgs" :key="$index">
        <img class="swipe-img" :src="img.src" alt="">
      </wv-swipe-item>
    </wv-swipeplus>
</template>

<script>

  export default {
    name: 'wv-popup-img-viewer',

    data (){
      return {
        defaultIndex: 0,
        originalImgs: []
      }
    },

    created () {
      this.event = {
        beforeEnter: () => {
          var $onSwipeImg = this.getSwipeImg(this.defaultIndex);

          var { clipTop, clipLeft, clipBottom, clipRight, translateX, translateY, scale } = this.getAnimationSettings(this.defaultIndex);

          this.initPosition();
          
          $onSwipeImg.style.transform = 
            `translate3d(${translateX}px, ${translateY}px,0) scale(${scale})`;
          $onSwipeImg.style.clipPath = 
            `inset(${clipTop}px ${clipRight}px ${clipBottom}px ${clipLeft}px)`;

          //开始动画,这里为什么会延迟的,开始有部分动画看不到了
          this.$nextTick(()=>{
            requestAnimationFrame(() => {
              // this.$controller.popUp.maskOpacity(1);
              $onSwipeImg.style.transform = `translate3d(0,0,0) scale(1)`;
              $onSwipeImg.style.clipPath = `inset(0px 0px 0px 0px)`;
            })
          });
        },
        // afterEnter: () => {},
        beforeLeave: () => {
          var index = this.$refs.swiper.index,
              $onSwipeImg = this.getSwipeImg(index);
          
          var { clipTop, clipLeft, clipBottom, clipRight, translateX, translateY, scale} = this.getAnimationSettings(index);

          //集中设置属性
          $onSwipeImg.style.transform = 
            `translate3d(${translateX}px, ${translateY}px,0) scale(${scale})`;
          $onSwipeImg.style.clipPath = 
            `inset(${clipTop}px ${clipRight}px ${clipBottom}px ${clipLeft}px)`;
        },
        // afterLeave: () => {},
      }
    },

    methods: {
      init (config, e) {
        this.originalImgs = config.imgs
        this.defaultIndex = Array.prototype.indexOf.call(this.originalImgs, e.target)
      },

      getAnimationSettings (index){
        var w_height = window.innerHeight,
          w_width = window.innerWidth,

          scale, translateX, translateY,
          triggeredImgCenterX, triggeredImgCenterY, 
          zoomedImgCenterX, zoomedImgCenterY,
          clipTop, clipRight, clipBottom, clipLeft,

          $img = this.originalImgs[index],
          imgRect = $img.getBoundingClientRect(),
          contianerRect = $img.parentElement.getBoundingClientRect();

        //生成开始位置
        scale = imgRect.width / w_width;
        zoomedImgCenterX = w_width/2;
        zoomedImgCenterY = w_height/2;
        triggeredImgCenterX = imgRect.left + imgRect.width/2;
        triggeredImgCenterY = imgRect.top + imgRect.height/2;

        //然后做动画偏移(需要区分布局偏移
        translateX = triggeredImgCenterX - zoomedImgCenterX;
        translateY = triggeredImgCenterY - zoomedImgCenterY;
        
        //设置clip-path
        clipTop = contianerRect.top - imgRect.top;
        clipLeft = contianerRect.left - imgRect.left;
        clipBottom = imgRect.bottom - contianerRect.bottom;
        clipRight = imgRect.right - contianerRect.right;

        clipTop = clipTop > 0 ? clipTop/scale : 0;
        clipLeft = clipLeft > 0 ? clipLeft/scale : 0;
        clipBottom = clipBottom > 0 ? clipBottom/scale : 0;
        clipRight = clipRight > 0 ? clipRight/scale : 0;

        return {
          clipTop: clipTop,
          clipLeft: clipLeft,
          clipBottom: clipBottom,
          clipRight: clipRight,
          translateX: translateX,
          translateY: translateY,
          scale: scale
        };
      },

      getSwipeImg(index){
        return this.$refs.swiper.$refs.swipeItems.children[index].children[0];
      },

      initPosition (){
        var i, i_ratio, i_height, i_width, $img, fromTop,
            w_height = window.innerHeight,
            w_width = window.innerWidth,
            w_rotaio = w_width/w_height;

        for(i = 0; i < this.originalImgs.length; i++){
          $img = this.originalImgs[i];
          i_height = $img.naturalHeight;
          i_width = $img.naturalWidth;
          i_ratio = i_width/i_height;

          //生成结束位置
          if(i_ratio > w_rotaio){
            //设置垂直居中
            fromTop = (w_height - (w_width/i_width)*i_height)/2;
          }else
            fromTop = 0;
          //else 设置自然布局
          //设置的是swiper里面的图片
          $img = this.getSwipeImg(i)
          $img.style.top = fromTop + 'px';
          $img.style.clipPath = `inset(0px 0px 0px 0px)`;
        }
        $img = null;
      }
    }

  }
</script>

<style scoped lang="scss">
  .popup-swipe{
    height: 100vh;
  }

  .swipe-img{
    width: 100vw;
    position: absolute;
    transition: all 300ms ease;
    will-change: transform, opacity;
    z-index: 0;
  }
</style>
