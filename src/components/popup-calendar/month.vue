<template>
  <div class="month">
    <div class="month-title">2017年10月</div>
    <div class="days-wrapper">
      <wv-day-row @rowClick="_monthClick"></wv-day-row>
      <wv-day-row @rowClick="_monthClick"></wv-day-row>
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
        // required: true
      },
      year: {
        type: Number
      }
    },

    methods: {
      _monthClick (day) {
        this.$emit('monthClick', this.year, this.month, day)
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
