<template>
  <wv-swipeplus class="popup-swipe addWeight" overflow="backDrag" :gap="16" :continuous="loop" :defaultIndex="defaultIndex" ref="swiper">
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

    props: {
      e: {
        default: null
      },
      imgs: {
        type: [Array, HTMLCollection],
        required: true
      },
      loop: {
         type: Boolean,
         default: false
      }
    },

    created () {
      this.event = {
        beforeEnter: () => {
          var $onSwipeImg = this._getSwipeImg(this.defaultIndex);

          var { clipTop, clipLeft, clipBottom, clipRight, clipRadius, translateX, translateY, scale, hasClip} = this._getAnimationSettings(this.defaultIndex);

          this._controller.vm_popUp.setAnimateDom($onSwipeImg)
          this._initPosition();

          $onSwipeImg.style.transform = 
            `translate3d(${translateX}px, ${translateY}px,0) scale(${scale})`;
          
          if(hasClip)
          $onSwipeImg.style.clipPath = 
            `inset(${clipTop}px ${clipRight}px ${clipBottom}px ${clipLeft}px round ${clipRadius})`

          requestAnimationFrame(()=>{
            $onSwipeImg.style.transform = `translate3d(0,0,0) scale(1)`;
            if(hasClip)
            $onSwipeImg.style.clipPath = `inset(0px 0px 0px 0px round 0px)`;
          })
        },
        afterEnter: () => {},
        beforeLeave: () => {
          var index = this.$refs.swiper.index,
              $onSwipeImg = this._getSwipeImg(index);
          
          var { clipTop, clipLeft, clipBottom, clipRight, clipRadius, translateX, translateY, scale, hasClip} = this._getAnimationSettings(index);

          this._controller.vm_popUp.setAnimateDom($onSwipeImg)

          if(hasClip)
            $onSwipeImg.style.clipPath = `inset(0px 0px 0px 0px round 0px)`;
          
          requestAnimationFrame(()=>{
            $onSwipeImg.style.transform = 
            `translate3d(${translateX}px, ${translateY}px,0) scale(${scale})`;
            if(hasClip)
            $onSwipeImg.style.clipPath = 
              `inset(${clipTop}px ${clipRight}px ${clipBottom}px ${clipLeft}px round ${clipRadius})`;
          })
        },
        afterLeave: () => {},
      }
    },

    mounted (){
      var e = this.e,
          defaultIndex;

      this.originalImgs = this.imgs
      this.w_height = window.innerHeight
      this.w_width = window.innerWidth
      this.w_rotaio = this.w_width/this.w_height

      if(e.targetChangeTo)
        defaultIndex = Array.prototype.indexOf.call(this.originalImgs, e.targetChangeTo)
      else
        defaultIndex = Array.prototype.indexOf.call(this.originalImgs, e.target)

      if(defaultIndex === -1){
        console.log('popup-img-viewer open的时候指定的img不在所导入的列表当中,检查传递的是否正确~')
        defaultIndex = 0
      }
      this.defaultIndex = defaultIndex
    },

    methods: {
      _getAnimationSettings (index){
        var w_height = this.w_height,
          w_width = this.w_width,
          w_rotaio = this.w_rotaio,

          scale, translateX, translateY,
          triggeredImgCenterX, triggeredImgCenterY, 
          zoomedImgCenterX, zoomedImgCenterY,
          clipTop, clipRight, clipBottom, clipLeft, clipRadius,
          hasClip, clipRightVals,

          $img = this.originalImgs[index],
          i_ratio = $img.naturalWidth/$img.naturalHeight,
          imgRect = $img.getBoundingClientRect(),
          contianerRect = $img.parentElement.getBoundingClientRect(),
          containerStyle = getComputedStyle($img.parentElement);

        //生成开始位置
        scale = imgRect.width / w_width;
        zoomedImgCenterX = w_width/2;
        zoomedImgCenterY = (i_ratio > w_rotaio)? w_height/2 : w_width/i_ratio/2;
        triggeredImgCenterX = imgRect.left + imgRect.width/2;
        triggeredImgCenterY = imgRect.top + imgRect.height/2;

        //然后做动画偏移, 需要区分布局偏移
        translateX = triggeredImgCenterX - zoomedImgCenterX;
        translateY = triggeredImgCenterY - zoomedImgCenterY;
        
        //设置clip-path
        clipTop = contianerRect.top - imgRect.top;
        clipLeft = contianerRect.left - imgRect.left;
        clipBottom = imgRect.bottom - contianerRect.bottom;
        clipRight = imgRect.right - contianerRect.right;
        clipRadius = containerStyle.borderRadius

        clipTop = clipTop > 0 ? clipTop/scale : 0;
        clipLeft = clipLeft > 0 ? clipLeft/scale : 0;
        clipBottom = clipBottom > 0 ? clipBottom/scale : 0;
        clipRight = clipRight > 0 ? clipRight/scale : 0;

        //clipRadius放大麻烦一丢丢,仅仅px,先是最简单版本
        clipRightVals = clipRadius.split(' ');

        clipRightVals.forEach((val, i) => {
          //提取数值
          var num = parseFloat(val);
          var unit = val.replace(num.toString(),'');

          if(unit !== '%'){
            num /= scale;
            clipRightVals[i] = num+unit;
          }
        })
        clipRadius = clipRightVals.join(' ');

        hasClip = clipTop !== 0 || clipLeft !== 0 || 
                  clipBottom !== 0 || clipRight !== 0 || clipRadius !== '0px';

        return {
          clipTop: clipTop,
          clipLeft: clipLeft,
          clipBottom: clipBottom,
          clipRight: clipRight,
          clipRadius: clipRadius,
          translateX: translateX,
          translateY: translateY,
          scale: scale,
          hasClip: hasClip
        };
      },

      _getSwipeImg(index){
        return this.$refs.swiper.$refs.swipeItems.children[index].children[0];
      },

      _initPosition (){
        var i, i_ratio, i_height, i_width, $img, fromTop,
            w_height = this.w_height,
            w_width = this.w_width,
            w_rotaio = this.w_rotaio;

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
          $img = this._getSwipeImg(i)
          $img.style.top = fromTop + 'px';
          $img.style.clipPath = `inset(0px 0px 0px 0px 0px)`;
        }
        $img = null;
      }
    }

  }
</script>

<style scoped lang="scss">
  .popup-swipe.addWeight{
    height: 100vh;
    width: 100vw;
  }

  .swipe-img{
    width: 100vw;
    position: absolute;
    transition: all 270ms ease;
    will-change: transform, opacity;
  }
</style>
