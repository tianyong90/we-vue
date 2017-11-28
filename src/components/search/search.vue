<template>
  <div>
    <div class="weui-search-bar">
      <div class="weui-search-bar__form">
        <div class="weui-search-bar__box">
          <i class="weui-icon-search"></i>
          <input class="weui-search-bar__input" :placeholder="placeholder" :autofocus="autofocus" v-model="currentValue" ref="searchInput">
          <a class="weui-icon-clear" @click="searchClear"></a>
        </div>
        <label class="weui-search-bar__label" @click="textClick" v-show="!isActive">
          <i class="weui-icon-search"></i>
          <span v-text="placeholder"></span>
        </label>
      </div>
      <a class="weui-search-bar__cancel-btn" @click="searchCancel" v-show="isActive" v-text="cancelText"></a>
    </div>

    <slot>
      <div class="weui-cells searchbar-result" v-show="show || currentValue">
        <wv-cell v-for="(item, key, index) in result" :key="key" :title="item"></wv-cell>
      </div>
    </slot>
  </div>
</template>

<script>
  import Cell from '../cell/index'

  export default {
    name: 'wv-search',

    components: {
      Cell
    },

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

    data () {
      return {
        isActive: false,
        currentValue: this.value
      }
    },

    mounted () {
      if (this.autofocus) {
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
  .weui-search-bar__label {
    transform-origin: 0px 0px 0px;
    opacity: 1;
    transform: scale(1, 1);
  }

  .weui-search-bar__cancel-btn {
    display: block;
  }

  .searchbar-result {
    display: block;
    transform-origin: 0px 0px 0px;
    opacity: 1;
    transform: scale(1, 1);
    margin-top: 0;
    font-size: 14px;
  }
</style>
