<template>
  <div class="weui-tabbar" :style="{ position: fixed ? 'fixed' : 'absolute' }">
    <slot />
  </div>
</template>

<script>
import create from '../utils/create'

export default create({
  name: 'tabbar',

  props: {
    fixed: Boolean
  }
})
</script>
