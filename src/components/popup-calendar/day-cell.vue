<template>
  <div class="day-cell" :data-status="_check(status)" @click="_click">
    <div class="day-number-wrapper">
      <div class="day-number-left"></div>
      <div class="day-number">{{ _checkDay(day) }}</div>
      <div class="day-number-right"></div>
    </div>
    <div class="day-description">{{ _checkDescription(status) }}</div>
  </div>
</template>

<script>
  export default {
    name: 'wv-day-cell',

    model:{
      status
    },

    props: {
      status: String,
      day: Number,
      isPlaceholder: {
        type: Boolean,
        default: false
      },
      isDisable: {
        type: Boolean,
        default: false
      },
    },
    
    data (){
      return {
        
      }
    },

    mounted (){
      
    },

    methods: {
      _check (val){
        if(this.isPlaceholder)
          return ''

        if(this.isDisable)
          return 'disabled'

        return val
      },

      _checkDescription(val){
        if(this.isPlaceholder)
          return ''
        
        if(this.isDisable)
          return 'disable'

        if(val === 'selected-left')
          return '止'
        if(val === 'selected-right')
          return '起'
      },

      _checkDay (val){
        if(this.isPlaceholder)
          return ''

        return val
      },

      _click(e){
        if(this.isPlaceholder === false && this.isDisable === false)
          this.$emit('dayClick', this.day)
        console.log(this)
      }
    },

    filters: {
      statusDescriptionFilter (val) {
        switch (val){
          case 'selected-left':
            return '起'
          case 'selected-right':
            return '止'
        }
      }
    },

    watch: {
      status (val) {
        
      }
    }
  }
</script>

<style scoped lang="scss">
  .day-cell{
    flex: auto;
    text-align: center;
    color: black;

    &[data-status|="selected"]{
      color: #1AAD19;
      & .day-number {
        color: white;
        background-color: #1AAD19;
      }
    }

    &[data-status="selected-right"]{
      & .day-number {
        border-top-left-radius: 100%;
        border-bottom-left-radius: 100%;
      }

      & .day-number-right {
        background-color: #1AAD19;
      }
    }

    &[data-status="selected-left"]{
      & .day-number {
        border-top-right-radius: 100%;
        border-bottom-right-radius: 100%;
      }

      & .day-number-left {
        background-color: #1AAD19;
      }
    }

    &[data-status="selected-full"]{
      & .day-number-left , & .day-number-right{
        background-color: #1AAD19;
      }
    }

    &[data-status="disabled"]{
      & .day-number {
        color: #bbb;
        border-radius: 100%;
        background-color: #eee;
      }

      & .day-description {
        color: #888;
      }
    }
  }

  .day-number{
    flex: 0 0 auto;
    width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    margin: 0 auto;
    overflow: hidden;
  }

  .day-description{
    font-size: 10px;
    height: 15px;
    text-align: center;
  }

  .day-number-wrapper{
    display: flex;
  }

  .day-number-left, .day-number-right{
    flex: auto;
  }
</style>
