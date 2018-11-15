<template>
  <div class="page">
    <ul class="lazyload-list">
      <li class="lazyload-list-item" v-for="item in list" :key="item">
        <img v-lazy="item" class="lazyload-image">
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import { Lazyload } from 'we-vue'

Vue.use(Lazyload)

export default {
  data () {
    return {
      list: [
        'https://unsplash.it/640/360/?random&t=' + Math.random(),
        'https://unsplash.it/640/360/?random&t=' + Math.random(),
        'https://unsplash.it/640/360/?random&t=' + Math.random(),
        'https://unsplash.it/640/360/?random&t=' + Math.random(),
        'https://unsplash.it/640/360/?random&t=' + Math.random(),
        'https://unsplash.it/640/360/?random&t=' + Math.random(),
        'https://unsplash.it/640/360/?random&t=' + Math.random()
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.lazyload-list {
  display: block;
  overflow: hidden;
  width: 100%;
  padding: 0;
  margin: 0;
  text-align: center;
  list-style: none;

  .lazyload-list-item {
    width: 300px;
    margin: 5px auto;
  }

  img {
    display: block;
    width: 100%;

    &[lazy='loading'] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
  }
}
</style>
