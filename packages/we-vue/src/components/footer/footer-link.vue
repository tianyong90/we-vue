<template>
  <div class="weui-footer__link" @click="onClick" v-text="text" />
</template>

<script lang="ts">
import Routeable from '../../mixins/routable'

import mixins from '../../utils/mixins'

/* @vue/component */
export default mixins(
  Routeable
).extend({
  name: 'wv-footer-link',

  props: {
    text: String,
  },

  methods: {
    onClick () {
      this.$emit('click')
      this.routeLink()
    },
  },
})
</script>
