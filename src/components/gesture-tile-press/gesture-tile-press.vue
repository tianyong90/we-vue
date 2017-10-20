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
      unsetOnPressEnd: {
        type: Boolean,
        default: true
      }
    },

    methods: {
      //私有方法
      _touchStart (e) {
        var rect = this.$el.getBoundingClientRect();
        this.orthocenterX = rect.left + rect.width/2
        this.orthocenterY = rect.top + rect.height/2
        this.clickX = e.touches[0].clientX
        this.clickY = e.touches[0].clientY
        this.destance = this._getDestance(
          this.orthocenterX, this.orthocenterY, this.clickX, this.clickY)
        this.diagonal = this._getDestance(
          rect.right, rect.top, rect.left, rect.bottom)
        this.orientationX = (this.clickX - this.orthocenterX) > 0 ? 1 : -1
        this.orientationY = (this.clickY - this.orthocenterY) > 0 ? -1 : 1

        this.setPressEffect(
          this.orientationX,
          this.orientationY,
          this.destance,
          this.diagonal
        )
      },

      _touchMove (){
        this.unsetPressEffect()
      },

      _touchEnd (){
        if(this.unsetOnPressEnd === true)
          this._unsetPressEffect(true)
      },

      _getDestance(x0, y0, x1, y1){
        return Math.sqrt(
          (x0 - x1)**2 + (y0 - y1)**2
        )
      },


      //对外可用的方法
      setPressEffect (orientationX, orientationY, destance, diagonal){
        var deg = this.maxDeg * (destance/(diagonal/2))

        deg = deg < this.minDeg ? this.minDeg : deg

        this.$refs.content.style.transform = 
          `rotateX(${orientationY * deg}deg) rotateY(${orientationX * deg}deg) translateZ(-6px)`
      },

      unsetPressEffect (force){
        setTimeout(()=>{
          this.$refs.content.style.transform = null
        }, 30)
      }
    },

    destroyed(){
      this.orthocenterX = null
      this.orthocenterY = null
      this.clickX = null
      this.clickY = null
      this.destance = null
      this.diagonal = null
      this.orientationX = null
      this.orientationY = null
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

