<template>
  <div class="calendar">
    <div class="week-indicator">
      <div class="week-indicator-item grey">日</div>
      <div class="week-indicator-item">一</div>
      <div class="week-indicator-item">二</div>
      <div class="week-indicator-item">三</div>
      <div class="week-indicator-item">四</div>
      <div class="week-indicator-item">五</div>
      <div class="week-indicator-item grey">六</div>
    </div>
    <div class="months-warpper">
      <wv-month @monthClick="_click" :year="2017" :month="10"></wv-month>
    </div>
  </div>
</template>

<script>
  import WvMonth from './month.vue'

  export default {
    name: 'wv-calendar',
    
    components: {
      WvMonth
    },

    methods: {
      _click (year, month, day){
        console.log(year, month, day)
      }
    }
  }
</script>

<style scoped lang="scss">
  .week-indicator {
    width: 100%;
    display: flex;
  }

  .week-indicator-item {
    flex: auto;
    text-align: center;
    border-bottom: 1px solid #ddd; 

    &.grey{
      color: #bbb;
    }
  }
</style>
