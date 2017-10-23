<template>
  <div class="month">
    <div class="month-title">2017年10月</div>
    <div class="days-wrapper" @click="_click">
      <wv-day-row v-for="(row, $index) in dayRows" :key="$index" :days="row"></wv-day-row>
    </div>
  </div>
</template>

<script>
  import WvDayRow from './day-row.vue'

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
      dayRules: Array
    },

    data (){
      return {
        dayRows: []
      }
    },

    created () {
      var days = this._countDays(this.year, this.month),
        startPlaceholders, endPlaceholders, rows,
        i, j, i_day = 1, dayRows;

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
            (i === rows-1 && j > 7-endPlaceholders)
          ){
            dayRow.push({
              isPlaceholder: true
            })
          }else{
            dayRow.push({
              day: i_day,
              status: ''
            })
            i_day++
          }
        }
        dayRows.push(dayRow)
      }

      this.dayRows = dayRows
    },

    methods: {
      _click (e) {
        if(e.carrier)
          e.carrier.vm_month = this
      },

      _countDays (year, month){
        var date;//下个月的年月

        month--; //月份从0开始算,上面就是从1开始算

        if(month === 11){
          month = 0
          year++
        }else
          month++

        date = new Date(year, month)
        date.setTime(date.getTime() - 100)
        return date.getDate()
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
  }

  .month-title{
    padding: 21px 0 6px 15px;
    font-size: 16px;
  }
</style>
