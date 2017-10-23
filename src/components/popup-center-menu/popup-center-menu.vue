<template>
  <wv-gesture-tile-press :unsetOnPressEnd="false" ref="tile">
    <ul class="wv-popup-center-menu" ref="menu" @touchend="_checkCloseTrigger">
      <li class="wv-popup-center-menu-li" v-for="(item, key) in items" @click="item.click" :key="key">{{item.name}}</li>
    </ul>
  </wv-gesture-tile-press>
</template>

<script>

  export default {
    name: 'wv-popup-center-menu',

    props: {
      e: {
        default: null
      },
      items: {
        type: Array,
        required: true
      },
      onClose: Function,
      onOpen: Function
    },

    created () {
      this.event = {
        beforeEnter: () => {
          var $el = this.$refs.menu,
            vm_tile = this.$refs.tile,
            $content = vm_tile.$refs.content,
            deg = vm_tile.maxDeg * 1.2;
          
          this._controller.vm_popUp.setAnimateDom($content)
          
          $el.classList.add('inital');
          requestAnimationFrame(function(){
            $el.classList.remove('inital');
            $el.classList.add('inAnimation');
          })
        },
        afterEnter: () => {},
        beforeLeave: () => {
          var $el = this.$refs.menu,
            vm_tile = this.$refs.tile,
            $content = vm_tile.$refs.content,
            deg = vm_tile.maxDeg * 1.15;
          
          this._controller.vm_popUp.setAnimateDom($content)
          vm_tile.orientationY = vm_tile.orientationY === undefined ? 1 : vm_tile.orientationY;
          vm_tile.orientationX = vm_tile.orientationX === undefined ? 0 : vm_tile.orientationX;
          
          // $el.classList.add('outAnimation')
          requestAnimationFrame(function(){
            // $el.classList.remove('inAnimation')
            $content.style.transitionDuration = '280ms';
            $content.style.transform = 
              `rotateX(${vm_tile.orientationY * deg}deg) rotateY(${vm_tile.orientationX * deg}deg) translateZ(-100px)`
            $content.style.opacity = 0
          })
        },
        afterLeave: () => {},
      }
    },
    
    methods: {
      _checkCloseTrigger (){
        setTimeout(()=>{
          var status = this._controller.vm_popUp.status,
            vm_tile = this.$refs.tile;

          if(status === 'on')
            vm_tile.unsetPressEffect()
        }, 30)
      }
    }
  }
</script>

<style scoped lang="scss">
  .wv-popup-center-menu {
    will-change: opacity, transform;
    width: calc(100vw - 36px*2 - 4px*2);
    border-radius: 3.5px;
    overflow: hidden;
    transition: all 250ms ease 0s;

    &.inital {
      opacity: 0;
      transform: rotateX(15deg) translateZ(-80px);
    }

    &.inAnimation {
      opacity: 1;
      transform: rotateX(0deg) translateZ(0px);
    }

    &.outAnimation {
      opacity: 0;
      transform: rotateX(-25deg) translateZ(-80px);
      transition-duration: 300ms;
    }
  }

  .wv-popup-center-menu-li {
    display: block;
    background: white;
    padding: 13px 21px;
    font-size: 16px;
    line-height: 1.4;
    color: black;
    border-bottom: calc(2px/3) solid #EBEBEB;
  }


  .wv-popup-center-menu-li:last-child{
    border-bottom: none;
  }

  .centerMenu > li .description{
    font-size: 12.5px;
    float: right;
  }
</style>
