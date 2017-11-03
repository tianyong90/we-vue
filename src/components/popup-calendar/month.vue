<template>
  <div class="month">
    <div class="month-title">{{year}}年{{month}}月</div>
    <div class="days-wrapper" @click="_click">
      <wv-day-row 
        v-for="(row, $index) in dayRows"
        :key="$index" 
        :days="row"
        ref="$rows"
      ></wv-day-row>
    </div>
  </div>
</template>

<script>
  import WvDayRow from './day-row.vue'
  import { countDays } from '../../custom/utils'

  export default {
    name: 'wv-month',
    
    components: {
      WvDayRow
    },

    props: {
      month: {
        type: Number,
        required: true
      },
      year: {
        type: Number,
        required: true
      },
      dayRules: Object
    },

    data (){
      return {
        dayRows: []
      }
    },

    created () {
      var days = countDays(this.year, this.month),
        startPlaceholders, endPlaceholders, rows,
        i, j, i_day = 0, dayRows;

      startPlaceholders = +new Date( this.year, this.month-1 ).getDay()
      rows = Math.ceil( (days + startPlaceholders) / 7 )
      endPlaceholders = rows*7 - days - startPlaceholders

      //生成dayRows
      dayRows = []
      for(i = 0 ; i < rows; i ++){
        var dayRow = []

        for(j = 0; j < 7; j++){
          if( 
            (i === 0 && j < startPlaceholders) || 
            (i === rows-1 && j >= 7-endPlaceholders)
          ){
            dayRow.push({
              isPlaceholder: true
            })
          }else{
            i_day++
            dayRow.push(Object.assign({
              day: i_day,
              status: ''
            }, this.dayRules ? this.dayRules[i_day] : {}))
          }
        }
        dayRows.push(dayRow)
      }

      this.dayRows = dayRows
      this.startPlaceholders = startPlaceholders
      this.endPlaceholders = endPlaceholders
      this.rowsLen = rows.length
    },

    methods: {
      _click (e) {
        if(e.carrier)
          e.carrier.vm_month = this
      },

      getDay (day) {
        var [row, offset] = this.getDayOffset(day)

        return this.dayRows[row][offset]
      },

      getVmDay (day) {
        var [row, offset] = this.getDayOffset(day)

        return this.$refs.$rows[row].getVmDay(offset)
      },

      getDayOffset (day){
        var row, offset
        row = Math.ceil( (this.startPlaceholders + day) / 7)
        offset = (this.startPlaceholders + day) % 7
        if(offset === 0) offset = 7

        return [row-1, offset-1]
      },

      setRange (start, end){
        //在分发到row里面咯~
        //算出所涉及的row,然后继续分发
        var startInThis = 
          start.year === this.year && start.month === this.month;
        var endInThis = 
          end.year === this.year && end.month === this.month;

        var endOffset = 0, startOffset, 
          rowsInvoled = [],
          vm_rows = this.$refs.$rows,
          i, j, disableDaySelected, hasStartOrEnd;

        //生成所涉及的行
        if(startInThis && endInThis){
          //开始结束都在这个月
          startOffset = this.getDayOffset(start.day)
          endOffset = this.getDayOffset(end.day)
          hasStartOrEnd = 'both'
        }else if(startInThis){
          //开始在这个月,结束不再
          startOffset = this.getDayOffset(start.day)
          endOffset = [vm_rows.length-1, 6]
          hasStartOrEnd = 'start'
        }else if(endInThis){
          //结束在这个月,开始不在
          startOffset = [0, 0]
          endOffset = this.getDayOffset(end.day)
          hasStartOrEnd = 'end'
        }else{
          //这个月全选
          startOffset = [0, 0]
          endOffset = [vm_rows.length-1, 6]
          hasStartOrEnd = undefined
        }

        for(var i = startOffset[0]; i <= endOffset[0]; i++ ){
          rowsInvoled.push({
            row: this.dayRows[i],
            vm_row: vm_rows[i],
            rowsLen: vm_rows.length,
            whichRow: i,
            hasStartOrEnd: hasStartOrEnd,
            startPlaceholders: this.startPlaceholders,
            endPlaceholders: this.endPlaceholders,
            startOffset: startOffset,
            endOffset: endOffset,
            rangeStart: i === startOffset[0] ? startOffset[1] : 0,
            rangeEnd: i === endOffset[0] ? endOffset[1] : 6
          })
        }

        //分发,但是感觉有点奇怪啊,这样直接执行的话,是不行的哦,在转发之前判断吧
        //我是需要检查这个dayRules
        disableDaySelected = []
        //检查第一行
        if(startOffset[0] === endOffset[0]){
          //同一行
          for(j = startOffset[1]; j <= endOffset[1]; j++){
            if(this.dayRows[startOffset[0]][j].isDisable)
              disableDaySelected.push(this.dayRows[i][j])
          }
        }else{
          //检查第一行开始到末尾
          for(j = startOffset[1]; j <= 6; j++){
            if(this.dayRows[startOffset[0]][j].isDisable)
              disableDaySelected.push(this.dayRows[startOffset[0]][j])
          }
          //检查最后一行开始到末尾
          for(j = 0; j <= endOffset[1]; j++){
            if(this.dayRows[endOffset[0]][j].isDisable)
              disableDaySelected.push(this.dayRows[endOffset[0]][j])
          }
        }
        
        for(i = startOffset[0] + 1; i <= endOffset[0] - 1; i++){
          for(j = 0; j < 7; j++){
            if(this.dayRows[i][j].isDisable)
              disableDaySelected.push(this.dayRows[i][j])
          }
        }

        return {
          hashDisableDay: disableDaySelected.length !== 0,
          disableDaySelected: disableDaySelected,
          commit: () => {
            rowsInvoled.forEach( config => {
              config.vm_row.setRange(config)
            })
          }
        }
      },

      clearSelection (){
        this.dayRows.forEach( row => {
          row.forEach( day => {
            day.status = undefined
          })
        })
      }
    }
  }
</script>

<style scoped>
  .months-warpper{
    width: 100%;
  }

  .month {
    width: 100%;
    background: white;
  }

  .month-title{
    padding: 21px 0 6px 15px;
    font-size: 16px;
  }
</style>
