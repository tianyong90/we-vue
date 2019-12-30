<template>
  <div class="flex flex-col py-3">
    <div class="my-3">
      <w-button type="primary">页面主要操作</w-button>
      <w-button type="primary" is-loading>页面主要操作</w-button>
      <w-button type="primary" disabled>页面主要操作</w-button>
      <w-button type="default">页面次要操作</w-button>
      <w-button type="default" is-loading>页面次要操作</w-button>
      <w-button type="default" disabled>页面次要操作</w-button>
      <w-button type="warn">警告类操作</w-button>
      <w-button type="warn" is-loading>警告类操作</w-button>
      <w-button type="warn" disabled>警告类操作</w-button>
    </div>

    <div class="my-6">
      <w-button type="default" :plain="true">按钮</w-button>
      <w-button type="default" :plain="true" disabled>按钮</w-button>
      <w-button type="primary" :plain="true">按钮</w-button>
      <w-button type="primary" :plain="true" disabled>按钮</w-button>
    </div>

    <w-group class="my-6">
      <div class="cell">
        <!--TODO:-->
        <w-button type="default" :cell="true">按钮</w-button>
      </div>
    </w-group>

    <div class="my-6 mx-auto">
      <w-button type="primary" :mini="true">按钮</w-button>
      <w-button type="default" :mini="true">按钮</w-button>
      <w-button type="warn" :mini="true">按钮</w-button>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
</style>
