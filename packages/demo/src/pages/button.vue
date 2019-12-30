<template>
  <div class="page page-with-padding">
    <div class="buttons-big">
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

    <div class="buttons-plain">
      <w-button type="default" :plain="true">按钮</w-button>
      <w-button type="default" :plain="true" disabled>按钮</w-button>
      <w-button type="primary" :plain="true">按钮</w-button>
      <w-button type="primary" :plain="true" disabled>按钮</w-button>
    </div>

    <div class="buttons-mini">
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
.buttons-big {
  display: block;
  margin: 10px auto;
}

.buttons-plain {
  display: block;
  width: 60%;
  margin: 10px auto;
}

.buttons-mini {
  display: block;
  width: 60%;
  margin: 10px auto;
}
</style>
