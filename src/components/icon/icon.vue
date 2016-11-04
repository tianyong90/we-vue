<template>
  <i :class="classObject"></i>
</template>

<script type="text/babel">
import 'weui/dist/style/weui.min.css'

export default {
  name: 'vui-icon',

  props: {
    type: {
      type: String,
      required: true
    },
    large: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classObject: function () {
      let classType = `weui-icon-${this.type}`

      return {
        [classType]: true,
        'weui-icon_msg': this.large
      }
    }
  }
}
</script>
