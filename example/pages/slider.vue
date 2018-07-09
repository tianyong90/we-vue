<template>
  <div class="page page-with-padding">
    <div class="tips">禁用</div>
    <wv-slider
      v-model="percent1"
      disabled
    />

    <div class="tips">自定义最大最小值</div>
    <wv-slider
      v-model="percent2"
      :min="10"
      :max="80"
      :step="10"
    />

    <div class="tips">禁用点击操作</div>
    <wv-slider
      v-model="percent3"
      :enable-click="false"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      percent1: 20,
      percent2: 55,
      percent3: 10
    }
  }
}
</script>

<style scoped lang="scss">
  .page {
    padding-top: 5em;
    background-color: #fff;

    .tips {
      margin-top: 2em;
      font-size: 14px;
      color: #666;
      margin-left: 1em;
    }
  }
</style>
