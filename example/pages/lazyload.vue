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
  export default {
    data () {
      return {
        list: [
          'https://cdn.pixabay.com/photo/2015/03/18/09/31/prairie-679014__340.jpg',
          'https://cdn.pixabay.com/photo/2015/03/18/09/29/the-scenery-679011__340.jpg',
          'https://cdn.pixabay.com/photo/2015/03/28/16/40/lake-696098__340.jpg',
          'https://cdn.pixabay.com/photo/2013/07/01/17/36/sunset-142698__340.jpg',
          'https://cdn.pixabay.com/photo/2013/11/10/20/53/forest-208517__340.jpg',
          'https://cdn.pixabay.com/photo/2015/01/08/15/48/creek-593146__340.jpg'
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

      &[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
      }
    }
  }
</style>
