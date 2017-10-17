<template>
  <div class="page">
    <img src="http://cn.vuejs.org/images/logo.png" alt="">
    <div class="container">
      <img src="http://cn.vuejs.org/images/logo.png" alt="">
    </div>
    <div class="container-raduis">
      <img src="http://cn.vuejs.org/images/logo.png" alt="">
    </div>
    <div class="container-raduis" @click="triggerNotOnImgTag">
      <img src="http://cn.vuejs.org/images/logo.png" alt="" style="margin-left:55px;transform:translateY(55px)" ref="imgTarget">
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
          e.stopPropagation()
          //没办法了,现在想到只能这样来处理重复点击,就是并非内置
          this.imgViwer.open(e)
        })
      })


    },

    methods: {
      triggerNotOnImgTag (e) {
        //需要手动指定target
        e.targetChangeTo = this.$refs.imgTarget
        this.imgViwer.open(e)
      }
    }
  }
</script>

<style scoped>
  img{
    width: 100px;
  }

  .container, .container-raduis{
    width: 50px;
    height: 50px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: lightblue;
    margin: 50px;
    overflow: hidden;
  }
  .container-raduis{
    border-radius: 10px;
  }
</style>

