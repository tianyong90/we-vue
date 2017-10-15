<template>
  <div class="page" @click="click">
    <img src="http://cn.vuejs.org/images/logo.png" alt="">
    <div class="container">
      <img src="http://cn.vuejs.org/images/logo.png" alt="">
    </div>
  </div>
</template>

<script>
  import ImgViwer from '../../src/components/popup-img-viewer'

  export default {

    mounted () {
      var imgs = this.$el.getElementsByTagName('img');

      this.imgViwer = new ImgViwer({
        imgs: imgs
      });

      //添加事件
      Array.prototype.forEach.call(imgs, $img => {
        $img.addEventListener('click', e =>{
          this.imgViwer.open(e)
        })
      })


    },

    methods: {
      click (e) {
        
      }
    }
  }
</script>

<style scoped>
  img{
    width: 100px;
  }

  .container{
    width: 50px;
    height: 50px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: lightblue;
    margin: 50px;
    overflow: hidden;
  }
</style>

