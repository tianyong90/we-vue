<template>
  <div class="calendar-picker" @click="_click">
    <wv-calendar ref="calendar"></wv-calendar>
  </div>
</template>

<script>
  import WvCalendar from './calendar.vue'
  import { countDays, offsetMonth, monthsBetween } from '../../custom/utils'

  export default {
    name: 'wv-calendar-picker',

    components: {
      WvCalendar
    },

    /** {Event}
     * @function{onSelectHasDisableDate}
     * @function{onSelect}
     */

    props: {
      type: {
        type: String,
        default: 'range'
      }
    },

    data (){
      return {
        selectedOne: null,
        selectedTwo: null,
        selectedStart: null,
        selectedEnd: null,
        clickedCount: 0
      }
    },

    methods: {
      //公共方法
      clearSelection (check=true){
        this.$refs.calendar.clearSelection()

        if(check){
          this.selectedOne = null
          this.clickedCount = 0
          this._emitDone()
        }
      },

      select(range){
        var date = new Date(),
          endY = date.getFullYear(),
          endM = date.getMonth(),
          endD = date.getDate(),
          startY, startM, startD;

        if(range === 'today'){
          startY = endY
          startM = endM
          startD = endD
        }else if(range === 'yesterday'){
          date.setDate(date.getDate() - 1)
          startY = endY = date.getFullYear()
          startM = endM = date.getMonth()
          startD = endD = date.getDate()
        }else if(range === 'tomorrow'){
          date.setDate(date.getDate() + 1)
          startY = endY = date.getFullYear()
          startM = endM = date.getMonth()
          startD = endD = date.getDate()
        }else if(range === 'lastWeek'){
          date.setDate(date.getDate() - 6)
          startY = date.getFullYear()
          startM = date.getMonth()
          startD = date.getDate()
        }else if(range === 'lastMonth'){
          date.setDate(date.getDate() - 29)
          startY = date.getFullYear()
          startM = date.getMonth()
          startD = date.getDate()
        }else if(range instanceof Object){
          var {startY, startM, startD, endY, endM, endD} = range; //感觉解构有问题啊...
          startM--
          endM--
          // 格式还是从1还是算
        }
        this.clearSelection()
        this._select(startY, startM+1, startD, endY, endM+1, endD);
      },

      //私有方法
      _click (e) {
        if(e.carrier){
          if(this.type === 'range'){
            if(this.clickedCount === 0){
              this.selectedOne = e.carrier
              this.selectedTwo = null
              this._selectedOne()
            }
            
            if(this.clickedCount === 1)
              this.selectedTwo = e.carrier

            this.clickedCount++
            if(this.clickedCount > 1){
              this.clickedCount = 0
              this._selectedTwo()
            }
          }else if(this.type === 'point'){
            this.selectedOne = e.carrier
            this._selectedOne()
          }
        }
      },

      _toTime (time){
        return +new Date(`${time.year}-${time.month}-${time.day}`).getTime()
      },

      _setRange (start, end){
        //需要算出所涉及的月份
        var monthsInvolved = 0, i,
          getVmMonth = this.$refs.calendar.getMonthByOffset,
          vm_month0 = getVmMonth(0),
          startOffset, git = [], hashDisableOnSelect, disableDaySelected;

        monthsInvolved = monthsBetween(
          end.year, end.month,
          start.year, start.month
        ) + 1

        
        //转发给对应的vm_month
        startOffset = monthsBetween(
          start.year, start.month,
          vm_month0.year, vm_month0.month
        )

        for(i = 0; i < monthsInvolved; i++){
          git.push(getVmMonth(startOffset++).setRange(start, end))
        }

        //在这里检查是否有disable的情况咯
        hashDisableOnSelect = false
        disableDaySelected = []
        git.forEach( result =>{
          if(result.hashDisableDay === true){
            hashDisableOnSelect = true
            disableDaySelected.push.apply(disableDaySelected, result.disableDaySelected)
          }
        })

        if(hashDisableOnSelect === false){
          git.forEach( result =>{
            result.commit()
          })
          this._emitDone(start, end)
        }else{
          this.clearSelection()
          this.$emit('onSelectHasDisableDate', disableDaySelected)
        }
      },

      _selectedTwo (){
        var start = {
              year: this.selectedOne.vm_month.year,
              month: this.selectedOne.vm_month.month,
              day: this.selectedOne.vm_day.day,
              vms: this.selectedOne
            },
            end = {
              year: this.selectedTwo.vm_month.year,
              month: this.selectedTwo.vm_month.month,
              day: this.selectedTwo.vm_day.day,
              vms: this.selectedTwo
            },
            tmp, 
            startTime = this._toTime(start), 
            endTime = this._toTime(end);

        if(startTime > endTime){
          tmp = start
          start = end
          end = tmp
          tmp = null
        }

        this._setRange(start, end)
      },

      _selectedOne (){
        var val = this.selectedOne

        this.clearSelection(false)
        if(val){
          val.vm_month.getDay(val.vm_day.day).status = 
             this.type === 'range' ? 'selected-start' : 'selected-left-right'
          
          this._emitDone()
        }
      },

      _emitDone (start, end){
        if(this.type === 'point'){
          this.selectedStart = null
          
          if(this.selectedOne)
          this.selectedStart = {
            year: this.selectedOne.vm_month.year,
            month: this.selectedOne.vm_month.month,
            day: this.selectedOne.vm_day.day
          }
          this.$emit('onSelect', this.selectedStart)
        }else if(this.type === 'range'){
          this.selectedStart = null

          if(this.selectedOne)
          this.selectedStart = {
            year: this.selectedOne.vm_month.year,
            month: this.selectedOne.vm_month.month,
            day: this.selectedOne.vm_day.day
          }

          this.selectedEnd = null
          if(start)
          this.selectedStart = {
            year: start.year,
            month: start.month,
            day: start.day
          }

          if(end)
          this.selectedEnd = {
            year: end.year,
            month: end.month,
            day: end.day
          }
          this.$emit('onSelect', this.selectedStart, this.selectedEnd)
        }
      },

      _select(startY, startM, startD, endY, endM, endD, oldScrollHeight, oldScrollTop){
        var vm_calendar = this.$refs.calendar,
          $wrapper = vm_calendar.$refs.pullDownRefresh.getScrollContainer(),
          newScrollHeight, newScrollTop, arguments_;
        //检查月份是否加载
        if(monthsBetween(startY, startM, vm_calendar.currentMinY, vm_calendar.currentMinM) < 0){
          vm_calendar._loadMorePrev(()=>{});
          // 保存滚动状态
          if($wrapper.scrollTop === 0)
            $wrapper.scrollTop = 1
          this.$nextTick(()=>{
            this._select.apply(this, arguments)
          })
          return
        }

        var vm_month_start = this.$refs.calendar.getMonth(startY, startM),
          vm_month_end = this.$refs.calendar.getMonth(endY, endM),
          vm_day_start = vm_month_start.getVmDay(startD),
          vm_day_end = vm_month_end.getVmDay(endD);

        this.selectedOne = {
          vm_month: vm_month_start,
          vm_day: vm_day_start
        }

        if(this.type === 'range'){
          this.selectedTwo = {
            vm_month: vm_month_end,
            vm_day: vm_day_end
          }
          this._selectedTwo()
        }else if(this.type === 'point'){
          this._selectedOne()
        }
      }
    },

    watch: {
      
    }
  }
</script>

<style lang="scss" scoped>
  
</style>

