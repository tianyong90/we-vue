<template>
  <a class="wv-navbar__item"
     @click="$parent.$emit('input', id)"
     :class="{ 'wv-navbar__item_on': $parent.value === id }"
     :style="style">
    <slot></slot>
  </a>
</template>

<script>
  export default {
    name: 'wv-navbar-item',

    props: {
      id: String,
      disabled: Boolean
    },

    computed: {
      isSelected () {
        return this.id === this.$parent.value
      },

      style () {
        return {
          borderWidth: this.$parent.lineWidth + 'px',
          borderColor: this.$parent.activeColor,
          color: this.isSelected ? this.$parent.activeColor : this.$parent.color
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
    font-size: 15px;
    padding: 6px 0;
    text-align: center;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    &.wv-navbar__item_on {
      border-bottom: 3px solid red;
    }
  }
</style>
