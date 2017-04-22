<template>
  <wv-picker></wv-picker>
</template>

<script type="text/babel">

  export default {
    name: 'wv-datetime-picker',

    props: {
      confirmText: {
        type: String,
        default: '确定'
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      slots: {
        type: Array
      },
      valueKey: String,
      value: Boolean
    },

    data () {
      return {
        currentValue: this.value
      }
    }
  }
</script>
