<template>
  <div class="wv-popup-base" :routerId="routerId">
    <div class="wv-popup-mask" ref="mask" @click="turnOffMask" @touchmove="maskPreventScroll"></div>
    <div class="wv-popup-slot">
      <div ref="slot"></div>
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

    mounted (){
      console.log('poup-base mounted');
    },

    created () {
      console.log('poup-base created');
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
          this.$refs.slot.style.transitionDuration = '0ms';
          //设置mask的初始化样式
          this.maskOpacity(0);

          this.vm_slot.$nextTick(()=>{
            //设置slot的初始化样式
            this.vm_slot.event && 
            this.vm_slot.event.beforeEnter instanceof Function && 
              this.vm_slot.event.beforeEnter();
            
            //设置事件
            this._addAnimationEndListener(this._afterEnter, 'afterEnterLocker')
            
            requestAnimationFrame(()=>{
              this.$refs.slot.style.transitionDuration = null;
              this.maskOpacity(0.25);
            })
          })
        })
      },

      _afterEnter () {
        if(this.animationendTriggered === true) return

        this.vm_slot.event && 
        this.vm_slot.event.afterEnter instanceof Function && 
          this.vm_slot.event.afterEnter();
        
        this.animationendTriggered === true
      },

      _beforeLeave () {
        requestAnimationFrame(()=>{
          this.maskOpacity(0);

          this.vm_slot.event && 
          this.vm_slot.event.beforeLeave instanceof Function && 
            this.vm_slot.event.beforeLeave();
          
          //前一个animationend导致提前触发
          setTimeout(()=>{
            this._addAnimationEndListener(this._afterLeave, 'afterLeaveLocker')
          }, 28)
        })
      },

      _afterLeave () {
        this.$refs.slot.event && 
        this.$refs.slot.event.afterLeave instanceof Function && 
          this.$refs.slot.event.afterLeave();
        
        requestAnimationFrame(() => {
          this._afterLeaveCallback instanceof Function &&
            this._afterLeaveCallback()
        })
      },
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
