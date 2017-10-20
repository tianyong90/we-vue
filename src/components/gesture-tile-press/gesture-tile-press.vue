<template>
  <div class="gesture-tile-press-wrapper" @touchstart="_touchStart" @touchmove="_touchMove" @touchend="_touchEnd">
    <div class="gesture-tile-press-content" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'wv-gesture-tile-press',

    props: {
      maxDeg: {
        type: Number,
        default: 10
      },
      minDeg: {
        type: Number,
        default: 2
      },
    },

    methods: {
      _touchStart (e) {
        var rect = this.$el.getBoundingClientRect(),
          orthocenterX = rect.left + rect.width/2,
          orthocenterY = rect.top + rect.height/2,
          clickX = e.touches[0].clientX,
          clickY = e.touches[0].clientY,
          destance = this._getDestance(
            orthocenterX, orthocenterY, clickX, clickY),
          diagonal = this._getDestance(
            rect.right, rect.top, rect.left, rect.bottom),
          orientationX = (clickX - orthocenterX) > 0 ? 1 : -1,
          orientationY = (clickY - orthocenterY) > 0 ? -1 : 1;

        //然后就是一些流程化的workflow了
        //获取重心
        //计算click到重心的距离,方位
        //然后设置按压效果
        this._setPressEffect(orientationX, orientationY, destance, diagonal)
      },

      _touchMove (){
        //取消按压效果
        this._unsetPressEffect()
      },

      _touchEnd (){
        // 取消按压效果
        this._unsetPressEffect()
      },

      _getDestance(x0, y0, x1, y1){
        return Math.sqrt(
          (x0 - x1)**2 + (y0 - y1)**2
        )
      },

      _setPressEffect (orientationX, orientationY, destance, diagonal){
        var deg = this.maxDeg * (destance/(diagonal/2))

        deg = deg < this.minDeg ? this.minDeg : deg

        this.$refs.content.style.transform = 
          `rotateX(${orientationY * deg}deg) rotateY(${orientationX * deg}deg) translateZ(-3px)`
      },

      _unsetPressEffect (){
        setTimeout(()=>{
          this.$refs.content.style.transform = null
        }, 50)
      }
    }
  }
</script>

<style scoped>
  .gesture-tile-press-wrapper {
    perspective: 1000px;
    transform-style: preserve-3d;
  }

  .gesture-tile-press-content {
    transition: all 180ms ease 0ms;
  }
</style>

