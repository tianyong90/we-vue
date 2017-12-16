<template>
  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">

  </div>
</template>

<script>
  import InfiniteScroll from '@/components/infinite-scroll'

  export default {
    name: 'infinite-scroll-component',

    directives: {
      InfiniteScroll
    }
  }
</script>
