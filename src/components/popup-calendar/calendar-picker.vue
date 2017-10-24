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

    mounted (){
      setTimeout(()=>{
        this.$refs.calendar.disableDay(2017,10,24)
      },2000)
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
          }
        }
      },

      _toTime (time){
        return +new Date(`${time.year}-${time.month}-${time.day}`).getTime()
      },

      _setRange (start, end){
        //需要算出所涉及的月份
        var monthsInvolved = 0, i,
          vm_months = this.$refs.calendar.$refs.$months,
          startOffset, git = [], hashDisableOnSelect, disableDaySelected;

        monthsInvolved = monthsBetween(
          end.year, end.month,
          start.year, start.month
        ) + 1
        
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
      }
    },

    watch: {
      
    }
  }
</script>

<style lang="scss" scoped>

</style>

