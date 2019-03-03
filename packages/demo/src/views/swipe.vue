<template>
  <div class="page">
    <w-swipe class="demo-swipe" :height="130" :autoplay="4000">
      <w-swipe-item style="background-color: #f44336"/>
      <w-swipe-item style="background-color: #ffc107"/>
      <w-swipe-item style="background-color: #03a9f4"/>
    </w-swipe>

    <w-swipe class="demo-swipe" :height="80">
      <w-swipe-item style="background-color: #f44336"/>
      <w-swipe-item style="background-color: #ffc107"/>
      <w-swipe-item style="background-color: #03a9f4"/>
    </w-swipe>

    <w-swipe class="demo-swipe" :height="130" :show-indicators="false">
      <w-swipe-item style="background-color: #f44336;">
        <div class="tips">只有一张 :)</div>
      </w-swipe-item>
    </w-swipe>
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
