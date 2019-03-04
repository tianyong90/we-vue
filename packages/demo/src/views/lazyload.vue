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
const list = Array.from({ length: 7 }).map((item, index) => {
  return `/images/lazyload_${index + 1}.jpg?t=` + Math.random()
})

export default {
  data () {
    return {
      list
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
    display: block;
    min-width: 200px;
    min-height: 100px;
    overflow: hidden;
    margin: 15px auto;
  }

  img {
    display: block;
    width: 80%;
    margin: 0 auto;

    &[lazy='loading'] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
  }
}
</style>
