<template>
  <div>
    <div class="weui-search-bar">
      <div class="weui-search-bar__form">
        <div class="weui-search-bar__box">
          <i class="weui-icon-search" />
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
          <div class="weui-icon-clear" @click="clear" />
        </div>
        <label
          class="weui-search-bar__label"
          @click="textClick"
          v-show="!isActive"
        >
          <i class="weui-icon-search" />
          <span v-text="placeholder" />
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
        <WVCell
          v-for="(item, index) in result"
          :key="index"
          :title="typeof item === 'object' ? item[resultTextKey] : item"
          @click="$emit('click-result', item)"
        />
      </div>
    </slot>
  </div>
</template>

<script>
import badge from './search-bar.vue.ts'
export default badge
</script>
