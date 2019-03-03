<template>
  <div>
    <w-tabbar>
      <w-tabbar-item to="/" is-on>
        <span slot="icon" class="tab-icon">
          <img
            class="weui-tabbar__icon"
            src="../assets/images/icon_tabbar.png"
            slot="icon"
          >
          <w-badge style="position: absolute;top: -2px;right: -13px;">8</w-badge>
        </span>
        微信
      </w-tabbar-item>
      <w-tabbar-item to="/tabbar">
        <img
          class="weui-tabbar__icon"
          src="../assets/images/icon_tabbar.png"
          slot="icon"
        > 通讯录
      </w-tabbar-item>
      <w-tabbar-item to="/">
        <span slot="icon" class="tab-icon">
          <img
            class="weui-tabbar__icon"
            src="../assets/images/icon_tabbar.png"
            slot="icon"
          >
          <w-badge is-dot style="position: absolute;top: 0;right: -6px;">8</w-badge>
        </span>
        发现
      </w-tabbar-item>
      <w-tabbar-item to="/profile">
        <img
          class="weui-tabbar__icon"
          src="../assets/images/icon_tabbar.png"
          slot="icon"
        > 我
      </w-tabbar-item>
    </w-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">
.tab-icon {
  display: inline-block;
  position: relative;
}
</style>
