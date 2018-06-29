<template>
  <div class="page">
    <wv-group title="带说明的列表项">
      <wv-cell title="标题文字" value="说明文字"/>
    </wv-group>

    <wv-group title="带图标、说明的列表项">
      <wv-cell title="标题文字">
        <img :src="imgIcon" slot="icon" class="cell-icon">
        <span slot="ft">说明文字</span>
      </wv-cell>
      <wv-cell title="标题文字" value="说明文字">
        <img :src="imgIcon" slot="icon" class="cell-icon">
      </wv-cell>
    </wv-group>

    <wv-group title="带跳转的列表项">
      <wv-cell title="vue-router 链接" is-link to="/"/>
      <wv-cell title="url 链接" is-link url="http://demo.wevue.org"/>
    </wv-group>

    <wv-group title="带说明、跳转的列表项">
      <wv-cell title="vue-router 链接" value="to='/'" is-link to="/"/>
      <wv-cell title="url 链接" value="url='http://demo.wevue.org'" is-link url="http://demo.wevue.org"/>
    </wv-group>

    <wv-group title="带图标、说明、跳转的列表项">
      <wv-cell title="vue-router 链接" value="to='/'" is-link to="/">
        <img :src="imgIcon" slot="icon" class="cell-icon">
      </wv-cell>
      <wv-cell title="url 链接" value="url='http://demo.wevue.org'" is-link url="http://demo.wevue.org">
        <img :src="imgIcon" slot="icon" class="cell-icon">
      </wv-cell>
    </wv-group>
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
