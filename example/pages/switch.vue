<template>
  <div class="page">
    <wv-group>
      <wv-switch title="开关1" v-model="switchValue1"/>
      <wv-switch title="开关2（禁用）" disabled v-model="switchValue2"/>
    </wv-group>

    <div class="standalone-switches">
      <wv-switch v-model="switchValue3" :is-in-cell="false"/>
      <wv-switch v-model="switchValue4" :is-in-cell="false" disabled/>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      switchValue1: true,
      switchValue2: false,
      switchValue3: false,
      switchValue4: true
    }
  }
}
</script>

<style scoped lang="scss">
  .standalone-switches {
    margin: 20px 0;

    .wv-switch {
      margin: 10px auto;
    }
  }
</style>
