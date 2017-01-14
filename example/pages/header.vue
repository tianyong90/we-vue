<template>
	<div class="page">
    <wv-header :showCloseBtn="false" title="wevue" @headerClick="onHeaderClick" @btnBackClick="onBtnBackClick" @btnCloseClick="onBtnCloseClick" @menuClick="onMenuClick"></wv-header>
	</div>
</template>

<script type="text/babel">
export default {
  methods: {
    onHeaderClick () {
      console.log('header clicked')
    },

    onBtnBackClick () {
      console.log('back button clicked')
    },

    onBtnCloseClick () {
      console.log('back close clicked')
    },

    onMenuClick () {
      console.log('back menu clicked')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
