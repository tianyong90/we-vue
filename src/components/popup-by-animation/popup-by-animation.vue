<template>
  <ul class="wv-popup-press-menu">
    <li class="wv-popup-press-menu-li" v-for="(item, key) in items" @click="item.click" :key="key">{{item.name}}</li>
  </ul>
</template>

<script>

  export default {
    name: 'wv-popup-by-animation',

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
          var $el = this.$el;

          $el.classList.add('inital');
          requestAnimationFrame(()=>{
            $el.classList.remove('inital');
            $el.classList.add('inAnimation');
            
            this.onOpen instanceof Function && this.onOpen();
          })
        },
        afterEnter: () => {},
        beforeLeave: () => {
          var $el = this.$el;

          $el.classList.remove('inAnimation');
          requestAnimationFrame(function(){
            $el.classList.add('outAnimation');

            this.onClose instanceof Function && this.onClose();
          }.bind(this))
        },
        afterLeave: () => {},
      }
    },
  }
</script>

<style scoped lang="scss">
  .wv-popup-press-menu {
    will-change: opacity, transform;
    box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.15);
    transition: all 350ms ease 0s;
    display: inline-block;

    &.inital {
      opacity: 0;
    }

    &.inAnimation {
      animation: animation 280ms ease forwards;
    }

    &.outAnimation {
      animation: animation 280ms ease reverse ;
    }
  }

  @keyframes animation {
    0%{
      opacity: 0;
      transform: scale(.7)
    }
    70%{
      transform: scale(1.05)
    }
    100%{
      opacity: 1;
      transform: scale(1)
    }
  }

  .wv-popup-press-menu-li {
    height: 43px;
    line-height: 43px;
    padding: 0 30px 0 15px;
    font-size: 14px;
    display: block;
    background: white;
    min-width: calc(90px - 45px);
    transition: all 200ms linear 0ms;
  }

  .wv-popup-press-menu-li:active {
    background: #E8E8E8;
    transition-duration: 85ms;
  }
</style>
