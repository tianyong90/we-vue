<template>
  <div class="page">
    <div class="demo-tips">默认示例</div>
    <w-swipe class="demo-swipe" :height="130" :autoplay="4000">
      <w-swipe-item style="background-color: #f44336"/>
      <w-swipe-item style="background-color: #ffc107"/>
      <w-swipe-item style="background-color: #03a9f4"/>
    </w-swipe>

    <div class="demo-tips">自定义高度</div>
    <w-swipe class="demo-swipe" :height="80">
      <w-swipe-item style="background-color: #f44336"/>
      <w-swipe-item style="background-color: #ffc107"/>
      <w-swipe-item style="background-color: #03a9f4"/>
    </w-swipe>

    <div class="demo-tips">隐藏指示器</div>
    <w-swipe class="demo-swipe" :height="100" :show-indicators="false">
      <w-swipe-item style="background-color: #f44336;">
        <div class="tips">只有一张 :)</div>
      </w-swipe-item>
    </w-swipe>

    <div class="demo-tips">自定义指示器</div>
    <w-swipe class="demo-swipe" :height="100">
      <w-swipe-item style="background-color: #f44336"/>
      <w-swipe-item style="background-color: #ffc107"/>
      <w-swipe-item style="background-color: #03a9f4"/>
      <div slot="indicator" class="my-indicator">
      </div>
    </w-swipe>
  </div>
</template>

<style scoped lang="scss">
.demo-tips {
  display: block;
  text-align: center;
  font-size: 0.875rem;
  color: #393939;
}

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

.my-indicator {
  position: absolute;
  bottom: 0;
  color: #fff;
  z-index: 999;
}
</style>
