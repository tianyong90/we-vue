<template>
  <div class="weui-search-bar" id="searchBar">
    <form class="weui-search-bar__form">
      <div class="weui-search-bar__box">
        <i class="weui-icon-search"></i>
        <input type="search" class="weui-search-bar__input" id="searchInput" placeholder="搜索" required="">
        <a href="javascript:" class="weui-icon-clear" id="searchClear"></a>
      </div>
      <label class="weui-search-bar__label" id="searchText" style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);">
          <i class="weui-icon-search"></i>
          <span>搜索</span>
      </label>
    </form>
    <a href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
  </div>
</template>

<script>
import 'weui/dist/style/weui.min.css'

export default {
  name: 'vui-search',

  props: {
    type: {
      type: String,
      default: 'default'
    },
    disabled: Boolean,
    mini: Boolean,
    plain: Boolean
  },

  methods: {
    handleClick ($event) {
      $event.preventDefault()
    }
  },

  computed: {
    classObject: function () {
      let classType = this.plain ? `weui-btn_plain-${this.type}` : `weui-btn_${this.type}`
      let classDisabled = this.plain ? 'weui-btn_plain-disabled' : 'weui-btn_disabled'

      return {
        [classType]: true,
        [classDisabled]: this.disabled,
        'weui-btn_mini': this.mini
      }
    }
  }
}
</script>