<template>
  <div>
    <div class="weui-cells__title" v-if="title" :style="{ color: titleColor }" v-html="title" />
    <div class="weui-cells">
      <slot />
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

<style scoped lang="scss">
</style>
