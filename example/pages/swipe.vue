<template>
  <div class="page">
    <!-- <wv-swipe class="demo-swipe" :height="130" :auto="4000">
      <wv-swipe-item class="demo-swipe-item" style="background-color: #f44336">1</wv-swipe-item>
      <wv-swipe-item class="demo-swipe-item" style="background-color: #ffc107">2</wv-swipe-item>
      <wv-swipe-item class="demo-swipe-item" style="background-color: #03a9f4">3</wv-swipe-item>
      <wv-swipe-item class="demo-swipe-item" style="background-color: #03a9f4">4</wv-swipe-item>
    </wv-swipe>

    <wv-swipe class="demo-swipe" :height="130" :auto="0">
      <wv-swipe-item class="demo-swipe-item" style="background-color: #f44336">1</wv-swipe-item>
      <wv-swipe-item class="demo-swipe-item" style="background-color: #ffc107">2</wv-swipe-item>
      <wv-swipe-item class="demo-swipe-item" style="background-color: #03a9f4">3</wv-swipe-item>
    </wv-swipe>

    <wv-swipe class="demo-swipe" :height="130" :show-indicators="false" :auto="5000">
      <wv-swipe-item class="demo-swipe-item" style="background-color: #f44336">单张轮播</wv-swipe-item>
    </wv-swipe> -->

    <!-- <wv-swipe2 class="demo-swipe" :height="130" :auto="0">
      <wv-swipe-item class="demo-swipe-item" style="background-color: #f44336">1</wv-swipe-item>
      <wv-swipe-item class="demo-swipe-item" style="background-color: #ffc107">2</wv-swipe-item>
      <wv-swipe-item class="demo-swipe-item" style="background-color: #03a9f4">3</wv-swipe-item>
    </wv-swipe2> -->
    <div class="description">
      循环
    </div>
    <wv-swipe3 class="demo-swipe" :height="130" :auto="0" :continuous="true">
      <wv-swipe-item class="demo-swipe-item" style="background-color: #f44336"><div class="page1">1</div></wv-swipe-item>
      <wv-swipe-item class="demo-swipe-item" style="background-color: #ffc107">2</wv-swipe-item>
      <wv-swipe-item class="demo-swipe-item" style="background-color: #03a9f4">3</wv-swipe-item>
    </wv-swipe3>

    <div class="description">
      循环|间隔10px
    </div>
    <wv-swipe3 class="demo-swipe" :height="130" :auto="0" :continuous="true" :gap="10">
      <wv-swipe-item class="demo-swipe-item" style="background-color: #f44336"><div class="page1">1</div></wv-swipe-item>
      <wv-swipe-item class="demo-swipe-item" style="background-color: #ffc107">2</wv-swipe-item>
      <wv-swipe-item class="demo-swipe-item" style="background-color: #03a9f4">3</wv-swipe-item>
    </wv-swipe3>
    
    <div class="description">
      不循环|溢出缓动
    </div>
    <wv-swipe3 class="demo-swipe" :height="130" :auto="0" :continuous="false" overflow="backDrag">
      <wv-swipe-item class="demo-swipe-item" style="background-color: #f44336"><div class="page1">1</div></wv-swipe-item>
      <wv-swipe-item class="demo-swipe-item" style="background-color: #ffc107">2</wv-swipe-item>
      <wv-swipe-item class="demo-swipe-item" style="background-color: #03a9f4">3</wv-swipe-item>
    </wv-swipe3>
  </div>
</template>

<style scoped lang="scss">
  .demo-swipe {
    margin-bottom: 50px;

    .demo-swipe-item {
      font-size: 1.2rem;
      color: white;
      font-weight: bold;
      text-align: center;
      line-height: 130px;

      .page1 {
        width: 100%;
        height: 200px;
      }
    }
  }

  .description {
    padding-top: 5px; 
    padding-bottom: 15px;
    font-size: 16px;
    text-align: center;
  }
</style>
