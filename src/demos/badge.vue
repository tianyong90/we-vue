<template>
	<div>
		<div class="buttons-big">
			<div class="row">
        <vui-badge type="success" size="large">success</vui-badge>
        <vui-badge type="success" size="large">success</vui-badge>
        <vui-badge type="success" size="large">success</vui-badge>
        <vui-badge type="success" size="large">success</vui-badge>
      </div>
      <div class="row">
        <vui-badge type="success" size="normal">success</vui-badge>
        <vui-badge type="success" size="normal">success</vui-badge>
        <vui-badge type="success" size="normal">success</vui-badge>
        <vui-badge type="success" size="normal">success</vui-badge>
      </div>
      <div class="row">
        <vui-badge type="success" size="small">success</vui-badge>
        <vui-badge type="success" size="small">success</vui-badge>
        <vui-badge type="success" size="small">success</vui-badge>
        <vui-badge type="success" size="small">success</vui-badge>
      </div>

      <vui-cell-group>
        <vui-cell title="hello" value="world">
          未读消息 <vui-badge>10</vui-badge>
        </vui-cell>
      </vui-cell-group>
		</div>
	</div>
</template>

<script type="text/babel">
export default {
  mounted () {
  }
}
</script>

<style scoped lang="scss">
.row {
  display: block;
  padding: .2rem 1rem;
}
</style>