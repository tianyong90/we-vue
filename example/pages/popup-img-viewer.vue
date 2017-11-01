<template>
  <div class="page">
    <wv-group title="支持过度动画做裁切,显示更加自然">
      <div class="row">
        <div class="row-item"><img :src="sample" alt=""></div>
        <div class="row-item"><img :src="logo" alt=""></div>
        <div class="row-item" @click="triggerNotOnImgTag"><img :src="logo" alt="" ref="imgTarget"></div>
      </div>
    </wv-group>
  </div>
  
</template>

<script>
  import ImgViwer from '../../src/components/popup-img-viewer'
  import logo from '../../img/logo.png'
  import sample from '../../img/sample.jpg'

  export default {

    created (){
      this.logo = logo
      this.sample = sample
    },

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

  .row{
    display: flex;
    justify-content: space-around;
  }
  .row-item{
    height: 80px;
    width: 80px;
    flex: 0 0 auto;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid black;
  }
</style>

