<template>
  <div>
    <div class="weui-search-bar">
      <div class="weui-search-bar__form">
        <div class="weui-search-bar__box">
          <i class="weui-icon-search"/>
          <form action="javascript:" @submit="$emit('search', currentValue)">
            <input
              class="weui-search-bar__input"
              type="search"
              :placeholder="placeholder"
              :autofocus="autofocus"
              v-model="currentValue"
              ref="input"
            >
          </form>
          <div class="weui-icon-clear" @click="clear"/>
        </div>
        <label
          class="weui-search-bar__label"
          @click="textClick"
          v-show="!isActive"
        >
          <i class="weui-icon-search"/>
          <span v-text="placeholder"/>
        </label>
      </div>
      <div
        class="weui-search-bar__cancel-btn"
        @click="cancel"
        v-show="isActive"
        v-text="cancelText"
      />
    </div>

    <slot>
      <div
        class="weui-cells searchbar-result"
        v-show="show || currentValue"
      >
        <wv-cell
          v-for="(item, index) in result"
          :key="index"
          :title="typeof item === 'object' ? item[resultTextKey] : item"
          @click="$emit('click-result', item)"
        />
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import '../../scss/search-bar.scss'

import WvCell from '../cell/index'

import Vue from 'vue'

// TODO
declare module 'vue/types/vue' {
  interface Vue {
    isActive: boolean,
    currentValue: any,
    clear: Function
  }
}

export default Vue.extend({
  name: 'wv-search-bar',

  components: {
    WvCell
  },

  props: {
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
    resultTextKey: String,
    result: Array,
    value: String
  },

  data: vm => ({
    currentValue: vm.value,
    isActive: false
  }),

  mounted (): void {
    if (this.autofocus) {
      this.isActive = true
    }
  },

  methods: {
    textClick (): void {
      // focus the input
      (this.$refs.input as HTMLElement).focus()
      this.isActive = true
    },

    // 清除输入
    clear (): void {
      this.currentValue = ''
    },

    // 取消搜索
    cancel (): void {
      this.$emit('cancel')
      this.clear()
      this.isActive = false
    }
  },

  watch: {
    currentValue (val): void {
      this.$emit('input', val)
    },

    value (val): void {
      this.currentValue = val
    }
  }
})
</script>
