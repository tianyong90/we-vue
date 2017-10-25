<template>
  <div class="day-row">
    <wv-day-cell v-for="(day, $index ) in days" 
    :key="$index"
    :day="day.day" 
    :status="day.status" 
    :isPlaceholder="day.isPlaceholder"
    :isDisable="day.isDisable"
    :isUnavailable="day.isUnavailable"
    :class="_checkGrey($index)"
    ref="$days"
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
      _checkGrey (i){
        if(i === 0 || i === 6)
          return 'grey'
        
        return ''
      },

      setRange (config){
        var startAdjusted, endAdjusted;

        if(config.whichRow === 0 ){
          startAdjusted = config.startPlaceholders
          startAdjusted = Math.max(startAdjusted, config.rangeStart)
        }else{
          startAdjusted = config.rangeStart
        }

        if(config.whichRow === config.rowsLen-1){
          endAdjusted = 7 - config.endPlaceholders -1 
          endAdjusted = Math.min(endAdjusted, config.rangeEnd)
        }else{
          endAdjusted = config.rangeEnd
        }

        for(var i = startAdjusted + 1; i < endAdjusted; i++){
          config.row[i].status = 'selected-full'
        }
        
        config.row[startAdjusted].status = 'selected-right'
        config.row[endAdjusted].status = 'selected-left'


        function setStart (){
          //设置设置开始的点
          if(config.startOffset[0] === config.whichRow){
            if(
              config.startOffset[1] === 6 || (
                config.whichRow === config.rowsLen-1 &&
                config.startOffset[1] ===  7 - config.endPlaceholders -1 
              )
            ){
              config.row[startAdjusted].status = 'selected-start'
            }else{
              config.row[startAdjusted].status = 'selected-start-right'
            }
          }
        }

        function setEnd (){
          //设置设置结束的点
          if(config.endOffset[0] === config.whichRow){
            if(
              config.endOffset[1] === 0 || (
                config.whichRow === 0 &&
                config.endOffset[1] === config.startPlaceholders
              )
            ){
              config.row[endAdjusted].status = 'selected-end'
            }else{
              config.row[endAdjusted].status = 'selected-end-left'
            }
          }
        }

        function setStartEnd (){
          //是否同一个点
          if(
            config.startOffset[0] === config.endOffset[0] &&
            config.startOffset[1] === config.endOffset[1] 
          ){
            config.row[endAdjusted].status = 'selected-start-end'
          }
        }

        if(config.hasStartOrEnd === 'both'){
          setStart()
          setEnd()
          setStartEnd()
        }else if(config.hasStartOrEnd === 'start'){
          setStart()
           //末行首
          if( config.whichRow === config.rowsLen-1 && endAdjusted === 0 ){
            config.row[endAdjusted].status = 'selected-left-right'
          }
        }else if(config.hasStartOrEnd === 'end'){
          setEnd()
          //首行末
          if( config.whichRow === 0 && startAdjusted === 6 ){
            config.row[startAdjusted].status = 'selected-left-right'
          }
        }else{
          //首行末
          if( config.whichRow === 0 && startAdjusted === 6 ){
            config.row[startAdjusted].status = 'selected-left-right'
          }
          //末行首
          if( config.whichRow === config.rowsLen-1 && endAdjusted === 0 ){
            config.row[endAdjusted].status = 'selected-left-right'
          }
        }
      },

      getVmDay(offset){
        return this.$refs.$days[offset]
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
