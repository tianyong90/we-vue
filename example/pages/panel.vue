<template>
  <div class="page">
    <wv-panel title="图文组合列表">
      <wv-media-box :thumb="thumb" title="标题一" :description="description" to="/"></wv-media-box>
      <wv-media-box :thumb="thumb" title="标题二" :description="description" to="/"></wv-media-box>

      <wv-cell title="查看更多" is-link slot="ft"></wv-cell>
    </wv-panel>

    <wv-panel title="文字组合列表">
      <wv-media-box :thumb="thumb" title="标题一" :description="description" to="/" type="text"></wv-media-box>
      <wv-media-box :thumb="thumb" title="标题二" :description="description" to="/" type="text"></wv-media-box>

      <wv-cell title="查看更多" is-link slot="ft"></wv-cell>
    </wv-panel>

    <wv-panel title="小图文组合列表">
      <wv-cell title="文字标题" is-link to="/">
        <img :src="thumbSmall" alt="" slot="icon" class="cell-icon">
      </wv-cell>
      <wv-cell title="文字标题" is-link to="/">
        <img :src="thumbSmall" alt="" slot="icon" class="cell-icon">
      </wv-cell>
    </wv-panel>

    <wv-panel title="文字列表附来源">
      <wv-media-box :thumb="thumb" title="标题一" :description="description" to="/" type="text">
        <ul class="weui-media-box__info" slot="box_ft">
          <li class="weui-media-box__info__meta">文字来源</li>
          <li class="weui-media-box__info__meta">时间</li>
          <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">其它信息</li>
        </ul>
      </wv-media-box>
    </wv-panel>
  </div>
</template>

<script type="text/babel">
import thumb from '../assets/wevue_placeholder.png'
import thumbSmall from '../assets/icon_tabbar.png'
const description = 'we-vue 是一套丰富灵活的组件包，结合了 vue.js 易用的组件机制和 weui 的官方视觉样式……'

export default {
  data () {
    return {
      thumb,
      thumbSmall,
      description
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
