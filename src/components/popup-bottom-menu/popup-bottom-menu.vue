<template>
  <ul class="wv-popup-bottom-menu">
    <wv-button v-for="(item, key) in items" @click="item.click" :key="key">{{item.name}}</wv-button>
  </ul>
</template>

<script>

  export default {
    name: 'wv-popup-bottom-menu',

    props: {
      items: {
        type: Array
      },
    },

    created () {
      this.event = {
        beforeEnter: () => {
          var $el = this.$el;

          console.log('slot before enter',this,$el);
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

    data () {
      return {
        
      }
    },

    methods: {
      init (config) {
        this.items = config.items
        this.animationClassName = config.animation
      },


    }
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
    transition: all 300ms ease 0s;

    &.inital {
      opacity: 0.7;
      transform: translateY(100%) translateZ(0);
    }

    &.inAnimation {
      opacity: 1;
      transform: translateY(0%) translateZ(0);
    }

    &.outAnimation {
      opacity: 0.7;
      transform: translateY(100%) translateZ(0);
      transition-duration: 240ms;
    }
  }
</style>
<style lang="scss">
  //这里编写用class可以应用到mask上面的,不过命名尽量不要污染太多

</style>

