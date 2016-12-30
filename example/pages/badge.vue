<template>
	<div class="page">
    <wv-badge :is-dot="true" color="yellow">default</wv-badge>
    <wv-badge>default</wv-badge>


    <wv-group title="默认">
      <wv-cell title="未读消息 " value="10">
        <wv-badge :is-dot="true"></wv-badge>
      </wv-cell>
      <wv-cell title="未读消息 " value="10">
        <wv-badge :is-dot="true"></wv-badge>
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
