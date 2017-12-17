<template>
  <wv-swipe :height="130">
    <swipe-teim></swipe-teim>
    <swipe-teim></swipe-teim>
    <swipe-teim></swipe-teim>
  </wv-swipe>
</template>

<script>
  import Swipe from '@/components/swipe'
  import SwipeItem from '@/components/swipe-item'

  export default {
    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem
    }
  }
</script>
