<template>
  <div class="page">
    <ul class="lazyload-list">
      <li class="lazyload-list-item" v-for="item in list" :key="item">
        <img v-lazy="item" class="lazyload-image lazyload-slideIn-ordered" @load="imgLoadDone">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
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
  },

  methods: {
    imgLoadDone(e) {
      var $img = e.target,
        $lazyListWarp, $imgs,
        status = [];

      if ($img.getAttribute('lazy') === 'loaded') {
        $lazyListWarp = this._findLazyListWrap($img)
        $imgs = $lazyListWarp.querySelectorAll('img')

        // 读
        Array.prototype.forEach.call($imgs, $img => {
          status.push($img.getAttribute('lazy'));
        });

        //写
        requestAnimationFrame(() => {
          Array.prototype.forEach.call($imgs, ($img, index) => {
            (status[index - 1] || 'loaded') === 'loaded' && $img.setAttribute('prev-lazy','loaded');
          });
        });
      }
    },

    _findLazyListWrap($img) {
      while (!$img.classList.contains('lazyload-list')) {
        if ($img === document.body || $img === window)
          return null;

        $img = $img.parentElement;
      }

      return $img;
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

// 加载成功显示动画样例
.lazyload-slideIn[lazy=loaded] ,
.lazyload-slideIn-ordered[lazy=loaded][prev-lazy=loaded] {
  animation: slideIn 0.5s ease 0s forwards;
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(20%) translateZ(0) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateY(0%) translateZ(0) scale(1);
  }
}
</style>
