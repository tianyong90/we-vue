<template>
  <div class="page">
    <wv-grid>
      <wv-grid-item class="demo-grid-item" to="/">
        <img :src="thumbSmall" slot="icon">
        <span slot="label">vue-router 跳转</span>
      </wv-grid-item>
      <wv-grid-item class="demo-grid-item" to="/">
        <img :src="thumbSmall" slot="icon">
        <span slot="label">vue-router 跳转</span>
      </wv-grid-item>
      <wv-grid-item class="demo-grid-item" to="/">
        <img :src="thumbSmall" slot="icon">
        <span slot="label">vue-router 跳转</span>
      </wv-grid-item>
      <wv-grid-item class="demo-grid-item" url="/">
        <img :src="thumbSmall" slot="icon">
        <span slot="label">url 跳转</span>
      </wv-grid-item>
      <wv-grid-item class="demo-grid-item" url="/">
        <img :src="thumbSmall" slot="icon">
        <span slot="label">url 跳转</span>
      </wv-grid-item>
      <wv-grid-item class="demo-grid-item" url="/">
        <img :src="thumbSmall" slot="icon">
        <span slot="label">url 跳转</span>
      </wv-grid-item>
      <wv-grid-item class="demo-grid-item" @click="onClick">
        <img :src="thumbSmall" slot="icon">
        <span slot="label">点击事件</span>
      </wv-grid-item>
      <wv-grid-item class="demo-grid-item" @click="onClick">
        <img :src="thumbSmall" slot="icon">
        <span slot="label">点击事件</span>
      </wv-grid-item>
      <wv-grid-item class="demo-grid-item" @click="onClick">
        <img :src="thumbSmall" slot="icon">
        <span slot="label">点击事件</span>
      </wv-grid-item>

      <wv-grid-item class="demo-grid-item">
        <span class="custom-content">自定义内容</span>
      </wv-grid-item>
      <wv-grid-item class="demo-grid-item">
        <span class="custom-content">自定义内容</span>
      </wv-grid-item>
      <wv-grid-item class="demo-grid-item">
        <span class="custom-content">自定义内容</span>
      </wv-grid-item>
    </wv-grid>
  </div>
</template>

<script>
  import thumbSmall from '../assets/images/icon_tabbar.png'

  export default {
    data () {
      return {
        thumbSmall
      }
    },

    methods: {
      onClick () {
        this.$root.message('click')
      }
    }
  }
</script>

<style scoped lang="scss">
  .demo-grid-item {
    background-color: white;
  }

  .custom-content {
    display: block;
    overflow: hidden;
    color: #555;
    font-size: 13px;
    text-align: center;
    height: 50px;
  }
</style>
