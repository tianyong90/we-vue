<template>
  <div>
    <div
      :style="{ color: titleColor }"
      class="weui-cells__title"
      v-html="title"
      v-if="title"
    />
    <div class="weui-cells">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import '../../scss/group.scss'

import Themeable from '../../mixins/themeable'

import mixins from '../../utils/mixins'

export default mixins(
  Themeable
  /* @vue/component */
).extend({
  name: 'wv-group',

  props: {
    title: String,
    titleColor: String
  }
})
</script>
