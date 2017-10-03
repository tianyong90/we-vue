<template>
  <div class="page">
    <wv-big-list :onShowLen="10" :items="items">
    </wv-big-list>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items:[1,2,3,4,5,6,7,8,9,10]
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
