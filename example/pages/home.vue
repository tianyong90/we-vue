<template>
  <div class="page">
    <wv-grid>
      <wv-grid-item class="demo-grid-item" v-for="nav in navs" :to="nav.path">
        <img src="../assets/icon_tabbar.png" slot="icon">
        {{ nav.name }}
      </wv-grid-item>
    </wv-grid>
  </div>
</template>

<script type="text/babel">
import { navs } from '../route/index.js'

export default {
  mounted () {
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
  .demo-grid-item {
    background-color: white;
  }

  .icon {
    color: #000;
    font-size: 18px;
  }
</style>
