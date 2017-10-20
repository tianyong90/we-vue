<template>
  <ul class="wv-popup-dom-relative">
    <li class="wv-popup-dom-relative-li" v-for="(item, key) in items" @click="item.click" :key="key">{{item.name}}</li>
  </ul>
</template>

<script>

  export default {
    name: 'wv-popup-dom-relative',

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

            this.onOpen instanceof Function && this.onOpen();
          }.bind(this))
        },
        afterEnter: () => {
          console.log('afterEntered')
        },
        beforeLeave: () => {
          var $el = this.$el;
          $el.classList.add('outAnimation');
          requestAnimationFrame(function(){
            $el.classList.remove('inAnimation');

            this.onClose instanceof Function && this.onClose();
          }.bind(this))
        },
        afterLeave: () => {
          console.log('afterLeaved')
        },
      }
    },
  }
</script>

<style scoped lang="scss">
  .wv-popup-dom-relative {
    will-change: opacity, transform;
    box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.15);
    transition: all 350ms ease 0s;
    flex: 0 0 auto;

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
      transition-duration: 400ms;
    }
  }

  .wv-popup-dom-relative-li {
    height: 43px;
    line-height: 43px;
    padding: 0 30px 0 15px;
    font-size: 14px;
    display: block;
    background: white;
    min-width: calc(90px - 45px);
  }

  .wv-popup-dom-relative-li:active {
    background: #E8E8E8;
    transition: all 80ms linear 0ms;
  }
</style>
