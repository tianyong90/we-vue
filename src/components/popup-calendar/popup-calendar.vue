<template>
  <div class="wv-popup-calendar">
    <div class="header">
      <span class="btn btn-close" @click="_close"></span>
      <span class="title">日期选择</span>
      <span class="btn btn-clear" @click="_clearSelection" v-show="selectedStart || selectedEnd">清除</span>
    </div>

    <wv-calendar-picker 
      @onSelectHasDisableDate="_disableDaySelected"
      ref="calendarPicker"
      :type="type"
      @onSelect="_onSelect"
      class="calendar-picker"
    ></wv-calendar-picker>

    <div class="controll-bar" v-show="selectedStart || selectedEnd">
      <div class="result" v-show="type === 'range'">
        <p>开始: {{selectedStart | selectionFilter}}</p>
        <p>结束: {{selectedEnd | selectionFilter}}</p>
      </div>
      <div class="btn-confirm" 
        @click="_confirm" 
        :data-status="status | statusFilter"
        :data-style="type | typeFilter"
      >确认</div>
    </div>
  </div>
</template>

<script>
  import WvCalendarPicker from './calendar-picker.vue'

  const weekToZh = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
  ]

  const fixZero = function (val){
    if(val < 9) val = '0'+val
    return val
  }

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
      onOpen: Function,
      onConfirm: Function,
      onConfirmLeaved: Function,
      onDisableDaySelected: Function,
      type: {
        type: String,
        default: 'range'
      }
    },

    data (){
      return {
        selectedStart: null,
        selectedEnd: null,
        status: null
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
        this.onDisableDaySelected instanceof Function && 
          this.onDisableDaySelected(days)
      },

      _clearSelection (){
        this.$refs.calendarPicker.clearSelection()
      },

      _onSelect(start, end){
        this.selectedStart = start
        this.selectedEnd = end
        this.event.afterLeave = null
        
        this.status = this.type === 'range' ? (start && end) : start
      },

      _close(){
        this._controller.close()
      },

      _confirm (){
        if(this.status !== null){
          var start, end;
          if(this.selectedStart)
          start = {
            year: this.selectedStart.year,
            month: this.selectedStart.month,
            day: this.selectedStart.day
          }

          if(this.selectedEnd)
          end = {
            year: this.selectedEnd.year,
            month: this.selectedEnd.month,
            day: this.selectedEnd.day
          }
          
          this.event.afterLeave = ()=>{
            this.onConfirmLeaved instanceof Function &&
              this.onConfirmLeaved(start, end) //不传递observable的对象感觉设置的时候会报错什么的
          }
          
          this.onConfirm instanceof Function &&
            this.onConfirm(start, end)

          this._close()
        }
      }
    },

    filters: {
      selectionFilter (select){
        if(select){
          var date = new Date(`${select.year}-${select.month}-${select.day}`)
          
          return `${select.year}-${fixZero(select.month)}-${fixZero(select.day)} ${weekToZh[date.getDay()]}`
        }

        return '未选择'
      },

      statusFilter (val){
        if(val === null)
          return 'disable'
      },

      typeFilter(val){
        if(val === 'point')
          return 'oneline'
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
    flex-direction: column;
    display: flex;

    &.inital {
      opacity: 0;
      transform: translateY(5%) translateZ(0);
    }

    &.inAnimation {
      opacity: 1;
      transform: translateY(0) translateZ(0);
    }

    &.outAnimation {
      opacity: 0;
      transform: translateY(5%) translateZ(0);
      transition-duration: 300ms;
    }
  }

  .header {
    width: 100%;
    margin-top: 5px;
    flex-shrink: 0;

    & .btn {
      position: absolute;
      padding: 0 8px;
      margin: 0 5px;
      font-size: 14px;
      color: #1aad19;
      line-height: 23px;
      height: 23px;
    }

    & .btn-close {
      width: 22px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

      &::before, &::after{
        content: ' ';
        position: relative;
        width: 0px;
        height: 15px;
        border-left: 1.5px solid;
        border-radius: 0.2px;
      }

      &::before{
        transform: rotate(45deg);
      }

      &::after{
        transform: translateX(-1.5px) rotate(-45deg);
      }
    }

    & .btn-clear {
      right: 0px;
      top: 5px;
    }

    & .title{
      display: inline-block;
      text-align: center;
      width: 100%;
    }
  }

  .calendar-picker{
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
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
  }

  .btn-confirm {
    flex: 0 0 auto;
    text-align: center;
    width: 80px;
    height: 36px;
    line-height: 36px;
    border-radius: 5px;
    color: #fff;
    font-size: 18px;
    font-weight: 300;
    background: #1aad19;

    &[data-status='disable'] {
      color: #bbb;
      background: #ddd;
    }

    &[data-style='oneline'] {
      flex: auto;
      width: auto;
    }
  }
</style>
