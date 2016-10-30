<template>
  <div>
    <vui-cell-group title="带说明的列表项">
      <vui-cell title="标题文字" value="说明文字"></vui-cell>
    </vui-cell-group>

    <vui-cell-group title="带图标、说明的列表项">
      <vui-cell title="标题文字" value="说明文字">
        <img src="" alt="" slot="icon" style="width:20px;height:20px;background:red;">
      </vui-cell>
      <vui-cell title="标题文字" value="说明文字">
        <img src="" alt="" slot="icon" style="width:20px;height:20px;background:red;">
      </vui-cell>
    </vui-cell-group>

    <vui-cell-group title="带跳转的列表项">
      <vui-cell title="标题文字" is-link to="/"></vui-cell>
      <vui-cell title="标题文字" is-link to="/"></vui-cell>
    </vui-cell-group>

    <vui-cell-group title="带说明、跳转的列表项">
      <vui-cell title="标题文字" value="说明文字" is-link to="/"></vui-cell>
      <vui-cell title="标题文字" value="说明文字" is-link to="/"></vui-cell>
    </vui-cell-group>

    <vui-cell-group title="带图标、说明、跳转的列表项">
      <vui-cell title="标题文字" value="说明文字" is-link to="/">
        <img src="" alt="" slot="icon" style="width:20px;height:20px;background:red;">
      </vui-cell>
      <vui-cell title="标题文字" value="说明文字" is-link to="/">
        <img src="" alt="" slot="icon" style="width:20px;height:20px;background:red;">
      </vui-cell>
    </vui-cell-group>
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
</style>