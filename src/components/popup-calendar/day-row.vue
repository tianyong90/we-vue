<template>
  <div class="day-row">
    <wv-day-cell :day="day" status="selected-right" :isPlaceholder="isPlaceholder"></wv-day-cell>
    <wv-day-cell :day="2" status="selected-full"></wv-day-cell>
    <wv-day-cell :day="3" status="selected-left"></wv-day-cell>
    <wv-day-cell :day="4"></wv-day-cell>
    <wv-day-cell :day="5"></wv-day-cell>
    <wv-day-cell :day="6"></wv-day-cell>
    <wv-day-cell :day="7" :isDisable="true"></wv-day-cell>
  </div>
</template>

<script>
  import WvDayCell from './day-cell.vue'

  export default {
    name: 'wv-day-row',

    components: {
      WvDayCell
    },

    props: {
      days: {
        type: Array
      }
    },

    data (){
      return {
        day: null,
        isPlaceholder: true
      }
    },

    mounted (){
      
    },

    methods: {
      _rowClick (day) {
        this.$emit('rowClick', day)
      }
    }
  }
</script>

<style scoped lang="scss">
  .day-row{
    display: flex;
  }

  .day-row+.day-row{
    margin-top: 6px;
  }
</style>
