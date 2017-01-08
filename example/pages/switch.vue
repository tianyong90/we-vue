<template>
  <div id="home">
    <wv-group>
      <wv-switch title="开关1"  v-model="switchValue1"></wv-switch>
      <wv-switch title="开关2（禁用）" disabled v-model="switchValue2"></wv-switch>
    </wv-group>
  </div>
</template>

<script type="text/babel">
export default {
  data () {
    return {
      switchValue1: true,
      switchValue2: false
    }
  }
}
</script>

<style scoped lang="sass">
</style>
