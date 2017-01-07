<template>
	<div>
    <div class="weui-mask weui-animate-fade-in" v-if="mask">
    </div>
    <div class="weui-animate-slide-up">
      <div class="wv-popup">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'wv-popup',

  props: {
    mask: Boolean
  },

  methods: {
  }
}
</script>

<style scoped lang="scss">
  .wv-popup {
    display: block;
    position: fixed;
    background: red;
    overflow: hidden;
  }
</style>
