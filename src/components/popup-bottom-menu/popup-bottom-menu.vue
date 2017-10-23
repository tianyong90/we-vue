<template>
  <ul class="wv-popup-bottom-menu">
    <li class="wv-popup-bottom-menu-li" v-for="(item, key) in items" @click="item.click" :key="key">{{item.name}}</li>
  </ul>
</template>

<script>

  export default {
    name: 'wv-popup-bottom-menu',

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

          if(!this.$options.propsData.animation)
            $el.classList.add('inital');
          requestAnimationFrame(function(){
            if(!this.$options.propsData.animation){
              $el.classList.remove('inital');
              $el.classList.add('inAnimation');
            }

            this.onOpen instanceof Function && this.onOpen();
          }.bind(this))
        },
        afterEnter: () => {},
        beforeLeave: () => {
          var $el = this.$el;

          if(!this.$options.propsData.animation)
            $el.classList.add('outAnimation');
          requestAnimationFrame(function(){
            if(!this.$options.propsData.animation)
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
  .wv-popup-bottom-menu {
    will-change: opacity, transform;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: auto;
    transition: all 250ms ease 0s;

    &.inital {
      opacity: 0;
      transform: translateY(100%) translateZ(0);
    }

    &.inAnimation {
      opacity: 1;
      transform: translateY(0%) translateZ(0);
    }

    &.outAnimation {
      opacity: 0;
      transform: translateY(100%) translateZ(0);
      transition-duration: 400ms;
    }
  }

  .wv-popup-bottom-menu-li {
    background: white;
    padding: 0 21px;
    font-size: 16px;
    width: calc(100vw - 21px*2);
    color: #5e5e5e;
    min-height: 42px;
    display: flex;
    align-items: center;
  }
</style>
<style lang="scss">
  //这里编写用class可以应用到mask上面的,不过命名尽量不要污染太多

</style>

