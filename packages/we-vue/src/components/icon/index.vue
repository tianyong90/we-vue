<template>
  <i :class="classObject" />
</template>

<script lang="ts">
import '../../scss/icon.scss'

import Themeable from '../../mixins/themeable'

import mixins from '../../utils/mixins'

export default mixins(
  Themeable
  /* @vue/component */
).extend({
  name: 'wv-icon',

  props: {
    type: {
      type: String,
      required: true
    },
    large: Boolean
  },

  computed: {
    classObject () {
      let classType = `weui-icon-${this.type}`

      return {
        [classType]: true,
        'weui-icon_msg': this.large
      }
    }
  }
})
</script>
