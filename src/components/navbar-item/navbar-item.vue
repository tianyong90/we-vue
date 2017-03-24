<template>
  <a class="wv-navbar__item"
    @click="$parent.$emit('input', id)"
    :class="{ 'wv-navbar__item_on': $parent.value === id }"
    :style="style">
    <slot></slot>
  </a>
</template>

<script type="text/babel">
export default {
  name: 'wv-navbar-item',

  props: {
    id: String,
    disabled: Boolean
  },

  computed: {
    style () {
      return {
        borderWidth: this.$parent.lineWidth + 'px',
        borderColor: this.$parent.activeColor,
        color: this.$parent.color
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .wv-navbar__item {
    position: relative;
    display: block;
    flex: 1;
    padding: 13px 0;
    text-align: center;
    font-size: 15px;
    -webkit-tap-highlight-color: rgba(0,0,0,0);

    &.wv-navbar__item_on {
      border-bottom: 3px solid red;
    }
  }
</style>
