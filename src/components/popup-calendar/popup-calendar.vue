<template>
  <div class="wv-popup-calendar">
    <div class="header">
      <span class="btn">x</span>
      <span class="title">日期选择</span>
      <span class="btn">清除</span>
    </div>

    <div class="calendar-picker">
      <div class="week-indicator">
        <div class="week-indicator-item grey">日</div>
        <div class="week-indicator-item">一</div>
        <div class="week-indicator-item">二</div>
        <div class="week-indicator-item">三</div>
        <div class="week-indicator-item">四</div>
        <div class="week-indicator-item">五</div>
        <div class="week-indicator-item grey">六</div>
      </div>
      <div class="months-warpper">
        
      </div>
    </div>

    <div class="controll-bar">

    </div>
  </div>
</template>

<script>

  export default {
    name: 'wv-popup-calendar',

    props: {
      e: {
        default: null
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
  .wv-popup-calendar {
    background-color: white;
    will-change: opacity, transform;
    box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.15);
    transition: all 250ms ease 0s;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &.inital {
      opacity: 0;
      transform: translateY(50%) translateZ(0);
    }

    &.inAnimation {
      opacity: 1;
      transform: translateY(0) translateZ(0);
    }

    &.outAnimation {
      opacity: 0;
      transform: translateY(50%) translateZ(0);
      transition-duration: 280ms;
    }
  }

  .header {
    display: flex;
    width: 100%;
    margin-top: 5px;

    & .btn {
      flex: 0 0 auto;
      padding: 0 8px;
      margin: 0 5px;
    }

    & .title{
      flex: auto;
      text-align: center;

    }
  }

  .week-indicator{
    display: flex;
    width: 100%;
  }

  .week-indicator-item{
    flex: auto;
    text-align: center;
    border-bottom: 1px solid #ddd; 

    &.grey{
      color: #bbb;
    }
  }
</style>
