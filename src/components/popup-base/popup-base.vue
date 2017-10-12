<template>
  <div class="wv-popup-base" :routerId="routerId">
    <div class="wv-popup-mask" ref="mask"></div>
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
        routerId: null
      }
    },

    mounted (){
      this.$refs.mask.onclick = () => history.back()
    },

    methods: {
      init (config) {
        this.routerId = config.routerId
      },

      enter () {
        this._beforeEnter()
      },

      leave (callback) {
        this._beforeLeave()
        this._afterLeaveCallback = callback
      },

      maskOpacity (val) {
        this.mask.style.opacity = val;
      },

      trunOffMaskTransition () {
        this.mask.style.transitionDuration = '0ms';
      },

      trunOnMaskTransition () {
        this.mask.style.transitionDuration = null;
      },

      maskClassAdd (name) {
        this.$refs.mask.classList.add(name)
      },

      maskClassRemove (name) {
        this.$refs.mask.classList.remove(name)
      },


      //内部使用的
      _beforeEnter () {
        requestAnimationFrame(function(){
          //设置mask的初始化样式
          
          //设置事件
          once(this.$refs.slot, 'transitionend', this._afterEnter)

          //设置slot的初始化样式
          this.vm_slot.event && 
          this.vm_slot.event.beforeEnter instanceof Function && 
            this.vm_slot.event.beforeEnter();
          
        }.bind(this))
      },

      _afterEnter () {
        this.vm_slot.event && 
        this.vm_slot.event.afterEnter instanceof Function && 
          this.vm_slot.event.afterEnter();
      },

      _beforeLeave () {
        requestAnimationFrame(function(){
          once(this.$refs.slot, 'transitionend', this._afterLeave)

          this.vm_slot.event && 
          this.vm_slot.event.beforeLeave instanceof Function && 
            this.vm_slot.event.beforeLeave();
        }.bind(this))
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

    &.absolute {
      position: absolute;
    }
  }

  .wv-popup-mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 250ms ease 0s;
  }
</style>
