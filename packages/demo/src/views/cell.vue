<template>
  <div class="page">
    <w-group title="带说明的列表项">
      <w-cell title="标题文字" value="说明文字"/>
    </w-group>

    <w-group title="带图标、说明的列表项">
      <w-cell title="标题文字">
        <img :src="imgIcon" slot="icon" class="cell-icon">
        <span slot="ft">说明文字</span>
      </w-cell>
      <w-cell title="标题文字" value="说明文字">
        <img :src="imgIcon" slot="icon" class="cell-icon">
      </w-cell>
    </w-group>

    <w-group title="带跳转的列表项">
      <w-cell title="vue-router 链接" is-link to="/"/>
      <w-cell title="url 链接" is-link href="http://demo.wevue.org"/>
    </w-group>

    <w-group title="带说明、跳转的列表项">
      <w-cell title="vue-router 链接" value="to='/'" is-link to="/"/>
      <w-cell title="url 链接" value="url='http://demo.wevue.org'" is-link href="http://demo.wevue.org"/>
    </w-group>

    <w-group title="带图标、说明、跳转的列表项">
      <w-cell title="vue-router 链接" value="to='/'" is-link to="/">
        <img :src="imgIcon" slot="icon" class="cell-icon">
      </w-cell>
      <w-cell title="url 链接" value="url='http://demo.wevue.org'" is-link href="http://demo.wevue.org">
        <img :src="imgIcon" slot="icon" class="cell-icon">
      </w-cell>
    </w-group>
  </div>
</template>

<script>
import imgIcon from '../assets/images/icon_tabbar.png'

export default {
  data () {
    return {
      imgIcon
    }
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
