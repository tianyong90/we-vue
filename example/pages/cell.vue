<template>
  <div class="page">
    <wv-group title="带说明的列表项">
      <wv-cell title="标题文字" value="说明文字"></wv-cell>
    </wv-group>

    <wv-group title="带图标、说明的列表项">
      <wv-cell title="标题文字" value="说明文字">
        <img src="../assets/icon_tabbar.png" alt="" slot="icon" class="cell-icon">
      </wv-cell>
      <wv-cell title="标题文字" value="说明文字">
        <img src="../assets/icon_tabbar.png" alt="" slot="icon" class="cell-icon">
      </wv-cell>
    </wv-group>

    <wv-group title="带跳转的列表项">
      <wv-cell title="标题文字" is-link to="/"></wv-cell>
      <wv-cell title="标题文字" is-link to="/"></wv-cell>
    </wv-group>

    <wv-group title="带说明、跳转的列表项">
      <wv-cell title="标题文字" value="说明文字" is-link to="/"></wv-cell>
      <wv-cell title="标题文字" value="说明文字" is-link to="/"></wv-cell>
    </wv-group>

    <wv-group title="带图标、说明、跳转的列表项">
      <wv-cell title="标题文字" value="说明文字" is-link to="/">
        <img src="../assets/icon_tabbar.png" alt="" slot="icon" class="cell-icon">
      </wv-cell>
      <wv-cell title="标题文字" value="说明文字" is-link to="/">
        <img src="../assets/icon_tabbar.png" alt="" slot="icon" class="cell-icon">
      </wv-cell>
    </wv-group>
  </div>
</template>

<script type="text/babel">
export default {
  mounted () {
  },

  data () {
    return {
    }
  },

  methods: {
  }
}
</script>

<style scoped lang="scss">
.cell-icon {
  display: block;
  width: 20px;
  margin-right: 5px;
}
</style>
