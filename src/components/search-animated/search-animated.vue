<template>
  <div class="wv-search-bar" :data-expand="expand" :data-has-value="hasValue" :data-status="status">
    <div class="input-container">
      <span class="placeholder-container">
        <i class="weui-icon-search"></i>
        <span class="placeholder">{{placeholder}}</span>
      </span>
      <div class="text-input-container">
        <input 
          ref="input"
          type="text"
          class="text-input"
          @focus="focus"
          @blur="_blur"
          @input="_input"
        >
        <div class="btn-clear" @click="_clear" v-show="showCancelBtn"></div>
      </div>
    </div>
    <div class="btn-cancel" @click="_cancel">取消</div>
  </div>
</template>

<style lang="scss" scoped>
  .wv-search-bar{
    position: relative;
    padding: 8px 10px;
    display: flex;
    background-color: #EFEFF4;
    height: 28px;
    overflow: hidden;

    &[data-expand=true]{
      & .btn-cancel{
        margin-right: 0;
        opacity: 1;
      }

      & .input-container::before{
        flex: 0 0 auto;
      }

      & .text-input-container{
        width: calc(100% - 38px);
        left: 38px;
      }
    }

    &[data-has-value=true]{
      & .placeholder{
        visibility: hidden;
      }

      & .btn-clear{
        opacity: 1;
      }
    }

    &[data-status='blur']{
      & .btn-clear{
        opacity: 0;
      }
    }
  }

  .input-container{
    flex: auto;
    margin-right: 10px;
    border-radius: 3.5px;
    background: white;
    display: inline-flex;
    overflow: hidden;
    position: relative;

    &::after, &::before{
      content: '';
      flex: auto;
      transition: all 300ms ease;
    }

    &::before{
      margin-left: 15px;
    }
  }

  .btn-cancel{
    flex: 0 0 auto;
    color: #09bb07;
    transition: all 300ms ease;
    transition-delay: 100ms;
    opacity: 0;
    margin-right: -44px;
  }

  .placeholder-container{
    flex: 0 0 auto;
    transition: all 300ms ease;
  }

  .placeholder{
    font-size: 15px;
    color: #b2b2b2;
  }

  .text-input-container{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
  }

  .text-input{
    background: transparent;
    outline: none;
    border: none;
    height: 28px;
    display: block;
    font-size: 15px;
    flex: auto;
    margin-right: 5px;
  }

  .btn-clear{
    flex: 0 0 auto;
    margin-right: 5px;
    z-index: 1;
    width: 15px;
    height: 15px;
    overflow: hidden;
    opacity: 0;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28'%3E%3Ccircle cx='14' cy='14' r='14' fill='%23ccc'/%3E%3Cpath stroke='%23fff' stroke-width='2' stroke-miterlimit='10' d='M8 8l12 12'/%3E%3Cpath fill='none' stroke='%23fff' stroke-width='2' stroke-miterlimit='10' d='M20 8L8 20'/%3E%3C/svg%3E");
  }
</style>

<script>

  export default {
    name: 'wv-search-bar',

    props: {
      placeholder: {
        type: String,
        default: 'Search'
      },
      showCancelBtn: {
        type: Boolean,
        default: true
      },
      autoFocus: {
        type: Boolean,
        default: false
      },
    },

    data (){
      return {
        status: 'blur',
        expand: false,
        hasValue: false
      }
    },

    mounted (){
      setTimeout(()=>{
        this.autoFocus && this.focus()
      },50)
    },

    methods: {
      _clear (focus=true){
        focus && this.focus()
        this.$refs.input.value = ''
        this.hasValue = false
      },

      _cancel (){
        this._clear(false)
        this.expand = false
      },

      _input (){
        this.hasValue = !!this.$refs.input.value
      },

      _blur(){
        this.status = 'blur'
        if(this.hasValue) return
        this._cancel()
      },

      //对外可用的方法
      focus(){
        this.status = 'focus'
        this.expand = true
        this.$refs.input.focus()
      }
      
    }
  }
</script>

