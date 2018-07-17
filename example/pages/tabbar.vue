<template>
  <div>
    <wv-tab-container
      swipeable
    >
      <wv-tab-container-item>
        <div class="tab-page-content bg1">1</div>
      </wv-tab-container-item>
      <wv-tab-container-item>
        <div class="tab-page-content bg2">2</div>
      </wv-tab-container-item>
      <wv-tab-container-item>
        <div class="tab-page-content bg3">3</div>
      </wv-tab-container-item>
    </wv-tab-container>

    <wv-tabbar>
      <wv-tabbar-item to="/" is-on>
        <span slot="icon" class="tab-icon">
          <img
            class="weui-tabbar__icon"
            src="../assets/images/icon_tabbar.png"
            slot="icon"
          >
          <wv-badge style="position: absolute;top: -2px;right: -13px;">8</wv-badge>
        </span>
        微信
      </wv-tabbar-item>
      <wv-tabbar-item to="/tabbar">
        <img
          class="weui-tabbar__icon"
          src="../assets/images/icon_tabbar.png"
          slot="icon"
        > 通讯录
      </wv-tabbar-item>
      <wv-tabbar-item to="/">
        <span slot="icon" class="tab-icon">
          <img
            class="weui-tabbar__icon"
            src="../assets/images/icon_tabbar.png"
            slot="icon"
          >
          <wv-badge is-dot style="position: absolute;top: 0;right: -6px;">8</wv-badge>
        </span>
        发现
      </wv-tabbar-item>
      <wv-tabbar-item to="/profile">
        <img
          class="weui-tabbar__icon"
          src="../assets/images/icon_tabbar.png"
          slot="icon"
        > 我
      </wv-tabbar-item>
    </wv-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
  .tab-icon {
    display: inline-block;
    position: relative;
  }

  .tab-page-content {
    /*display: block;*/
    overflow: hidden;
    width: 100%;
    padding: 30px 0;
    /*text-align: center;*/
    color: #000;
  }

  .bg1 {
    background-color: #f00;
  }

  .bg2 {
    background-color: #ff0;
  }

  .bg3 {
    background-color: #f0f;
  }
</style>
