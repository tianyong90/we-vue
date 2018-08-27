<template>
  <div class="page">
    <wv-panel title="图文组合列表">
      <wv-media-box
        :thumb="thumb"
        title="标题一"
        :description="descriptionRouterLink"
        to="/"
      />
      <wv-media-box
        :thumb="thumb"
        title="标题二"
        :description="descriptionUrl"
        url="/"
      />

      <wv-cell title="查看更多" is-link slot="ft"/>
    </wv-panel>

    <wv-panel title="文字组合列表">
      <wv-media-box
        :thumb="thumb"
        title="标题一"
        :description="descriptionRouterLink"
        to="/"
        type="text"
      />
      <wv-media-box
        :thumb="thumb"
        title="标题二"
        :description="descriptionUrl"
        url="/"
        type="text"
      />

      <wv-cell title="查看更多" is-link slot="ft"/>
    </wv-panel>

    <wv-panel title="小图文组合列表">
      <wv-cell title="文字标题" is-link to="/">
        <img :src="thumbSmall" slot="icon" class="cell-icon">
      </wv-cell>
      <wv-cell title="文字标题" is-link to="/">
        <img :src="thumbSmall" slot="icon" class="cell-icon">
      </wv-cell>
    </wv-panel>

    <wv-panel title="文字列表附来源">
      <wv-media-box :thumb="thumb" title="标题一" :description="descriptionRouterLink" to="/" type="text">
        <ul class="weui-media-box__info" slot="box_ft">
          <li class="weui-media-box__info__meta">文字来源</li>
          <li class="weui-media-box__info__meta">时间</li>
          <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">其它信息</li>
        </ul>
      </wv-media-box>
    </wv-panel>
  </div>
</template>

<script>
import thumb from '../assets/images/wevue_placeholder.png'
import thumbSmall from '../assets/images/icon_tabbar.png'
const descriptionRouterLink = '这里是一些描述文字。本例使用 vue-router 进行跳转'
const descriptionUrl = '这里是一些描述文字。本例使用 url 进行跳转'

export default {
  data () {
    return {
      thumb,
      thumbSmall,
      descriptionRouterLink,
      descriptionUrl
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
