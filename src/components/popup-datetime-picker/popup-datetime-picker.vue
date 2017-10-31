<template>
  <div class="weui-picker">
    <div class="weui-picker__hd">
      <a class="weui-picker__action noExpand" @click="_cancel" v-text="cancelText"></a>
      <a class="weui-picker__action"></a>
      <a class="weui-picker__action noExpand" @click="_confirm" v-text="confirmText"></a>
    </div>
    <wv-picker-view 
      :slots="slots" 
      :onChange="_onChange"
      :defaultValues="defaultValues"
      :valueKey="valueKey"
      :showItemNum="showItemNum"
      :showItemHeight="showItemHeight"
      ref="picker"
    ></wv-picker-view>
  </div>
</template>

<script>
  import { countDays, fixZero } from '../../custom/utils'

  export default {
    name: 'wv-picker',

    props: {
      showItemNum: Number,
      showItemHeight: Number,
      defaultValues: Array,
      valueKey: String,
      onChange: Function,

      confirmText: {
        type: String,
        default: '确定'
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      onConfirm: Function,
      onCancel: Function,

      mode: {
        type: String,
        default: 'datetime'
      },
      minDate: {
        type: Date,
        default(){
          var now = new Date()
          now.setFullYear(now.getFullYear() - 10)
          return now
        }
      },
      maxDate: {
        type: Date,
        default(){
          var now = new Date()
          now.setFullYear(now.getFullYear() + 10)
          return now
        }
      },
      use12Hours: {
        type: Boolean,
        default: true
      },
      minuteStep: {
        type: Number,
        default: 1
      },
      showUnit: {
        type: Boolean,
        default: true
      }
    },

    data (){
      return {
        slots: []
      }
    },

    created () {
      this.event = {
        beforeEnter: () => {
          var $el = this.$el;

          $el.classList.add('inital');
          requestAnimationFrame(function(){
            setTimeout(()=>{//给50ms来处理dom的一些设置
              $el.classList.remove('inital');
              $el.classList.add('inAnimation');

              this.onOpen instanceof Function && this.onOpen();
            }, 50)
          }.bind(this))
        },
        beforeLeave: () => {
          var $el = this.$el;
          $el.classList.add('outAnimation');
          requestAnimationFrame(function(){
            $el.classList.remove('inAnimation');

            this.onClose instanceof Function && this.onClose();
          }.bind(this))
        }
      }

      var i, minYear, maxYear, slots = [], tmp, end, start,
        now = new Date();

      //这里就是根据mode,生成slots
      if(this.mode.indexOf('date') !== -1){
        minYear = this.minDate.getFullYear()
        maxYear = this.maxDate.getFullYear()
        //年
        tmp = {
          values: [],
          defaultIndex: now.getFullYear() - minYear
        }
        for(i = minYear; i <= maxYear; i++)
          tmp.values.push(this.showUnit? i+'年' : i)
        slots.push(tmp)
        //月
        tmp = {
          values: [],
          defaultIndex: now.getMonth()
        }
        for(i = 1; i <= 12 ; i++)
          tmp.values.push(this.showUnit? fixZero(i)+'月' : fixZero(i))
        slots.push(tmp)
        //日
        tmp = {
          values: [],
          defaultIndex: now.getFullYear() - minYear
        }
        tmp.values = this._getMonthDays(now.getFullYear(), now.getMonth()+1)
        slots.push(tmp)
      }

      if(this.mode.indexOf('time') !== -1){
        //小时
        end = this.use12Hours === true ? 12: 23
        start = this.use12Hours === true ? 1: 0
        tmp = {
          values: [],
          defaultIndex: 7
        }
        for(i = start; i <= end; i++)
          tmp.values.push(this.showUnit? fixZero(i)+'时': fixZero(i))
        slots.push(tmp)
        //分钟
        tmp = {
          values: [],
          defaultIndex: 0
        }
        for(i = 0; i <= 59 ; i++)
          tmp.values.push(this.showUnit? fixZero(i)+'分': fixZero(i))
        slots.push(tmp)

        if(this.use12Hours === true)
          slots.push({
            values: [
              '上午',
              '下午'
            ],
            defaultIndex: 0
          })
      }

      

      this.slots = slots
    },

    methods: {
      _cancel (e){
        this.onCancel instanceof Function && this.onCancel(this.$refs.picker)
        this._controller.close()
      },

      _confirm (e){
        this.onConfirm instanceof Function && this.onConfirm(this.$refs.picker)
        this._controller.close()
      },

      _onChange (picker, val){
        if(this.mode === 'date' || this.mode === 'datetime'){
          picker.setSlotValues(1, this._getMonths(val[0]))
          picker.setSlotValues(2, this._getMonthDays(val[0], val[1]))
        }
        this.onChange(picker, val)
      },

      _getMonthDays (year, month){
        year = parseInt(year, 10)
        month = parseInt(month, 10)

        var i = 1, total = countDays(year, month),
          days = [];

        if(this.minDate.getFullYear() === year && this.minDate.getMonth()+1 === month){
          i = this.minDate.getDate()
        }else if(this.maxDate.getFullYear() === year && this.maxDate.getMonth()+1 === month){
          total = this.maxDate.getDate()
        }

        for(i; i <= total; i++){
          days.push(this.showUnit? fixZero(i)+'日': fixZero(i))
        }
        return days
      },

      _getMonths (year){
        year = parseInt(year, 10)

        var i = 1, total = 12,
          months = [];

        if(this.minDate.getFullYear() === year){
          i = this.minDate.getMonth()+1
        }else if(this.maxDate.getFullYear() === year ){
          total = this.maxDate.getMonth()+1
        }

        for(i; i <= total; i++){
          months.push(this.showUnit? fixZero(i)+'月': fixZero(i))
        }
        return months
      }
    }
  }
</script>

<style scoped lang="scss">
  .weui-picker{
    will-change: opacity, transform;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: auto;
    transition: all 250ms ease 0s;

    &.inital {
      opacity: 0.3;
      transform: translateY(100%) translateZ(0);
    }

    &.inAnimation {
      opacity: 1;
      transform: translateY(0%) translateZ(0);
    }

    &.outAnimation {
      opacity: 0;
      transform: translateY(100%) translateZ(0);
      transition-duration: 280ms;
    }
  }

  .weui-picker__action.noExpand{
    flex: 0 0 auto;
    padding: 0 5px;
    transition: all 40ms linear 0ms;

    &:active {
      background: #ececec;
    }
  }
</style>
