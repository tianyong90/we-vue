<template>
  <div class="wv-search-bar" :data-expand="expand" :data-has-value="hasValue" :data-status="status" :data-fixed-cancel="fixedCancelBtn" :data-lang="lang">
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
          v-model="currentValue"
        >
        <div class="btn-clear" @click="_clear" v-show="showCancelBtn"></div>
      </div>
    </div>
    <div class="btn-cancel" @click="_cancel">
      <span class="btn-cancel-container">{{cancelBtnText}}</span>
      <div class="btn-cancel-takeplace">{{cancelBtnText}}</div>
    </div>
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
    will-change: opacity;

    &[data-fixed-cancel=true],
    &[data-expand=true]{
      & .btn-cancel{
        opacity: 1;
        margin-left: 0px;
        transform: translateX(0px);
      }

      &[data-lang] .btn-cancel-takeplace{
        letter-spacing: unset;
      }
    }

    &[data-lang='zh'] .btn-cancel-takeplace{
      letter-spacing: -17px;
    }

    &[data-lang='en'] .btn-cancel-takeplace{
      letter-spacing: -9px;
    }

    &[data-expand=true]{
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
    margin-left: -10px;
    transform: translateX(10px);
  }

  .btn-cancel-container{
    position: absolute;
    width: 100vw;
    z-index: -1;
  }

  .btn-cancel-takeplace, .btn-cancel{
    opacity: 0;
    transition: all 300ms ease;
    transition-delay: 80ms;
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
    z-index: 0;
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
      value: String,
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
      fixedCancelBtn: {
        type: Boolean,
        default: false
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      },
      lang: {
        type: String,
        default: 'zh'
      }
    },

    data (){
      return {
        status: this.value ? 'blur' : 'focus',
        expand: !!this.value,
        hasValue: !!this.value,
        currentValue: this.value
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
        this.currentValue = ''
        this.hasValue = false
      },

      _cancel (){
        this._clear(false)
        this.expand = false
      },

      _input (){
        this.hasValue = !!this.currentValue
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
      
    },
    
    watch: {
      currentValue (val) {
        this.$emit('input', val)
        this.hasValue = !!this.currentValue
      },

      value (val) {
        this.currentValue = val
      }
    }
  }
</script>
