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

<script>
import { create } from '../utils'

export default create({
  name: 'group',

  props: {
    title: String,
    titleColor: String
  }
})
</script>
