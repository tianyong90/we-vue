<template>
  <div class="page">
    <wv-grid>
      <wv-grid-item class="demo-grid-item" to="/">
        <img :src="thumbSmall" slot="icon">
        GridItem
      </wv-grid-item>
      <wv-grid-item class="demo-grid-item" to="/">
        <img :src="thumbSmall" slot="icon">
        GridItem
      </wv-grid-item>
      <wv-grid-item class="demo-grid-item" to="/">
        <img :src="thumbSmall" slot="icon">
        GridItem
      </wv-grid-item>
      <wv-grid-item class="demo-grid-item" to="/">
        <img :src="thumbSmall" slot="icon">
        GridItem
      </wv-grid-item>
      <wv-grid-item class="demo-grid-item" to="/">
        <img :src="thumbSmall" slot="icon">
        GridItem
      </wv-grid-item>
      <wv-grid-item class="demo-grid-item" to="/">
        <img :src="thumbSmall" slot="icon">
        GridItem
      </wv-grid-item>
      <wv-grid-item class="demo-grid-item" to="/">
        <img :src="thumbSmall" slot="icon">
        GridItem
      </wv-grid-item>
      <wv-grid-item class="demo-grid-item" to="/">
        <img :src="thumbSmall" slot="icon">
        GridItem
      </wv-grid-item>
      <wv-grid-item class="demo-grid-item" to="/">
        <img :src="thumbSmall" slot="icon">
        GridItem
      </wv-grid-item>
    </wv-grid>
  </div>
</template>

<script>
import thumbSmall from '../assets/images/icon_tabbar.png'

export default {
  data () {
    return {
      thumbSmall
    }
  }
}
</script>

<style scoped lang="scss">
  .demo-grid-item {
    background-color: white;
  }
</style>
