<template>
	<div class="page">
    <wv-group title="新消息提示跟摘要信息后，统一在列表右侧">
      <wv-cell title="单行列表" is-link>
        <span slot="ft" style="vertical-align: middle; font-size: 17px;">详细信息</span>
        <wv-badge :is-dot="true" slot="ft" style="margin-left: 5px; margin-right: 5px;"></wv-badge>
      </wv-cell>
    </wv-group>

    <wv-group title="未读数红点跟在主题信息后，统一在列表左侧">
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

<script type="text/babel">
export default {
}
</script>

<style scoped lang="scss">
</style>
