<template>
  <header class="wv-header" :class="{ 'is-fixed': fixed }" @click.stop="$emit('headerClick')">
    <div class="left">
      <span @click.stop="$emit('btnCloseClick')">back</span>
      <span @click.stop="$emit('btnCloseClick')">close</span>
      <slot name="left"></slot>
    </div>
    <div class="wv-header-title" v-text="title"></div>
    <div class="wv-header-menu" @click.stop="$emit('menuClick')">
      <slot name="right">321321</slot>
    </div>
  </header>
</template>

<script type="text/babel">
export default {
  name: 'wv-header',

  props: {
    title: String,
    skin: {
      type: String,
      default: 'ios'
    },
    fixed: {
      type: Boolean,
      default: true
    },
    showClose: Boolean,
    showBack: Boolean,
    showMenu: Boolean
  }
}
</script>

<style scoped lang="scss">
  .wv-header {
    display: block;
    overflow: hidden;
    background-color: #21292c;
    width: 100%;
    height: 50px;
    padding: 0;
    margin: 0;
    color: white;
    font-size: 14px;

    .wv-header-title {
      display: inline;
      float: left;
      margin: 0;
      padding: 0;
      font-size: 24px;
      line-height: 50px;
      font-weight: 0;
    }

    &.is-fixed {
      position: fixed;
      left: 0;
      top: 0;
    }

    .wv-header-menu {
      position: absolute;
      right: 0;
    }
  }
</style>
