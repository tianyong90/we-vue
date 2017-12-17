<template>
  <div v-infinite-scroll="loadMore"
       :infinite-scroll-disabled="disabled"
       :infinite-scroll-distance="distance">
    <div class="item" v-for="item in list">{{ item.id }}</div>
  </div>
</template>

<script>
  import InfiniteScroll from '@/components/infinite-scroll'

  export default {
    directives: {
      InfiniteScroll
    },

    props: {
      list: Array,
      disabled: Boolean,
      distance: Number
    },

    methods: {
      triggerLoadMore () {
        this.loadMore()
      },

      loadMore () {}
    }
  }
</script>

<style scoped lang="">
  .item {
    display: block;
    width: 100%;
    height: 30px;
  }
</style>
