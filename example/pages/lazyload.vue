<template>
  <div class="page">
    <ul class="lazyload-list">
      <li class="lazyload-list-item" v-for="item in list">
        <img v-lazy="item" class="lazyload-image">
      </li>
    </ul>
  </div>
</template>

<script type="text/babel">
export default {
  data () {
    return {
      list: [
        'https://t2.27270.com/uploads/tu/201611/198/2ve0wmjtx3o.jpg',
        'https://t2.27270.com/uploads/tu/201611/198/vcwtdvkhcmv.jpg',
        'https://t2.27270.com/uploads/tu/201611/198/srt3sz32bqd.jpg',
        'https://t2.27270.com/uploads/tu/201611/198/jy0cqx5krgo.jpg',
        'https://t2.27270.com/uploads/tu/201611/198/a3egdhnw54r.jpg',
        'https://t2.27270.com/uploads/tu/201611/198/efk3drjkhhz.jpg',
        'https://t2.27270.com/uploads/tu/201611/198/ilnyn15pazl.jpg'
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
    textalign: center;
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
