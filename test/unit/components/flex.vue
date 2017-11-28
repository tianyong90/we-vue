<template>
  <wv-flex :gutter="gutter">
    <wv-flex-item></wv-flex-item>
  </wv-flex>
</template>

<script>
  import Flex from '@/components/flex'
  import FlexItem from '@/components/flex-item'

  export default {
    components: {
      [Flex.name]: Flex,
      [FlexItem.name]: FlexItem
    },

    props: {
      gutter: Number
    }
  }
</script>

<style scoped>
</style>
