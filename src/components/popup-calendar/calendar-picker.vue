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

    data (){
      return {
        selectedOne: null,
        selectedTwo: null,
        clickedCount: 0
      }
    },

    methods: {
      //公共方法
      clearSelection (){
        this.$refs.calendar.clearSelection()
      },

      //私有方法
      _click (e) {
        if(e.carrier){
          if(this.clickedCount === 0){
            this.selectedOne = e.carrier
            this.selectedTwo = null
          }
          
          if(this.clickedCount === 1)
            this.selectedTwo = e.carrier

          this.clickedCount++
          if(this.clickedCount > 1){
            this.clickedCount = 0
            this._selectedTwo()
          }
        }
      },

      _toTime (time){
        return +new Date(`${time.year}-${time.month}-${time.day}`).getTime()
      },

      _setRange (start, end){
        //需要算出所涉及的月份
        var monthsInvolved = 0, i = 0, next,
          vm_months = this.$refs.calendar.$refs.$months,
          startOffset, git = [], hashDisableOnSelect, disableDaySelected;

        next = offsetMonth(start.year, start.month, i++)
        while(next[0] <= end.year && next[1] <= end.month){
          monthsInvolved++
          next = offsetMonth(start.year, start.month, i++)
        }
        
        //转发给对应的vm_month
        startOffset = monthsBetween(
          start.year, start.month,
          vm_months[0].year, vm_months[0].month
        )

        for(i = 0; i < monthsInvolved; i++){
          git.push(vm_months[startOffset++].setRange(start, end))
        }

        //在这里检查是否有disable的情况咯
        hashDisableOnSelect = false
        disableDaySelected = []
        git.forEach( result =>{
          if(result.hashDisableOnSelect === true){
            hashDisableOnSelect = true
            disableDaySelected.push.apply(null, result.disableDaySelected)
          }
        })

        if(hashDisableOnSelect === false){
          git.forEach( result =>{
            result.commit()
          })
        }
        //清除引用
        next = null
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
      }
    },

    watch: {
      selectedOne (val, oldVal){
        if(oldVal)
          this.clearSelection()
        if(val)
        val.vm_month.getDay(val.vm_day.day).status = 'selected-start'
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>

