<template>
  <div>
    <div class="banner">
      <div class="container p-5">
        <div class="row justify-content-center flex-column">
          <h1 class="d-block text-center mt-5 text-light title">WE-VUE</h1>
          <div class="slogan text-center mt-2 text-light sub-title">简单易用的 Vue.js 组件</div>
        </div>
        <div class="row mt-5 justify-content-center">
          <router-link
            to="/doc/v2_0/index"
            class="btn btn-primary ml-2 mr-2
          btn-quickstart"
          >文档
          </router-link>
          <a
            href="https://demo.wevue.org"
            class="btn btn-primary ml-2 mr-2"
          >示例</a>
          <a
            href="https://github.com/tianyong90/WE-VUE"
            class="btn btn-primary ml-2 mr-2"
          >GitHub</a>
        </div>
        <div class="row justify-content-center mt-5">
          <img class="qrcode" width="120" height="120" src="../assets/image/demo_qrcode.png">
        </div>
      </div>
    </div>

    <section class="mt-4 mt-4">
      <div class="container">
        <h2 class="text-center mt-5 mb-4 title-feature">特性</h2>
        <div class="row justify-content-between">
          <div class="card shadow">
            <img src="" alt="" class="card-img">
            <div class="card-body">
              <div class="card-title">
                简单易用
              </div>
              <p>WE-VUE 组件使用简单，配置很容易。支持多种引入方式。对于对 Vue.js 有一定了解的开发者，一定能很快上手。</p>
            </div>
          </div>
          <div class="card shadow">
            <div class="card-body">
              <div class="card-title">
                文档完善
              </div>
              <p>我们为不同版本分别编写了详细的文档。这些文档能使开发更加高效，同时在线文档网站也是你在使用过程中遇到问题时最可能得到帮助的地方。</p>
            </div>
          </div>
          <div class="card shadow">
            <div class="card-body">
              <div class="card-title">
                在线示例
              </div>
              <p>针对最新版本，我们为每一个组件都编写了示例。查看示例可以随时了解 WE-VUE 组件的最新特性及细节。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer w-100 mt-4">
      <div class="container pt-3 pb-3">
        <div class="row justify-content-center">
          <a class="text-light m-2" href="https://github.com/tianyong90/WE-VUE">GitHub</a>
          <a class="text-light m-2" href="https://gitee.com/tianyong/WE-VUE">Gitee</a>
        </div>

        <div class="row justify-content-center mt-2">
          <p class="text-light">Copyright © 2016-2019 tianyong90 <a class="text-light" href="http://www.miitbeian.gov.cn/">粤ICP备17009332号-1</a></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">
.banner {
  min-height: 85vh;
  background-image: url(../assets/image/banner.jpg);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;

  .title {
    font-size: 5rem;
    font-weight: 300;
  }
}

.title-feature {
  color: #666;
}

.card {
  width: 30% !important;

  .card-title {
    text-align: center;
    color: #1aad19;
    font-size: 1.3rem;
    font-weight: 500;
    margin-bottom: 1.5em;
  }
}

.footer {
  background-color: darken(#1aad19, 35%);
}
</style>
