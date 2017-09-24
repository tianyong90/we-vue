<template>
  <div>
    <wv-navbar v-model="navbar1_selected" @change="changed" fixed>
      <wv-navbar-item id="navbar1_item1">选项1</wv-navbar-item>
      <wv-navbar-item id="navbar1_item2">选项2</wv-navbar-item>
      <wv-navbar-item id="navbar1_item3">选项3</wv-navbar-item>
    </wv-navbar>

    <div class="demo-wrapper">
      <span class="demo-label">自定义激活项颜色</span>
      <wv-navbar v-model="navbar2_selected" @change="changed" active-color="red">
        <wv-navbar-item id="navbar2_item1">选项1</wv-navbar-item>
        <wv-navbar-item id="navbar2_item2">选项2</wv-navbar-item>
        <wv-navbar-item id="navbar2_item3">选项3</wv-navbar-item>
      </wv-navbar>
    </div>

    <div class="demo-wrapper">
      <span class="demo-label">自定义激活指示线宽度</span>
      <wv-navbar v-model="navbar3_selected" @change="changed" :line-width="1">
        <wv-navbar-item id="navbar3_item1">选项1</wv-navbar-item>
        <wv-navbar-item id="navbar3_item2">选项2</wv-navbar-item>
        <wv-navbar-item id="navbar3_item3">选项3</wv-navbar-item>
      </wv-navbar>
    </div>

    <div class="demo-wrapper">
      <span class="demo-label">禁用过渡动效</span>
      <wv-navbar v-model="navbar4_selected" @change="changed" :animate="false">
        <wv-navbar-item id="navbar4_item1">选项1</wv-navbar-item>
        <wv-navbar-item id="navbar4_item2">选项2</wv-navbar-item>
        <wv-navbar-item id="navbar4_item3">选项3</wv-navbar-item>
      </wv-navbar>
    </div>

    <div class="demo-wrapper">
      <span class="demo-label">有禁用项</span>
      <wv-navbar v-model="navbar5_selected" @change="changed">
        <wv-navbar-item id="navbar5_item1">选项1</wv-navbar-item>
        <wv-navbar-item id="navbar5_item2">选项2</wv-navbar-item>
        <wv-navbar-item id="navbar5_item3" :disabled="true">选项3</wv-navbar-item>
      </wv-navbar>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        navbar1_selected: 'navbar1_item2',
        navbar2_selected: 'navbar2_item2',
        navbar3_selected: 'navbar3_item2',
        navbar4_selected: 'navbar4_item2',
        navbar5_selected: 'navbar5_item2'
      }
    },

    methods: {
      changed (e) {
        console.log(e)
      }
    }
  }
</script>

<style scoped lang="scss">
  .demo-wrapper {
    display: block;
    overflow: hidden;
    margin: 100px 0 50px;

    .demo-label {
      display: block;
      font-size: 13px;
      color: #555;
      margin-bottom: .5em;
      text-align: center;
    }
  }
</style>
