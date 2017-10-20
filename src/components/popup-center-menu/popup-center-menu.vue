<template>
  <ul class="wv-popup-center-menu">
    <li class="wv-popup-center-menu-li" v-for="(item, key) in items" @click="item.click" :key="key">{{item.name}}</li>
  </ul>
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
          var $el = this.$el;

          console.log('slot before enter');
          //先手动更新样式
          $el.classList.add('inital');
          requestAnimationFrame(function(){
            $el.classList.remove('inital');
            $el.classList.add('inAnimation');
          })
        },
        afterEnter: () => {
          console.log('afterEntered')
        },
        beforeLeave: () => {
          var $el = this.$el;
          $el.classList.add('outAnimation');
          requestAnimationFrame(function(){
            $el.classList.remove('inAnimation');
          })
        },
        afterLeave: () => {
          console.log('afterLeaved')
        },
      }
    },

  }
</script>

<style scoped lang="scss">
  .wv-popup-center-menu {
    will-change: opacity, transform;
    width: calc(100vw - 36px*2 - 4px*2);
    border-radius: 3.5px;
    overflow: hidden;
    transition: all 280ms ease 0s;

    &.inital {
      opacity: 0;
      transform: skew(6deg, 8deg) translateZ(0);
    }

    &.inAnimation {
      opacity: 1;
      transform: skew(0deg, 0deg) translateZ(0);
    }

    &.outAnimation {
      opacity: 0;
      transform: skew(-3deg, -4deg) translateZ(0);
      transition-duration: 300ms;
    }
  }

  .wv-popup-center-menu-li {
    display: block;
    background: white;
    padding: 13px 21px;
    font-size: 16px;
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
