<template>
  <div class="wv-tabs" :class="`wv-tabs--${type}`">
    <div
      ref="wrap"
      :style="wrapStyle"
      class="wv-tabs__wrap"
      :class="{
        'wv-tabs__wrap--scrollable': scrollable,
        'wv-hairline--top-bottom': type === 'line' }
      "
    >
      <div class="wv-tabs__nav" :class="`wv-tabs__nav--${type}`" ref="nav">
        <div v-if="type === 'line'" class="wv-tabs__line" :style="lineStyle" />
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          ref="tabs"
          class="wv-tab"
          :class="{
            'wv-tab--active': tabs === currentActive,
            'wv-tab--disabled': tab.disabled
          }"
          @click="onClick(tabs)"
        >
          <span class="wv-ellipsis" ref="title">
            {{ tab.title }}
          </span>
        </div>
      </div>
    </div>
    <div class="wv-tabs__content" ref="content">
      <slot />
    </div>
  </div>
</template>

<script>
import tabs from './tabs.vue.ts'
export default tabs
</script>
