<template>
  <div class="month">
    <div class="month-title">2017年10月</div>
    <div class="days-wrapper" @click="_click">
      <wv-day-row></wv-day-row>
      <wv-day-row></wv-day-row>
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
        type: Number
      }
    },

    data (){
      return {
        rows: []
      }
    },

    created () {
      for(var i = 1 ; i <= 12; i++)
        console.log(this._countDays(2017,i))
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
