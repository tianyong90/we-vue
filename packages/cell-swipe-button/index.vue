<template>
  <div :class="'weui-swiped-btn weui-swiped-btn_' + type">
    <slot />
  </div>
</template>

<script>
import create from '../utils/create'

export default create({
  name: 'cell-swipe-button',

  props: {
    type: {
      type: String,
      default: 'default'
    }
  }
})
</script>
