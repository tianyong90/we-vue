<template>
  <wv-swipe :height="130">
    <swipe-teim>1</swipe-teim>
    <swipe-teim>2</swipe-teim>
    <swipe-teim>3</swipe-teim>
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
