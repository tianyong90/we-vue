<template>
  <i :class="classObject"></i>
</template>

<script type="text/babel">
  export default {
    name: 'wv-icon',

    props: {
      type: {
        type: String,
        required: true
      },
      large: Boolean
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
