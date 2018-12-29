<template>
  <div class="page page-with-padding">
    <wv-circle
      class="circle-1"
      :line-width="3"
      :value="12"
    >12 %</wv-circle>

    <wv-circle
      class="circle-1"
      :line-width="4"
      fill-color="yellow"
      :value="12"
    >12 %</wv-circle>

    <wv-slider v-model="sliderValue"/>

    <wv-circle
      class="circle-2"
      :line-width="5"
      stroke-color="#f44336"
      v-model="sliderValue"
      :diameter="200"
    >{{ sliderValue }}%</wv-circle>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sliderValue: 20
    }
  }
}
</script>

<style scoped lang="scss">
  .circle-1 {
    display: block;
    margin: 0 auto 40px;
  }

  .circle-2 {
    display: block;
    margin: 20px auto;
  }
</style>
