<template>
  <header class="wv-header" :class="{ 'is-fixed': fixed }" @click.stop="$emit('headerClick')">
    <div class="left">
      <div class="btn btn-back" @click.stop="$emit('btnBackClick')">back</div>
      <div class="btn btn-close" @click.stop="$emit('btnCloseClick')">close</div>
      <slot name="left"></slot>
    </div>
    <div class="wv-header-title" v-text="title"></div>
    <div class="wv-header-menu" @click.stop="$emit('menuClick')">
      <slot name="right">test</slot>
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
  $headerHeight: 50px;

  .wv-header {
    display: block;
    overflow: hidden;
    background-color: #21292c;
    width: 100%;
    height: $headerHeight;
    padding: 0;
    margin: 0;
    color: white;
    font-size: 14px;

    .left {
      display: block;
      overflow: hidden;
      float: left;

      .btn {
        display: inline-block;
        margin: 0;
        padding: 0;
        width: $headerHeight;
        height: $headerHeight;
        background: red;
        text-align: center;
        line-height: $headerHeight;

        &:active {
          background: #00f;
        }
      }
    }

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
      width: $headerHeight;
      height: $headerHeight;
      text-align: center;
      line-height: $headerHeight;
      background: purple;

      &:active {
        background: red;
      }
    }
  }
</style>
