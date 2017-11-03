<template>
  <ul class="wv-popup-press-menu">
    <li class="wv-popup-press-menu-li" v-for="(item, key) in items" @click="item.click" :key="key">{{item.name}}</li>
  </ul>
</template>

<script>

  export default {
    name: 'wv-popup-press-menu',

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
          $el.classList.add('outAnimation');
          requestAnimationFrame(function(){
            $el.classList.remove('inAnimation');

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
    transition: all 250ms ease 0s;
    display: inline-block;

    &.inital {
      opacity: 0;
      transform: scale(0.8) translateZ(0);
    }

    &.inAnimation {
      opacity: 1;
      transform: scale(1) translateZ(0);
    }

    &.outAnimation {
      opacity: 0;
      transform: scale(0.75) translateZ(0);
      transition-duration: 280ms;
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
    transition: all 200ms ease 0ms;
  }

  .wv-popup-press-menu-li:active {
    background: #E8E8E8;
    transition-duration: 85ms;
  }
</style>
