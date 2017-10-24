<template>
  <div class="wv-popup-calendar">
    <div class="header">
      <span class="btn">x</span>
      <span class="title">日期选择</span>
      <span class="btn" @click="_clearSelection">清除</span>
    </div>

    <wv-calendar-picker 
      @onSelectHasDisableDate="_disableDaySelected"
      ref="calendarPicker"
      type="range"
      @onSelect="_onSelect"
      class="calendar-picker"
    ></wv-calendar-picker>

    <div class="controll-bar" v-show="selectedStart || selectedEnd">
      <div class="result">
        <p>开始: {{selectedStart | selectionFilter}}</p>
        <p>结束: {{selectedEnd | selectionFilter}}</p>
      </div>
      <div class="btn-confirm">确认</div>
    </div>
  </div>
</template>

<script>
  import WvCalendarPicker from './calendar-picker.vue'

  export default {
    name: 'wv-popup-calendar',

    components: {
      WvCalendarPicker
    },

    props: {
      e: {
        default: null
      },
      onClose: Function,
      onOpen: Function
    },

    data (){
      return {
        selectedStart: null,
        selectedEnd: null
      }
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

    methods: {
      _disableDaySelected (days){
        console.log(days)
      },

      _clearSelection (){
        this.$refs.calendarPicker.clearSelection()
      },

      _onSelect(start, end){
        console.log(start, end)
        this.selectedStart = start
        this.selectedEnd = end
      }
    },

    filters: {
      selectionFilter (select){
        if(select)
          return `${select.year}-${select.month}-${select.day}`
      }
    }
  }
</script>

<style scoped lang="scss">
  .wv-popup-calendar {
    background-color: white;
    will-change: opacity, transform;
    box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.15);
    transition: all 280ms ease 0s;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    display: flex;

    &.inital {
      opacity: 0;
      transform: translateY(15%) translateZ(0);
    }

    &.inAnimation {
      opacity: 1;
      transform: translateY(0) translateZ(0);
    }

    &.outAnimation {
      opacity: 0;
      transform: translateY(15%) translateZ(0);
      transition-duration: 300ms;
    }
  }

  .header {
    display: flex;
    width: 100%;
    margin-top: 5px;
    flex-shrink: 0;
    -webkit-box-align: center;

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

  .calendar-picker{
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    display: flex;
    overflow-y: auto;
  }

  .controll-bar{
    display: flex;
    height: 53px;
    width: calc(100% - 30px);
    padding: 0 15px;
    align-items: center;
    border-top: 1px solid #ddd;
    background: #f7f7f7;
    flex: 0 0 auto;

    & .result {
      flex: auto;
      font-size: 12px;
    }

    & .btn-confirm {
      flex: 0 0 auto;
      text-align: center;
      width: 80px;
      height: 36px;
      line-height: 36px;
      border-radius: 5px;
      color: #fff;
      font-size: 18px;
      background: #1aad19;
    }
  }
</style>
