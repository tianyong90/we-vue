<template>
  <div class="wv-popup-base" 
    :routerId="routerId" 
    ref="base"
    :style="{ position: positionType }"
    @touchmove="maskPreventScroll"
  >
    <div class="wv-popup-mask" ref="mask" @click="turnOffMask" ></div>
    <div class="wv-popup-slot" ref="slotContainer">
      <div ref="slot" @touchmove="_stopPropagation"></div>
    </div>
  </div>
</template>

<script>
  import popUpController from '../popup-base/index.js'

  export default {
    name: 'wv-popup-base',

    props: {
      e: {
        default: null
      },
      routerId: {
        type: String,
        required: true
      },
      maskDisable: {
        type: Boolean,
        default: false
      },
      runtimeConfig: Object
    },

    data () {
      return {
        status: null,
        afterEnterLocker: false,
        afterLeaveLocker: false,
        $animateDom: null,
        positionType: null
      }
    },

    methods: {
      enter () {
        this._beforeEnter()
        this.status = 'on'
      },

      leave (callback) {
        this.status = 'off'
        this._beforeLeave()
        this._afterLeaveCallback = callback
      },

      afterDomLoad (){
        this.vm_slot.event &&
        this.vm_slot.event.afterDomLoad && 
          this.vm_slot.event.afterDomLoad()
      },

      turnOffMask () {
        if(!this.maskDisable)
          this.vm_slot._controller.close()
      },

      maskOpacity (val) {
        this.$refs.mask.style.opacity = val;
      },

      trunOffMaskTransition () {
        this.$refs.mask.style.transitionDuration = '0ms';
      },

      trunOnMaskTransition () {
        this.$refs.mask.style.transitionDuration = null;
      },

      maskClassAdd (name) {
        this.$refs.mask.classList.add(name)
      },

      maskClassRemove (name) {
        this.$refs.mask.classList.remove(name)
      },

      maskPreventScroll(e){
        if(this.runtimeConfig && this.runtimeConfig.positionType === 'absolute')
          return 
        if(this.status === 'on')
          e.preventDefault()
      },

      setAnimateDom ($dom){
        this.$animateDom = $dom
      },

      getAnimateDom ($dom){
        return this.$animateDom || this.$refs.slot
      },


      //内部使用的
      _addAnimationEndListener (callback, lock){
        var $dom = this.$animateDom || this.$refs.slot

        this[lock] = false

        var onAnimationEnd = (e) => {
          if(e.target === $dom){
            if(this[lock]) return
            this[lock] = true

            $dom.removeEventListener(
              'transitionend', onAnimationEnd);
            $dom.removeEventListener(
              'animationend', onAnimationEnd);
            
            callback instanceof Function && callback();
          }
        }

        $dom.addEventListener(
          'transitionend', onAnimationEnd);
        $dom.addEventListener(
          'animationend', onAnimationEnd);
      },

      _beforeEnter () {
        requestAnimationFrame(()=>{
          if(!this.vm_slot.$options.propsData.animationInEventOff)
            this.$refs.slot.style.transitionDuration = '0ms';
          //设置mask的初始化样式
          this.maskOpacity(0);

          this.vm_slot.$nextTick(()=>{
            //设置slot的初始化样式
            this._animation('in')
            
            this.vm_slot.event && 
            this.vm_slot.event.beforeEnter instanceof Function && 
              this.vm_slot.event.beforeEnter();
            
            //设置事件
            this._addAnimationEndListener(this._afterEnter, 'afterEnterLocker')
            
            requestAnimationFrame(()=>{
              if(!this.vm_slot.$options.propsData.animationInEventOff){
                if(!this._animationNoneReday)
                  this.$refs.slot.style.transitionDuration = null;
              }
              this.maskOpacity(0.25);
            })
          })
        })
      },

      _afterEnter () {
        if(this.animationendTriggered === true) return

        this._animation('in', true)

        this.vm_slot.event && 
        this.vm_slot.event.afterEnter instanceof Function && 
          this.vm_slot.event.afterEnter();
        
        this.animationendTriggered === true
      },

      _beforeLeave () {
        requestAnimationFrame(()=>{
          this.maskOpacity(0);
          this._animation('out')

          this.vm_slot.event && 
          this.vm_slot.event.beforeLeave instanceof Function && 
            this.vm_slot.event.beforeLeave();
          
          //前一个animationend导致提前触发
          this._freezeEvents()
          setTimeout(()=>{
            this._addAnimationEndListener(this._afterLeave, 'afterLeaveLocker')
          }, 28)
        })
      },

      _afterLeave () {
        this._animation('out', true)

        this.vm_slot.event && 
          this.vm_slot.event.afterLeave instanceof Function && 
            this.vm_slot.event.afterLeave();
        
        requestAnimationFrame(() => {
          this._afterLeaveCallback instanceof Function &&
            this._afterLeaveCallback()
        })
      },

      _freezeEvents () {
        this.$refs.base.addEventListener(
          'touchstart', this._stopPropagation, true)
        this.$refs.base.addEventListener(
          'touchmove', this._stopPropagation, true)
        this.$refs.base.addEventListener(
          'touchend', this._stopPropagation, true)
      },

      _stopPropagation (e){
        e.stopPropagation()
        e.preventDefault()
      },

      _animation (progressName, unset=false){// in/out
        var animation = this.vm_slot.$options.propsData.animation,
          value, $dom = this.getAnimateDom();

        if(animation instanceof Object){
          value = animation[progressName]

          //string,array被classname设置占用了,只剩下object用于扩展了
          if(value instanceof String){
            if(unset === false)
              $dom.classList.add(value)
            else
              $dom.classList.remove(value)
          }else if(value instanceof Array){
            if(unset === false)
              value.forEach( val => $dom.classList.add(val))
            else
              value.forEach( val => $dom.classList.remove(val))
          }else if(value instanceof Object){
            if(value.effect === 'zoomFromDom')
              this._triggerZoomFromDom(progressName, value, unset)
          }
        }

        animation = null
        $dom = null
        value = null
      },

      _triggerZoomFromDom (progress, value, unset){
        var $fromDom = value.fromDom || (this.e ? this.e.target : null),
          $slot = this.vm_slot.$el,
          fromDomRect , slotRect,

          scaleAdjusted = 2/3 ,
          scale, translateX, translateY,
          fromDomCenterX, fromDomCenterY, 
          slotCenterX, slotCenterY;

        if($fromDom && !unset){
          this._animationNoneReday = true
          $slot.style.opacity = 0
          requestAnimationFrame(()=>{
            fromDomRect = $fromDom.getBoundingClientRect()
            slotRect = $slot.getBoundingClientRect()

            if(value.offset !== undefined)
              scaleAdjusted = value.offset

            slotCenterX = slotRect.left + slotRect.width/2;
            slotCenterY = slotRect.left + slotRect.width/2;
            fromDomCenterX = fromDomRect.left + fromDomRect.width/2;
            fromDomCenterY = fromDomRect.top + fromDomRect.height/2;

            //然后做动画偏移, 需要区分布局偏移
            translateX = fromDomCenterX - slotCenterX;
            translateY = fromDomCenterY - slotCenterY;

            if(progress === 'in'){
              this.$refs.slot.style.transitionDuration = '0ms';
              $slot.style.opacity = 0
              //无论in或者out都是一样的
              $slot.style.transform = 
                `translate3d(${translateX*scaleAdjusted}px, ${translateY*scaleAdjusted}px,0) scale(${scaleAdjusted})`;

              requestAnimationFrame(()=>{
                $slot.style.transform = null
                $slot.style.transitionDuration = null;
                this._animationNoneReday = null
                $slot.style.opacity = null
              })
            }else if(progress === 'out'){
              $slot.style.transform = 
                `translate3d(${translateX*scaleAdjusted}px, ${translateY*scaleAdjusted}px,0) scale(${scaleAdjusted})`;
              $slot.style.opacity = 0
            }
          })
        }
      }
    },

    destroyed () {
      this.$animateDom = null
    }
  }
</script>

<style scoped lang="scss">
  .wv-popup-base{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: visible;
    top: 0;
  }

  .wv-popup-slot{
    position: relative;
    height: 0;
    width: 500vw;
  }

  .wv-popup-mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    opacity: 0;
    background-color: #000000;
    transition: opacity 350ms ease 0s;
    will-change: opacity;
  }
</style>
