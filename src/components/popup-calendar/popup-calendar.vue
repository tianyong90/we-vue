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
      class="wv-calendar-picker"
      :data-style="isLargeRowledge ? 'row-xl' : ''"
    ></wv-calendar-picker>

    <div class="shortcut-bar" v-show="enableShortcut && type === 'range'">
      <div @click="_select('today')">今天</div>
      <div @click="_select('yesterday')">昨天</div>
      <div @click="_select('lastWeek')">近一周</div>
      <div @click="_select('lastMonth')">近一个月</div>
    </div>

    <div class="shortcut-bar" v-show="enableShortcut && type === 'point'">
      <div @click="_select('today')">今天</div>
      <div @click="_select('yesterday')">昨天</div>
      <div @click="_select('tomorrow')">明天</div>
    </div>

    <div class="time-select-bar" v-show="enableTimeSelect && (selectedStart || selectedEnd)">
      <div v-show="selectedStart && !selectedEnd">
        <div class="time-select-title">选择<span v-show="type === 'range'">开始</span>时间</div>
        <wv-picker-view 
          :slots="timeSlots" 
          :onChange="_changeStartTime"
          :showItemNum="5"
        ></wv-picker-view>
      </div>
      <div v-show="selectedEnd">
        <div class="time-select-title">选择结束时间</div>
        <wv-picker-view 
          :slots="timeSlots" 
          :onChange="_changeEndTime"
          :showItemNum="5"
        ></wv-picker-view>
      </div>
    </div>

    <div class="controll-bar" v-show="selectedStart || selectedEnd">
      <div class="result" v-show="type === 'range'">
        <p>开始: {{selectedStart | selectionFilter}} {{selectedTimeStart | selectionTimeFilter}}</p>
        <p>结束: {{selectedEnd |selectionFilter}} {{selectedTimeEnd | selectionTimeFilter}}</p>
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
    if(val < 10) val = '0'+val
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
      enableTimeSelect:{
        type: Boolean,
        default: false
      },
      enableShortcut: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'range'
      },
      defaultRange: Object,
      isLargeRowledge: {
        type: Boolean,
        default: false
      }
    },

    data (){
      return {
        selectedStart: null,
        selectedEnd: null,
        selectedTimeStart: null,
        selectedTimeEnd: null,
        status: null,
        timeSlots: [
          {
            values: [],
            defaultIndex: 7
          },
          {
            values: [],
            defaultIndex: 0
          },
          {
            values: [
              '上午',
              '下午'
            ],
            defaultIndex: 0
          }
        ],
      }
    },

    created () {
      this.event = {
        beforeEnter: () => {
          var $el = this.$el;

          if(!this.$options.propsData.animation)
            $el.classList.add('inital');
          requestAnimationFrame(()=>{
            if(!this.$options.propsData.animation){
              $el.classList.remove('inital');
              $el.classList.add('inAnimation');
            }

            this.onOpen instanceof Function && this.onOpen();
          })
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

      //初始化timeSlot
      var i
      for(i = 1; i <= 12; i++)
        this.timeSlots[0].values.push(fixZero(i))
      for(i = 0; i <= 59 ; i++)
        this.timeSlots[1].values.push(fixZero(i))
    },

    mounted (){
      if(this.defaultRange)
        this.$refs.calendarPicker.select(this.defaultRange)
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
        function parseTimeHour(time){
          return time[2] === '下午' 
                 ? parseInt(time[0], 10) + 12
                 : parseInt(time[0], 10)
        }
        if(this.status !== null){
          var start = {}, end = {};
          if(this.selectedStart){
            Object.assign(start ,{
              year: this.selectedStart.year,
              month: this.selectedStart.month,
              day: this.selectedStart.day,
            })

            if(this.selectedTimeStart)
              Object.assign(start, {
                hour: parseTimeHour(this.selectedTimeStart),
                minute: parseInt(this.selectedTimeStart[1], 10)
              })
          }
          
          if(this.selectedEnd){
            Object.assign(end ,{
              year: this.selectedEnd.year,
              month: this.selectedEnd.month,
              day: this.selectedEnd.day,
            })

            if(this.selectedTimeEnd)
              Object.assign(end, {
                hour: parseTimeHour(this.selectedTimeEnd),
                minute: parseInt(this.selectedTimeEnd[1], 10)
              })
          }
          
          this.event.afterLeave = ()=>{
            this.onConfirmLeaved instanceof Function &&
              this.onConfirmLeaved(start, end) //不传递observable的对象感觉设置的时候会报错什么的
          }
          
          this.onConfirm instanceof Function &&
            this.onConfirm(start, end)

          this._close()
        }
      },

      _select (val){
        this.$refs.calendarPicker.select(val)
      },

      _changeStartTime (vm_picker, val){
        if(this.enableTimeSelect)
          this.selectedTimeStart = val
      },

      _changeEndTime (vm_picker, val){
        if(this.enableTimeSelect)
          this.selectedTimeEnd = val
      }
    },

    filters: {
      selectionFilter (selectedDate){
        if(selectedDate){
          var date = new Date(`${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`)

          return `${selectedDate.year}-${fixZero(selectedDate.month)}-${fixZero(selectedDate.day)} ${weekToZh[date.getDay()]}`
        }

        return '未选择'
      },

      selectionTimeFilter (selectedTime){
        var hour

        if(selectedTime){
          if(selectedTime[2] === '下午')
            hour = parseInt(selectedTime[0], 10) + 12
          else
            hour = selectedTime[0]
          
          return `${hour}:${selectedTime[1]}` 
        }

        return ''
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
    width: 100vw;
    height: 100vh;
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

  .shortcut-bar{
    display: flex;
    flex: 0 0 auto;
    height: 43px;
    justify-content: space-around;
    align-items: center;
    color: green;
    border-top: 1px solid #ddd;
    font-size: 16px;
  }

  .time-select-bar{
    flex: 0 0 auto;
  }

  .time-select-title{
    height: 44px;
    font-size: 16px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    text-align: center;
    line-height: 44px;
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

<style>
  .wv-calendar-picker[data-style='row-xl'] .day-row+.day-row{
    margin-top: 21px;
  }
</style>
