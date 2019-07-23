<template>
  <div>
    <div class="">
      <div class="w-full bg-blue-600 py-16 justify-center">
        <div class="container max-w-6xl mx-auto justify-center">
          <h1 class="text-center mt-2 text-white text-4xl">
            we-vue， 不只是 vue.js + weui！
          </h1>
        </div>

        <div class="container max-w-md mx-auto flex mt-12 text-center justify-center">
          <router-link
            to="/doc/v2/index"
            class="text-white text-xl no-underline mx-3 border-white hover:bg-white hover:text-black border-2 border-solid px-5 py-4 rounded-full"
            >文档
          </router-link>
          <a
            href="https://demo.wevue.org"
            class="text-white text-xl no-underline mx-3 border-white hover:bg-white hover:text-black border-2 border-solid px-5 py-4 rounded-full"
            >在线示例</a
          >
          <a
            href="https://github.com/tianyong90/WE-VUE"
            class="text-white text-xl no-underline mx-3 border-white hover:bg-white hover:text-black border-2 border-solid px-5 py-4 rounded-full uppercase"
            ><i class="fab fa-github"></i> GitHub</a
          >
        </div>
        <div class="w-48 bg-black mx-auto mt-12">
          <img class="w-full" src="/images/demo_qrcode.png" />
        </div>
      </div>

      <div class="container max-w-6lg mx-auto my-6">
        <div class="flex -mx-2">
          <div class="w-1/3 px-2">
            <div class="shadow-lg rounded-lg overflow-hidden">
              <img class="w-full object-cover" src="/images/easy-to-use.jpg" alt="" />
              <div class="px-3 py-4">
                <div class="font-semibold text-gray-800 text-2xl text-center">
                  简单易用
                </div>
                <p class="leading-relaxed text-justify h-24">
                  WE-VUE 组件使用简单，配置很容易。支持多种引入方式。对于对 Vue.js
                  有一定了解的开发者，一定能很快上手。
                </p>
              </div>
            </div>
          </div>
          <div class="w-1/3 px-2">
            <div class="shadow-lg rounded-lg overflow-hidden">
              <img class="w-full object-cover" src="/images/full-document.jpg" alt="" />
              <div class="px-3 py-4">
                <div class="font-semibold text-gray-800 text-2xl text-center">
                  文档完善
                </div>
                <p class="leading-relaxed text-justify h-24">
                  我们为不同版本分别编写了详细的文档。这些文档能使开发更加高效，同时在线文档网站也是你在使用过程中遇到问题时最可能得到帮助的地方。
                </p>
              </div>
            </div>
          </div>
          <div class="w-1/3 px-2">
            <div class="shadow-lg rounded-lg overflow-hidden">
              <img class="w-full object-cover" src="/images/online-demo.jpg" alt="" />
              <div class="px-3 py-4">
                <div class="font-semibold text-gray-800 text-2xl text-center">
                  在线示例
                </div>
                <p class="leading-relaxed text-justify h-24">
                  针对最新版本，我们为每一个组件都编写了示例。查看示例可以随时了解 WE-VUE
                  组件的最新特性及细节。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="min-h-0 bg-gray-700">
      <div class="container max-w-6xl mx-auto py-4">
        <div class="text-center text-white">
          <a class="text-white mx-3 no-underline" href="https://github.com/tianyong90/WE-VUE"
            >GitHub</a
          >
          <a class="text-white mx-3 no-underline" href="https://gitee.com/tianyong/WE-VUE">Gitee</a>
        </div>

        <div class="text-center">
          <p class="text-gray-300">Copyright © 2016-2019 tianyong90</p>
          <p>
            <a class="text-gray-300 text-sm no-underline" href="http://www.miitbeian.gov.cn/"
              >粤ICP备17009332号-1</a
            >
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

<style scoped lang="scss"></style>
