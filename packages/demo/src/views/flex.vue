<template>
  <div class="page page-with-padding">
    <w-flex class="demo-flex">
      <w-flex-item>
        <div class="placeholder"/>
      </w-flex-item>
    </w-flex>

    <w-flex class="demo-flex">
      <w-flex-item>
        <div class="placeholder" style="background-color: #bbb">1/2</div>
      </w-flex-item>
      <w-flex-item>
        <div class="placeholder" style="background-color: #cecece">1/2</div>
      </w-flex-item>
    </w-flex>

    <w-flex :gutter="10" class="demo-flex">
      <w-flex-item>
        <div class="placeholder">1/3</div>
      </w-flex-item>
      <w-flex-item>
        <div class="placeholder">1/3</div>
      </w-flex-item>
      <w-flex-item>
        <div class="placeholder">1/3</div>
      </w-flex-item>
    </w-flex>

    <w-flex :gutter="5" class="demo-flex">
      <w-flex-item>
        <div class="placeholder">1/4</div>
      </w-flex-item>
      <w-flex-item flex="2">
        <div class="placeholder">1/2</div>
      </w-flex-item>
      <w-flex-item>
        <div class="placeholder">1/4</div>
      </w-flex-item>
    </w-flex>

    <w-flex :gutter="0" class="demo-flex">
      <w-flex-item>
        <div class="placeholder">1/3</div>
      </w-flex-item>
      <w-flex-item>
        <div class="placeholder">1/3</div>
      </w-flex-item>
      <w-flex-item offset="25%">
        <div class="placeholder">1/3</div>
      </w-flex-item>
    </w-flex>
  </div>
</template>

<script>
export default {
  mounted () {},

  data () {
    return {}
  },

  methods: {}
}
</script>

<style scoped lang="scss">
.demo-flex {
  margin: 15px 0;
}

.placeholder {
  background-color: #c0c0c0;
  height: 2.3em;
  line-height: 2.3em;
  text-align: center;
  color: #fff;
}
</style>
