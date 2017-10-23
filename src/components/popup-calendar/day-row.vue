<template>
  <div class="day-row">
    <wv-day-cell v-for="(day, $index ) in days" 
    :key="$index"
    :day="day.day" 
    :status="day.status" 
    :isPlaceholder="day.isPlaceholder"
    :class="_checkGrey($index)"
  ></wv-day-cell>
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
      },

      _checkGrey (i){
        if(i === 0 || i === 6)
          return 'grey'
        
        return ''
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
