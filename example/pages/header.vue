<template>
	<div class="page">
    <wv-header fixed title="we-vue" @headerClick="onHeaderClick"></wv-header>
	</div>
</template>

<script type="text/babel">
export default {

  methods: {
    onHeaderClick (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
