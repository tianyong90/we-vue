<template>
  <div class="wv-popup-base" :routerId="routerId" ref="base">
    <div class="wv-popup-mask" ref="mask" @click="turnOffMask" @touchmove="maskPreventScroll"></div>
    <div class="wv-popup-slot">
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
      }
    },

    data () {
      return {
        status: null,
        afterEnterLocker: false,
        afterLeaveLocker: false,
        $animateDom: null
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
              if(!this.vm_slot.$options.propsData.animationInEventOff)
                this.$refs.slot.style.transitionDuration = null;
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

        this.$refs.slot.event && 
        this.$refs.slot.event.afterLeave instanceof Function && 
          this.$refs.slot.event.afterLeave();
        
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
          }
        }

        animation = null
        $dom = null
        value = null
      },
    },

    destroyed () {
      this.$animateDom = null
    }
  }
</script>

<style scoped lang="scss">
  .wv-popup-base{
    width: 0px;
    height: 0px;
  }
  .wv-popup-slot{
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
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
