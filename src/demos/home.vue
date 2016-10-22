<template>
  <div id="home">
    <vui-grid>
      <vui-grid-item v-for="nav in navs" :to="nav.path">
        <img src="../assets/icon_tabbar.png" slot="icon">
        {{ nav.name }}
      </vui-grid-item>
    </vui-grid>
  </div>
</template>

<script>
import navs from '../route/index.js'

export default {
  mounted () {
    console.log(navs)
  },

  data () {
    return {
      navs: navs
    }
  },

  methods: {
  }
}
</script>

<style scoped lang="scss">
  .icon {
    color: #000;
    font-size: 18px;
  }
</style>