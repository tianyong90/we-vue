<template>
  <wv-cell-swipe-button>test</wv-cell-swipe-button>
</template>

<script>
import CellSwipeButton from '@/cell-swipe-button'

export default {
  name: 'cell-swipe-button-conponent',

  components: {
    [CellSwipeButton.name]: CellSwipeButton
  }
}
</script>
