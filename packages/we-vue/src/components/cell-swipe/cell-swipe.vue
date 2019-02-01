<template>
  <div
    class="weui-cell weui-cell_swiped"
    v-click-outside:touchstart="onClickOutside"
  >
    <div
      class="weui-cell__bd"
      ref="cellBd"
      @touchstart="onTouchstart"
      @touchmove="onTouchmove"
      @touchend="onTouchend"
      @touchcancel="onTouchend"
      :style="style"
    >
      <WVCell
        :title="title"
        :value="value"
        :is-link="isLink"
        :to="to"
        :url="routeLink"
        ref="cell"
      >
        <template slot="icon">
          <slot name="icon" />
        </template>
        <template slot="bd" v-if="!title">
          <slot name="bd" />
        </template>
        <template slot="ft" v-if="typeof value === 'undefined'">
          <slot name="ft" />
        </template>
      </WVCell>
    </div>
    <div class="weui-cell__ft" ref="rightBtns">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
import cellSwipe from './cell-swipe.vue.ts'
export default cellSwipe
</script>
