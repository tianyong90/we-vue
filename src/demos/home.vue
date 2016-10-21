<template>
  <div id="home">
    <vui-grid>
      <vui-grid-item v-for="nav in navs" :to="nav.path">
        <i class="iconfont icon" slot="icon">&#xe601;</i>
        {{ nav.name }}
      </vui-grid-item>
    </vui-grid>
  </div>
</template>

<script>
import navs from '../route/index.js'

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
  .icon {
    color: #000;
    font-size: 18px;
  }
</style>