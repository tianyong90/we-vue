<template>
  <div>
    <div class="weui-search-bar">
      <div class="weui-search-bar__form">
        <div class="weui-search-bar__box">
          <i class="weui-icon-search"></i>
          <input type="text" class="weui-search-bar__input" :placeholder="placeholder" v-model="currentValue"
                 ref="searchInput">
          <a href="javascript:" class="weui-icon-clear" @click="searchClear"></a>
        </div>
        <label class="weui-search-bar__label" style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"
               @click="textClick" v-show="!isActive">
          <i class="weui-icon-search"></i>
          <span v-text="placeholder"></span>
        </label>
      </div>
      <a href="javascript:" class="weui-search-bar__cancel-btn" @click="searchCancel" v-show="isActive"
         style="display: block;" v-text="cancelText"></a>
    </div>

    <slot>
      <div class="weui-cells searchbar-result" v-show="show || currentValue">
        <XCell v-for="item in result" :title="item"></XCell>
      </div>
    </slot>
  </div>
</template>

<script>
  import XGroup from '../group/index.js'
  import XCell from '../cell/index.js'

  export default {
    name: 'wv-search',

    props: {
      value: String,
      autofocus: Boolean,
      show: Boolean,
      placeholder: {
        type: String,
        default: '搜索'
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      result: Array
    },

    components: {
      XGroup,
      XCell
    },

    data () {
      return {
        isActive: false,
        currentValue: this.value
      }
    },

    mounted () {
      if (this.autofocus) {
        this.$refs.searchInput.focus()
        this.isActive = true
      }
    },

    methods: {
      textClick (e) {
        // focus the input
        this.$refs.searchInput.focus()
        this.isActive = true
      },

      // 清除输入
      searchClear () {
        this.currentValue = ''
      },

      // 取消搜索
      searchCancel () {
        this.searchClear()
        this.isActive = false
      }
    },

    watch: {
      currentValue (val) {
        this.$emit('input', val)
      },

      value (val) {
        this.currentValue = val
      }
    }
  }
</script>

<style scoped lang="scss">
  .searchbar-result {
    display: block;
    transform-origin: 0px 0px 0px;
    opacity: 1;
    transform: scale(1, 1);
    margin-top: 0;
    font-size: 14px;
  }
</style>
