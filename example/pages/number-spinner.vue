<template>
  <div class="page">
    <wv-group title="在 cell 中使用">
      <wv-cell title="title1">
        <wv-number-spinner slot="ft" v-model="number1"></wv-number-spinner>
      </wv-cell>
      <wv-cell title="title1">
        <wv-number-spinner slot="ft" v-model="number2"></wv-number-spinner>
      </wv-cell>
      <wv-cell title="title1">
        <wv-number-spinner slot="ft" v-model="number3"></wv-number-spinner>
      </wv-cell>
    </wv-group>

    <div>
      <wv-number-spinner slot="ft" v-model="number1"></wv-number-spinner>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        number1: 1,
        number2: 2,
        number3: 3,
        number4: 4,
        number5: 5
      }
    }
  }
</script>

<style scoped lang="scss">
  .page {
    background-color: #f2f2f2;
  }
</style>
