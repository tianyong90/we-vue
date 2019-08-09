<template>
  <div class="page">
    <wv-swipe class="demo-swipe" :height="130" :autoplay="4000">
      <wv-swipe-item style="background-color: #f44336" />
      <wv-swipe-item style="background-color: #ffc107" />
      <wv-swipe-item style="background-color: #03a9f4" />
    </wv-swipe>

    <wv-swipe class="demo-swipe" :height="80">
      <wv-swipe-item style="background-color: #f44336" />
      <wv-swipe-item style="background-color: #ffc107" />
      <wv-swipe-item style="background-color: #03a9f4" />
    </wv-swipe>

    <wv-swipe class="demo-swipe" :height="130" :show-indicators="false">
      <wv-swipe-item style="background-color: #f44336;">
        <div class="tips">
          只有一张 :)
        </div>
      </wv-swipe-item>
    </wv-swipe>
  </div>
</template>

<style scoped lang="scss">
  .demo-swipe {
    margin-bottom: 50px;

    .tips {
      display: flex;
      height: 100%;
      color: white;
      justify-content: center;
      align-items: center;
    }
  }
</style>
