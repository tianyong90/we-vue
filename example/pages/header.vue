<template>
  <div class="page">
    <wv-header title="wevue" @headerClick="onHeaderClick">
    </wv-header>

    <wv-header class="demo-header" title="wevue" @headerClick="onHeaderClick" :fixed="false" background-color="#2196f3">
      <div class="btn-back" slot="left">
        <i class="iconfont icon-back" @click="$router.push('/')"></i>
      </div>
      <div class="btn-menu" slot="right">
        <i class="iconfont icon-menu" @click="$router.push('/')"></i>
      </div>
    </wv-header>

    <wv-header class="demo-header" title="wevue" @headerClick="onHeaderClick" :fixed="false" background-color="#4caf50">
      <div class="btn-menu" slot="right">
        <i class="iconfont icon-menu" @click="$router.push('/')"></i>
      </div>
    </wv-header>
  </div>
</template>

<script>
  export default {
    methods: {
      onHeaderClick () {
        console.log('header clicked')
      }
    }
  }
</script>

<style scoped lang="scss">
  .demo-header {
    margin-bottom: 30px;
  }
</style>
