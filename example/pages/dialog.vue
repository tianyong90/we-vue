<template>
  <div class="page page-with-padding buttons">
    <wv-button type="primary" @click.native="showDialog()">primary</wv-button>
    <wv-button type="primary" @click.native="showDialog()">primary</wv-button>
  </div>
</template>

<script type="text/babel">
export default {
  methods: {
    showDialog () {
      console.log(123)
    }
  }
}
</script>

<style scoped lang="scss">
  .buttons {
    display: block;
    width: 80%;
    margin:20px auto;
  }
</style>
