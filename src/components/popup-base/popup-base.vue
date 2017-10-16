<template>
  <div class="wv-popup-base" :routerId="routerId">
    <div class="wv-popup-mask" ref="mask" @click="turnOffMask" @touchmove="maskPreventScroll"></div>
    <div class="wv-popup-slot">
      <div ref="slot"></div>
    </div>
  </div>
</template>

<script>
  import { once } from '../../utils/dom.js'

  export default {
    name: 'wv-popup-base',

    data () {
      return {
        routerId: null,
        status: null
      }
    },

    mounted (){
      console.log('poup-base mounted');
    },

    created () {
      console.log('poup-base created');
    },

    methods: {
      init (config) {
        this.routerId = config.routerId
        this.maskDisable = config.maskDisable
      },

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
          this.vm_slot.$controller.close()
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


      //内部使用的
      _beforeEnter () {
        this.$refs.slot.style.transitionDuration = '0ms';
        //设置mask的初始化样式
        this.maskOpacity(0);
        //设置事件
        once(this.$refs.slot, 'transitionend', this._afterEnter)

        this.vm_slot.$nextTick(()=>{
          //设置slot的初始化样式
          this.vm_slot.event && 
          this.vm_slot.event.beforeEnter instanceof Function && 
            this.vm_slot.event.beforeEnter();
          
          requestAnimationFrame(()=>{
            this.$refs.slot.style.transitionDuration = null;
            this.maskOpacity(0.2);
          })
        })
      },

      _afterEnter () {
        this.vm_slot.event && 
        this.vm_slot.event.afterEnter instanceof Function && 
          this.vm_slot.event.afterEnter();
      },

      _beforeLeave () {
        requestAnimationFrame(()=>{
          this.maskOpacity(0);

          this.vm_slot.event && 
          this.vm_slot.event.beforeLeave instanceof Function && 
            this.vm_slot.event.beforeLeave();

          //防止提前触发
          setTimeout(()=>{
            once(this.$refs.slot, 'transitionend', this._afterLeave)
          },35)
        })
      },

      _afterLeave () {
        this.$refs.slot.event && 
        this.$refs.slot.event.beforeLeave instanceof Function && 
          this.$refs.slot.event.beforeLeave();

        requestAnimationFrame(() => {
          this._afterLeaveCallback instanceof Function &&
            this._afterLeaveCallback()
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .wv-popup-base {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    overflow: hidden;

    &.absolute {
      position: absolute;
    }
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
  }
</style>
