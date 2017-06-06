<template>
  <div class="page">
    <wv-group title="新消息提示跟摘要信息后，统一在列表右侧">
      <wv-cell title="单行列表" is-link>
        <span slot="ft" style="vertical-align: middle; font-size: 17px;">详细信息</span>
        <wv-badge :is-dot="true" slot="ft" style="margin-left: 5px; margin-right: 5px;"></wv-badge>
      </wv-cell>
    </wv-group>

    <wv-group title="未读数红点跟在主题信息后，统一在列表左侧">
      <wv-cell class="cell-big-thumb">
        <div slot="icon" style="position: relative;margin-right: 10px;">
          <img :src="thumb" style="width: 50px; height: 50px;display: block">
          <wv-badge style="position: absolute;top: -.4em;right: -.4em;">2</wv-badge>
        </div>
        <template slot="bd">
          <p>联系人名称</p>
          <p style="font-size: 13px;color: #888888;">摘要信息</p>
        </template>
      </wv-cell>
      <wv-cell is-link>
        <span slot="bd" style="vertical-align: middle;">单行列表</span>
        <wv-badge slot="bd" style="margin-left: 5px;">2</wv-badge>
      </wv-cell>
      <wv-cell value="详细信息" is-link>
        <span slot="bd" style="vertical-align: middle;">单行列表</span>
        <wv-badge slot="bd" style="margin-left: 5px;">8</wv-badge>
      </wv-cell>
      <wv-cell is-link>
        <span slot="bd" style="vertical-align: middle;">单行列表</span>
        <wv-badge slot="bd" style="margin-left: 5px;">New</wv-badge>
      </wv-cell>
    </wv-group>
  </div>
</template>

<script>
  import thumb from '../assets/images/wevue_placeholder.png'

  export default {
    data () {
      return {
        thumb
      }
    }
  }
</script>
