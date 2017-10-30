<template>
  <ul class="wv-popup-over" ref="menu">
    <li class="wv-popup-over-li" v-for="(item, key) in items" @click="item.click" :key="key">
      <span class="li-icon-container">
        <img class="li-icon" :src="item.src" alt="">
      </span>
      <span class="li-title">
        {{item.name}}
      </span>
      </li>
  </ul>
</template>

<script>

  export default {
    name: 'wv-popup-over',

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
          var $el = this.$refs.menu;
          
          $el.classList.add('inital');
          requestAnimationFrame(function(){
            $el.classList.remove('inital');
            $el.classList.add('inAnimation');
          })
        },
        afterEnter: () => {},
        beforeLeave: () => {
          var $el = this.$refs.menu;
          
          $el.classList.add('outAnimation')
          requestAnimationFrame(function(){
            $el.classList.remove('inAnimation')
          })
        },
        afterLeave: () => {},
      }
    },
    
    methods: {
      
    }
  }
</script>

<style scoped lang="scss">
  .wv-popup-over {
    will-change: opacity, transform;
    border-radius: 3.5px;
    transition: all 250ms ease 0s;
    display: inline-block;
    padding: 0px 8px;
    background: white;
    margin-top: 8px;

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

    &::before {
      content: '';
      position: absolute;
      border: 5px solid transparent;
      border-bottom-color: white;
      top: -10px;
      right: 8px;
    }
  }

  .wv-popup-over-li {
    display: block;
    padding: 9px 8px;
    font-size: 15px;
    line-height: 1.4;
    color: black;
    border-bottom: calc(2px/3) solid #EBEBEB;
    display: flex;
  }

  .wv-popup-over-li:last-child{
    border-bottom: none;
  }

  .li-icon-container{
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .li-icon{
    margin-right: 8px;
    width: 18px;
    height: 18px;
  }

</style>
