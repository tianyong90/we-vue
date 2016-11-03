<template>
	<div>
		<div class="buttons-big">
			<div class="row">
        <vui-badge type="default" size="large">default</vui-badge>
        <vui-badge type="primary" size="large">primary</vui-badge>
        <vui-badge type="warn" size="large">warn</vui-badge>
      </div>
      <div class="row">
        <vui-badge type="default" size="normal">default</vui-badge>
        <vui-badge type="primary" size="normal">primary</vui-badge>
        <vui-badge type="warn" size="normal">warnprimary</vui-badge>
      </div>
      <div class="row">
        <vui-badge type="default" size="small">default</vui-badge>
        <vui-badge type="primary" size="small">primary</vui-badge>
        <vui-badge type="warn" size="small">warnprimary</vui-badge>
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
}
</script>

<style scoped lang="scss">
.row {
  display: block;
  padding: .2rem 1rem;
}
</style>