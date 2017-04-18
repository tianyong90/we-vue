<template>
  <div>
    <div class="weui-cells__title" v-if="title" :style="{ color: titleColor }" v-html="title"></div>
    <div class="weui-cells">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'wv-group',

    props: {
      title: String,
      titleColor: String
    }
  }
</script>
