<template>
  <div class="wv-swipe-item" v-swipe:vertical="{}">
    <slot></slot>
  </div>
</template>

<script>
  import { swipeDirective } from '../../custom/event/swipe.js'

  export default {
    name: 'wv-swipe-item',

    props: {
      onEnter: {
        type: Function,
        default: null
      },
      onLeave: {
        type: Function,
        default: null
      },
    },

    created () {
      console.log('swipe-item created');
    },

    mounted () {
      console.log('swipe-item mounted');
      this.$parent && this.$parent.swipeItemCreated();
    },

    destroyed () {
      this.$parent && this.$parent.swipeItemDestroyed()
    },

    directives: {
      swipe: swipeDirective
    }
  }
</script>

<style scoped lang="scss">
</style>
