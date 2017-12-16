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
    name: 'infinite-scroll-component',

    directives: {
      InfiniteScroll
    },

    props: {
      list: Array,
      loadMore: {
        type: 'function',
        default () {
          return function () {}
        }
      },
      disabled: Boolean,
      distance: Number
    },

    methods: {
      triggerLoadMore () {
        this.loadMore()
      }
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
