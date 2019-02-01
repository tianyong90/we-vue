<template>
  <Transition name="wv-fade">
    <div
      v-show="visible"
      class="wv-modal"
      :class="className"
      :style="style"
      @touchmove.prevent.stop
      @click="$emit('click', $event)"
    />
  </Transition>
</template>

<script>
import modal from './Modal.vue.ts'
export default modal
</script>
