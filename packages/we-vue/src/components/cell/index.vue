<template>
  <div
    class="weui-cell"
    :class="{'weui-cell_access': isLink}"
    @click="onClick"
  >
    <div class="weui-cell_hd">
      <slot name="icon"/>
    </div>
    <div class="weui-cell__bd">
      <slot name="bd">
        <p v-html="title"/>
      </slot>
    </div>
    <div class="weui-cell__ft">
      <slot name="ft">{{ value }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
import '../../scss/cell.scss'

import Routeable from '../../mixins/routable'
import Themeable from '../../mixins/themeable'

import mixins from '../../utils/mixins'

export default mixins(
  Routeable,
  Themeable
  /* @vue/component */
).extend({
  name: 'wv-cell',

  props: {
    title: {
      type: [String, Number]
    },
    value: {
      type: [String, Number]
    },
    isLink: Boolean
  },

  methods: {
    onClick () {
      this.$emit('click')
      this.routeLink()
    }
  }
})
</script>
