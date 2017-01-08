<template>
  <a class="weui-navbar__item"
    @click="$parent.$emit('input', id)"
    :class="{ 'weui-bar__item_on': $parent.value === id }">
    <slot></slot>
  </a>
</template>

<script type="text/babel">
export default {
  name: 'wv-navbar-item',

  props: ['id']
}
</script>
