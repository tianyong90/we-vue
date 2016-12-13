<template>
  <div>
    <div class="weui-search-bar">
      <form class="weui-search-bar__form">
        <div class="weui-search-bar__box">
          <i class="weui-icon-search"></i>
          <input type="search" class="weui-search-bar__input" :placeholder="placeholder" required="" v-model="currentValue" autocomplete="off" ref="searchInput">
          <a href="javascript:" class="weui-icon-clear" @click="searchClear"></a>
        </div>
        <label class="weui-search-bar__label" style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);" @click="textClick" v-show="!isActive">
            <i class="weui-icon-search"></i>
            <span v-text="placeholder"></span>
        </label>
      </form>
      <a href="javascript:" class="weui-search-bar__cancel-btn" @click="searchCancel" v-show="isActive" style="display: block;" v-text="cancelText"></a>
    </div>

    <slot>
      <div class="weui-cells searchbar-result" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);">
          <div class="weui-cell weui-cell_access">
              <div class="weui-cell__bd weui-cell_primary">
                  <p>实时搜索文本</p>
              </div>
          </div>
      </div>  
    </slot>    
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
    value: {
      type: String,
      default: ''
    },
    result: {
      type: Array
    }
  },

  data () {
    return {
      isActive: false,
      currentValue: this.value
    }
  },

  mounted () {
    this.currentValue = this.value
  },

  methods: {
    textClick (e) {
      // focus the input
      this.$refs.searchInput.focus()
      this.isActive = true
      console.log('hello')
    },

    searchClear () {
      this.currentValue = ''
      console.log('clear')
    },

    searchCancel () {
      this.searchClear()
      this.isActive = false
      console.log('cancel')
    }
  },

  computed: {
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