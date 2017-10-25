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
      <wv-month 
        v-for="(month, $index) in months"
        :key="$index"
        ref="$months"
        :year="month.Y" 
        :month="month.M"
      ></wv-month>
    </div>
  </div>
</template>

<script>
  import WvMonth from './month.vue'
  import { countDays, offsetMonth, monthsBetween } from '../../custom/utils'

  export default {
    name: 'wv-calendar',
    
    components: {
      WvMonth
    },

    props: {
      initYear: Number,
      inilMonth: Number,
      initDay: Number
    },

    data (){
      return {
        month: null,
        year: null,
        day: null,
        minYear: null,
        minMonth: null,
        maxYear: null,
        maxMonth: null,
        months: {},
        rules: {}
      }
    },

    created (){
      var months = {},
        date = new Date(),
        i, tmpY, tmpM; 

      this.year = this.initYear ? this.initYear : date.getFullYear()
      this.month = this.inilMonth ? this.inilMonth : date.getMonth()+1
      this.day = this.initDay ? this.initDay : date.getDate()

      if(this.year < 1000 || this.year > 9999){
        console.log('popup-calendar的年份输入错误~')
        return
      }

      //初始化需要显示的月份,现在一次性显示就好了,现在感觉任何停顿的状态都是需要一个变量去映射状态的

      //min是是前两个月,还有一些值的问题
      //解构连续行的话,需要加分号,这坑死人啊~
      [this.minYear, this.minMonth] = offsetMonth(this.year, this.month, -2);
      [this.maxYear, this.maxMonth] = offsetMonth(this.year, this.month, 12)

      //默认显示5个月,从initMonth开始
      for(i = 0; i < 5; i++){
        [tmpY, tmpM] = offsetMonth(this.year, this.month, i)
        this.months[tmpY*12+tmpM] = {
          M: tmpM,
          Y: tmpY
        }
      }

      setTimeout(()=>{
        tmpY = 2018
        tmpM = 10
        this.$set(this.months, tmpY*12+tmpM, {
          M: tmpM,
          Y: tmpY
        })
      },2000)
    },

    methods: {
      clearSelection (){
        this.$refs.$months.forEach( vm_month => {
          vm_month.clearSelection()
        })
      },

      getMonth (year, month){
        var vm_months = this.$refs.$months,
          offset = monthsBetween(
            year, month,
            vm_months[0].year, vm_months[0].month
          );
        
        return vm_months[offset]
      },

      disableDay (year, month, day){
        //获取,那个vm_month,然后设置就好了
        var vm_month = this.getMonth(year, month);
          day = vm_month.getDay(day)
        
        this.$set(day, 'isDisable', true)
        this.$parent && this.$parent.clearSelection()
      },

      enableDay (year, month, day){
        var vm_month = this.getMonth(year, month);
          day = vm_month.getDay(day)

        this.$set(day, 'isDisable', false)
        this.$parent && this.$parent.clearSelection()
      }
    }

  }
</script>

<style scoped lang="scss">
  .week-indicator {
    width: 100%;
    display: flex;
    flex-shrink: 0;
  }

  .week-indicator-item {
    flex: auto;
    text-align: center;
    border-bottom: 1px solid #ddd; 

    &.grey{
      color: #bbb;
    }
  }

  .calendar{
    display: flex;
    overflow-y: auto;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    width: 100%;
  }
  
  .months-warpper{
    flex: auto;
    display: flex;
    flex-direction: column;
    -webkit-box-direction: normal;
    -webkit-box-orient: vertical;
    overflow-y: auto;
  }
</style>
