<template>
  <div :class="'weui-swiped-btn weui-swiped-btn_' + type" ><slot></slot></div>
</template>

<script type="text/babel">
  export default {
    name: 'wv-cell-swipe-button',

    props: {
      type: {
        type: String,
        default: 'default'
      }
    },

    methods: {
      handleClick ($event) {
        $event.preventDefault()
      }
    }
  }
</script>
