<template>
  <div
    class="list"
    :style="{ height: height }"
    v-infinite-scroll="triggerLoadMore"
    infinite-scroll-disabled="disabled"
    infinite-scroll-immediate-check="immediateCheck"
    infinite-scroll-distance="distance"
  >
    <div
      class="list-item"
      v-for="item in list"
    >{{ item.id }}
    </div>
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
      distance: Number,
      immediateCheck: {
        type: Boolean,
        default: true
      },
      onLoadMore: {
        type: Function,
        default () {
          return function () {}
        }
      },
      height: {
        type: String,
        default: 'auto'
      }
    },

    methods: {
      triggerLoadMore () {
        this.onLoadMore()
      }
    }
  }
</script>

