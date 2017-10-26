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
      <wv-pull-down-refresh 
        @onLoad="_loadMorePrev" 
        @onScrollLoad="_loadMoreNext"
        :showMsgIcon="false" 
        :maxDragOffset="80" 
        :customMsg="pullDownMsg"
        :triggerScrollLoadOffset="300"
        class="pull-down-refresh"
        ref="pullDownRefresh"
      >
        <div class="wrapper" ref="wrapper">
          <wv-month 
            v-for="(month, $index) in months"
            :key="$index"
            :year="month.Y" 
            :month="month.M"
            :dayRules="month.R"
          ></wv-month>
        </div>
      </wv-pull-down-refresh>
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
      initDay: Number,
      isLargeRowledge: Boolean
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
        rules: {},
        pullDownMsg: [
          {
            text: '加载上个月',
            color: '#bbb'
          },{
            text: '加载上个月',
            color: '#bbb'
          },{
            text: '正在刷新',
            color: ''
          },{
            text: '~OK~',
            color: '#88b786'
          },{
            text: '加载失败',
            color: ''
          },{
            text: '~不给~',
            color: '#bbb'
          }
        ],
      }
    },

    created (){
      var months = {},
        date = new Date(),
        i, tmpY, tmpM, tmpD; 

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
        this.$set(this.months, tmpY*12 + tmpM ,{
          Y: tmpY,
          M: tmpM
        })
        this.currentMaxY = tmpY
        this.currentMaxM = tmpM
      }

      this.currentMinY = this.year
      this.currentMinM = this.month
      this.minMonthDayRules = {}
      this.maxMonthDayRules = {}

      //生成最后最前面的一些不可用的日子
      tmpD = Math.min(countDays(this.minYear, this.minMonth), this.day)
      for(i = 1 ; i <= tmpD; i++){
        this.minMonthDayRules[i] = {
          isUnavailable: true
        }
      }

      tmpD = countDays(this.maxYear, this.maxMonth)
      if(tmpD > this.day){
        for(i = this.day + 1; i <= tmpD; i++){
          this.maxMonthDayRules[i] = {
            isUnavailable: true
          }
        }
      }
    },

    methods: {
      clearSelection (){
        this.getVmMonths().forEach( vm_month => {
          vm_month.clearSelection()
        })
      },

      getMonth (year, month){
        var vm_monthFirst = this.getMonthByOffset(0),
          offset = monthsBetween(
            year, month,
            vm_monthFirst.year, vm_monthFirst.month
          );
        
        return this.getMonthByOffset(offset)
      },

      getMonthByOffset (offset){
        return this.$refs.wrapper.children[offset].__vue__
      },

      getVmMonths (){
        var $wrapper = this.$refs.wrapper;
        var vm_months = [];

        Array.prototype.forEach.call($wrapper.children  , (ele)=>{
          vm_months.push(ele.__vue__)
        })
        
        return vm_months
      },

      disableDay (year, month, day){
        this._setDayProps(year, month, day, 'isDisable', true)
      },

      enableDay (year, month, day){
        this._setDayProps(year, month, day, 'isDisable', false)
      },

      availableDay (year, month, day){
        this._setDayProps(year, month, day, 'isUnavailable', false)
      },

      unavailableDay (year, month, day){
        this._setDayProps(year, month, day, 'isUnavailable', true)
      },

      //私有方法
      _loadMorePrev(success, error, noMore, noMoreTry){
        var next;
        
        if(
          this.currentMinY !== this.minYear || 
          this.currentMinM !== this.minMonth
        ){
          next = offsetMonth(this.currentMinY, this.currentMinM, -1)

          if(next[0] === this.minYear && next[1] === this.minMonth)
            this.$set(this.months, next[0]*12 + next[1] ,{
              Y: next[0],
              M: next[1],
              R: this.minMonthDayRules
            })
          else
            this.$set(this.months, next[0]*12 + next[1] ,{
              Y: next[0],
              M: next[1]
            })
          
          this.currentMinY = next[0]
          this.currentMinM = next[1]
          success()
        }else{
          noMoreTry()
          noMore()
        }
      },

      _loadMoreNext(noMoreTry){
        var next;
        
        if(
          this.currentMaxY !== this.maxYear || 
          this.currentMaxM !== this.maxMonth
        ){
          next = offsetMonth(this.currentMaxY, this.currentMaxM, 1)
          
          if(next[0] === this.maxYear && next[1] === this.maxMonth)
            this.$set(this.months, next[0]*12 + next[1] ,{
              Y: next[0],
              M: next[1],
              R: this.maxMonthDayRules
            })
          else
            this.$set(this.months, next[0]*12 + next[1] ,{
              Y: next[0],
              M: next[1]
            })
            
          this.currentMaxY = next[0]
          this.currentMaxM = next[1]
        }else{
          noMoreTry()
        }
      },

      _setDayProps(year, month, day ,name, val){
        var vm_month = this.getMonth(year, month);
          day = vm_month.getDay(day)

        this.$set(day, name, val)
        this.$parent && this.$parent.clearSelection()
        day = null
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
    background-color: #eee;
  }
</style>
