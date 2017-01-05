<template>
  <div class="page">
    <wv-group :title="navGroup.groupTitle" v-for="navGroup in navs">
      <wv-cell v-for="nav in navGroup.navItems" :to="nav.path" is-link :title="nav.name">
        <wv-badge slot="ft" v-if="nav.status === 'todo'">todo</wv-badge>
      </wv-cell>
    </wv-group>
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
</style>
