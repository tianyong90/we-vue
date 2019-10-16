<template>
  <div class="page">
    <w-group title="新消息提示跟摘要信息后，统一在列表右侧">
      <w-cell title="单行列表" is-link>
        <span slot="ft" style="vertical-align: middle; font-size: 17px;">详细信息</span>
        <w-badge :is-dot="true" slot="ft" style="margin-left: 5px; margin-right: 5px;"/>
      </w-cell>
    </w-group>

    <w-group title="未读数红点跟在主题信息后，统一在列表左侧">
      <w-cell class="cell-big-thumb">
        <div slot="icon" style="position: relative;margin-right: 10px;">
          <img src="../assets/images/wevue_placeholder.png" style="width: 50px; height: 50px;display: block">
          <w-badge style="position: absolute;top: -.4em;right: -.4em;">2</w-badge>
        </div>
        <template slot="bd">
          <p>联系人名称</p>
          <p style="font-size: 13px;color: #888888;">摘要信息</p>
        </template>
      </w-cell>
      <w-cell is-link>
        <span slot="bd" style="vertical-align: middle;">单行列表</span>
        <w-badge slot="bd" style="margin-left: 5px;">2</w-badge>
      </w-cell>
      <w-cell value="详细信息" is-link>
        <span slot="bd" style="vertical-align: middle;">单行列表</span>
        <w-badge slot="bd" style="margin-left: 5px;">8</w-badge>
      </w-cell>
      <w-cell is-link>
        <span slot="bd" style="vertical-align: middle;">单行列表</span>
        <w-badge slot="bd" style="margin-left: 5px;">New</w-badge>
      </w-cell>
    </w-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
}
</script>
