<template>
  <div>
    <wv-tab-container
      swipeable
    >
      <wv-tab-container-item>
        <div class="tab-page-content">1</div>
      </wv-tab-container-item>
      <wv-tab-container-item>
        <div class="tab-page-content">2</div>
      </wv-tab-container-item>
      <wv-tab-container-item>
        <div class="tab-page-content">3</div>
      </wv-tab-container-item>
    </wv-tab-container>

    <wv-tabbar>
      <wv-tabbar-item to="/" is-on>
        <span slot="icon" style="display: inline-block; position: relative;">
          <img class="weui-tabbar__icon" :src="thumbSmall" slot="icon">
          <wv-badge style="position: absolute;top: -2px;right: -13px;">8</wv-badge>
        </span>
        微信
      </wv-tabbar-item>
      <wv-tabbar-item to="/tabbar">
        <img class="weui-tabbar__icon" :src="thumbSmall" slot="icon"> 通讯录
      </wv-tabbar-item>
      <wv-tabbar-item to="/">
        <span slot="icon" style="display: inline-block; position: relative;">
          <img class="weui-tabbar__icon" :src="thumbSmall" slot="icon">
          <wv-badge is-dot style="position: absolute;top: 0;right: -6px;">8</wv-badge>
        </span>
        发现
      </wv-tabbar-item>
      <wv-tabbar-item to="/profile">
        <img class="weui-tabbar__icon" :src="thumbSmall" slot="icon"> 我
      </wv-tabbar-item>
    </wv-tabbar>
  </div>
</template>

<script>
import thumbSmall from '../assets/images/icon_tabbar.png'

export default {
  data () {
    return {
      thumbSmall
    }
  }
}
</script>

<style scoped lang="scss">
  .tab-page-content {
    /*display: block;*/
    overflow: hidden;
    width: 100%;
    padding: 30px 0;
    /*text-align: center;*/
    color: #000;
  }
</style>
