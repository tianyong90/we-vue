<template>
  <div class="page">
    <w-grid>
      <w-grid-item class="demo-grid-item" to="/">
        <img src="../assets/images/icon_tabbar.png" slot="icon">
        <span slot="label">vue-router 跳转</span>
      </w-grid-item>
      <w-grid-item class="demo-grid-item" to="/">
        <img src="../assets/images/icon_tabbar.png" slot="icon">
        <span slot="label">vue-router 跳转</span>
      </w-grid-item>
      <w-grid-item class="demo-grid-item" to="/">
        <img src="../assets/images/icon_tabbar.png" slot="icon">
        <span slot="label">vue-router 跳转</span>
      </w-grid-item>
      <w-grid-item class="demo-grid-item" url="/">
        <img src="../assets/images/icon_tabbar.png" slot="icon">
        <span slot="label">url 跳转</span>
      </w-grid-item>
      <w-grid-item class="demo-grid-item" url="/">
        <img src="../assets/images/icon_tabbar.png" slot="icon">
        <span slot="label">url 跳转</span>
      </w-grid-item>
      <w-grid-item class="demo-grid-item" url="/">
        <img src="../assets/images/icon_tabbar.png" slot="icon">
        <span slot="label">url 跳转</span>
      </w-grid-item>
      <w-grid-item class="demo-grid-item" @click="onClick">
        <img src="../assets/images/icon_tabbar.png" slot="icon">
        <span slot="label">点击事件</span>
      </w-grid-item>
      <w-grid-item class="demo-grid-item" @click="onClick">
        <img src="../assets/images/icon_tabbar.png" slot="icon">
        <span slot="label">点击事件</span>
      </w-grid-item>
      <w-grid-item class="demo-grid-item" @click="onClick">
        <img src="../assets/images/icon_tabbar.png" slot="icon">
        <span slot="label">点击事件</span>
      </w-grid-item>

      <w-grid-item class="demo-grid-item">
        <span class="custom-content">自定义内容</span>
      </w-grid-item>
      <w-grid-item class="demo-grid-item">
        <span class="custom-content">自定义内容</span>
      </w-grid-item>
      <w-grid-item class="demo-grid-item">
        <span class="custom-content">自定义内容</span>
      </w-grid-item>
    </w-grid>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  methods: {
    onClick () {
      this.$root.message('click')
    },
  },
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
