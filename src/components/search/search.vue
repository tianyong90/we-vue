<template>
  <div class="weui-search-bar" id="searchBar">
    <form class="weui-search-bar__form">
      <div class="weui-search-bar__box">
        <i class="weui-icon-search"></i>
        <input type="search" class="weui-search-bar__input" id="searchInput" :placeholder="placeholder" required="" :value="value" autocomplete="off">
        <a href="javascript:" class="weui-icon-clear" id="searchClear" @click="searchClear"></a>
      </div>
      <label class="weui-search-bar__label" id="searchText" style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);" @click="textClick" v-show="false">
          <i class="weui-icon-search"></i>
          <span>搜索</span>
      </label>
    </form>
    <a href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel" @click="searchCancel">{{ cancelText }}</a>
  </div>
</template>

<script type="text/babel">
import 'weui/dist/style/weui.min.css'

export default {
  name: 'vui-search',

  props: {
    placeholder: {
      type: String,
      default: '搜索'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    disabled: Boolean,
    value: String
  },

  data () {
    return {
      isActive: false,
      currentValue: this.value
    }
  },

  methods: {
    handleClick ($event) {
      $event.preventDefault()
    },

    textClick () {
      this.isActive = true
      console.log('hello')
    },

    searchClear () {
      console.log('clear')
    },

    searchCancel () {
      console.log('cancel')
    }
  },

  computed: {
  }
}
</script>