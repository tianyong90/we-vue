<template>
  <div class="main">
    <div id="jparticles"></div>
    <div class="title">WE-VUE</div>
    <div class="slogan">简单易用的 vue 组件</div>
    <router-link to="/doc" class="btn-quickstart">开始使用</router-link>
    <img class="qrcode" src="../assets/demo_qrcode.png" alt="">
  </div>
</template>

<script>
  import JParticles from 'jparticles'

  export default {
    data () {
      return {}
    },

    mounted () {
      /* eslint-disable no-new, new-cap */
      new JParticles.particle('#banner', {
        num: 0.1,
        maxR: 1.5,
        minR: 0.2,
        maxSpeed: 1,
        minSpeed: 0.2,
        lineWidth: 0.1,
        lineShape: 'spider',
        range: 1000,
        proximity: 100,
        // 开启视差效果
        parallax: true,
        parallaxStrength: 5
      })
    }
  }
</script>

<style scoped lang="scss">
  $qrcode-size: 120px;

  #jparticles {
    width: 100%;
    height: 100vh;
    background: url(../assets/background.jpg) center top no-repeat;
    background-size: cover;
    position: absolute;
    z-index: -1;
  }

  .main {
    display: flex;
    flex-direction: column;
    position: absolute;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: calc(100vh - 70px);

    .title {
      color: #fff;
      font-size: 5em;
      font-weight: 200;
      text-shadow: #333 3px 3px 6px;
    }

    .slogan {
      color: #fff;
      font-size: 1.5em;
      font-weight: 100;
      text-shadow: #333 2px 2px 0px;
      margin-top: 20px;
    }

    .btn-quickstart {
      display: block;
      padding: .5em 1em;
      background-color: #329368;
      color: white;
      margin: 50px 0;
      text-decoration: none;
      font-size: 18px;
      font-weight: 500;
    }

    .qrcode {
      display: block;
      width: $qrcode-size;
      height: $qrcode-size;
      background-color: #fff;
      margin-top: 30px;
    }
  }
</style>
