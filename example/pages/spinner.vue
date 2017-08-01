<template>
  <div>
    <wv-group title="默认示例">
      <wv-cell :title="type" v-for="type in types" :key="type">
        <wv-spinner :type="type" slot="ft"></wv-spinner>
      </wv-cell>
    </wv-group>

    <wv-group title="指定大小(24px)">
      <wv-cell :title="type" v-for="type in types" :key="type" v-if="type !== 'default'">
        <wv-spinner :type="type" :size="24" slot="ft"></wv-spinner>
      </wv-cell>
    </wv-group>

    <wv-group title="指定颜色(red)">
      <wv-cell :title="type" v-for="type in types" :key="type" v-if="type !== 'default'">
        <wv-spinner :type="type" color="red" slot="ft"></wv-spinner>
      </wv-cell>
    </wv-group>
  </div>
</template>

<script>
  const SPINNER_TYPES = ['default', 'snake', 'double-snake', 'dot-circle', 'bar-circle']

  export default {
    data () {
      return {
        types: SPINNER_TYPES
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
