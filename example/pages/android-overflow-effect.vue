<template>
  <div class="page">
    <wv-android-overflow-effect class="list">
      <div class="content">拖动出现安卓溢出效果</div>
    </wv-android-overflow-effect>
  </div>
</template>

<script>
  export default {
    methods: {
      
    }
  }
</script>

<style scoped lang="scss">
  .list{
    width: 100vw;
    height: 100vh;
  }

  .content{
    width: 120%;
    height: 120%;
  }
</style>
