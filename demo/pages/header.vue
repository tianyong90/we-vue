<template>
  <div class="page">
    <wv-header title="wevue" @headerClick="onHeaderClick"/>

    <wv-header class="demo-header1" title="wevue" @headerClick="onHeaderClick" :fixed="false" background-color="#2196f3">
      <div class="btn-back" slot="left">
        <i class="iconfont icon-back" @click="$router.push('/')"/>
      </div>
      <div class="btn-menu" slot="right">
        <i class="iconfont icon-menu" @click="$router.push('/')"/>
      </div>
    </wv-header>

    <wv-header class="demo-header2" title="wevue" @headerClick="onHeaderClick" :fixed="false" background-color="#4caf50">
      <div class="btn-menu" slot="right">
        <i class="iconfont icon-menu" @click="$router.push('/')"/>
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
.demo-header1 {
  position: absolute;
  top: 100px;
}

.demo-header2 {
  position: absolute;
  top: 150px;
}
</style>
