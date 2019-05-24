<template>
  <div>
    <div class="banner py-5">
      <div class="container p-5">
        <div class="row justify-content-center align-items-center flex-column">
          <img class="banner-logo mb-3" src="/images/logo.png" alt="" />
          <h1 class="slogan text-center mt-2 text-light">
            we-vue， 不只是 vue.js + weui！
          </h1>
        </div>

        <div class="row mt-5 justify-content-center">
          <router-link to="/doc/v2/index" class="btn btn-light btn-lg mx-2 btn-quickstart"
            >文档
          </router-link>
          <a href="https://demo.wevue.org" class="btn btn-outline-light btn-lg mx-2">在线示例</a>
          <a
            href="https://github.com/tianyong90/WE-VUE"
            class="btn btn-outline-light btn-lg mx-2 text-uppercase"
            ><i class="fab fa-github"></i> GitHub</a
          >
        </div>
        <div class="row justify-content-center mt-5">
          <img class="qrcode" width="120" height="120" src="/images/demo_qrcode.png" />
        </div>
      </div>
      <div class="container">
        <div class="card-deck">
          <div class="card border-0 shadow">
            <img class="card-img-top" src="/images/easy-to-use.jpg" alt="" />
            <div class="card-body">
              <div class="card-title">
                简单易用
              </div>
              <p class="card-text">
                WE-VUE 组件使用简单，配置很容易。支持多种引入方式。对于对 Vue.js
                有一定了解的开发者，一定能很快上手。
              </p>
            </div>
          </div>
          <div class="card border-0 shadow">
            <img class="card-img-top" src="/images/full-document.jpg" alt="" />
            <div class="card-body">
              <div class="card-title">
                文档完善
              </div>
              <p class="card-text">
                我们为不同版本分别编写了详细的文档。这些文档能使开发更加高效，同时在线文档网站也是你在使用过程中遇到问题时最可能得到帮助的地方。
              </p>
            </div>
          </div>
          <div class="card border-0 shadow">
            <img class="card-img-top" src="/images/online-demo.jpg" alt="" />
            <div class="card-body">
              <div class="card-title">
                在线示例
              </div>
              <p class="card-text">
                针对最新版本，我们为每一个组件都编写了示例。查看示例可以随时了解 WE-VUE
                组件的最新特性及细节。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <div class="container py-4">
        <div class="row justify-content-center">
          <a class="text-light m-2" href="https://github.com/tianyong90/WE-VUE">GitHub</a>
          <a class="text-light m-2" href="https://gitee.com/tianyong/WE-VUE">Gitee</a>
        </div>

        <hr />

        <div class="row justify-content-center align-items-center mt-2 flex-column">
          <p class="d-block text-light">Copyright © 2016-2019 tianyong90</p>
          <p>
            <a class="text-light" href="http://www.miitbeian.gov.cn/">粤ICP备17009332号-1</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style scoped lang="scss">
.navbar {
  background-color: #0396ff;
  border-bottom: none;
}

.banner {
  height: auto;
  background-image: linear-gradient(0deg, #abdcff 10%, #0396ff 100%);
  margin-top: 70px;

  .banner-logo {
    display: block;
    width: 140px;
    height: 140px;
  }

  .slogan {
    text-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  }
}

.card {
  overflow: hidden;
  border-radius: 5px;

  .card-img-top {
    height: 200px;
  }

  .card-title {
    text-align: center;
    color: #000;
    font-weight: bold;
  }
}

.footer {
  background-color: darken(#1aad19, 35%);

  hr {
    background-color: #555;
  }
}
</style>
