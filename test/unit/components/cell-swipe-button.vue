<template>
  <cell-swipe-button>test</cell-swipe-button>
</template>

<script>
  import CellSwipeButton from '@/components/cell-swipe-button'

  export default {
    name: 'cell-swipe-button-conponent',

    components: {
      [CellSwipeButton.name]: CellSwipeButton
    }
  }
</script>
