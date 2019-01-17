<template>
  <div
    v-if="type === 'appmsg'"
    class="weui-media-box"
    :class="'weui-media-box_' + type"
    @click="onClick"
  >
    <div class="weui-media-box__hd" v-if="type !== 'text'">
      <img class="weui-media-box__thumb" :src="thumb" alt="">
    </div>
    <div class="weui-media-box__bd">
      <h4 class="weui-media-box__title" v-text="title" />
      <p class="weui-media-box__desc" v-text="description" />
    </div>
  </div>

  <div
    v-else
    class="weui-media-box"
    :class="'weui-media-box_' + type"
    @click="onClick"
  >
    <h4 class="weui-media-box__title" v-text="title" />
    <p class="weui-media-box__desc" v-text="description" />
    <slot name="box_ft" />
  </div>
</template>

<script>
import mediaBox from './media-box.vue.ts'
export default mediaBox
</script>
