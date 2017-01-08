<template>
  <i class="weui-loading" style="{ 'color': color }"></i>
</template>

<script type="text/babel">
export default {
  name: 'wv-spinner',

  props: {
    type: String,
    color: {
      type: String,
      default: 'lightgrey'
    }
  }
}
</script>
