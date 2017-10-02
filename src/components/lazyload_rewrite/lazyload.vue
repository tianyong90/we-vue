<template>
  <img v-lazy="config" :data-srcset="src">
</template>

<script>
  import lazyload from './lazyload'

  export default {
    name: 'lazyload',

    props: {
      src: {
        type: String,
      }

    }
  }
</script>

<style lang="sass" scoped>

</style>

