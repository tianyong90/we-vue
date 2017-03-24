<template>
  <wv-navbar v-model="selected" @change="changed" fixed background-color="lightgrey">
    <wv-navbar-item id="item1">选项1</wv-navbar-item>
    <wv-navbar-item id="item2">选项2</wv-navbar-item>
    <wv-navbar-item id="item3">选项3</wv-navbar-item>
  </wv-navbar>
</template>

<script type="text/babel">
export default {
  data () {
    return {
      selected: 'item1'
    }
  },

  methods: {
    changed (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
