<template>
  <wv-navbar @change="onchange">
    <wv-navbar-item id="1"></wv-navbar-item>
    <wv-navbar-item id="2"></wv-navbar-item>
    <wv-navbar-item id="3"></wv-navbar-item>
  </wv-navbar>
</template>

<script>
  import Navbar from '@/components/navbar'
  import NavbarItem from '@/components/navbar-item'

  export default {
    components: {
      [Navbar.name]: Navbar,
      [NavbarItem.name]: NavbarItem
    },

    props: {
      gutter: Number
    },

    methods: {
      onchange () {
      }
    }
  }
</script>

<style scoped>
</style>
