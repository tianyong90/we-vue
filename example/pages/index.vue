<template>
  <div class="page">
    <wv-search placeholder="搜索组件" v-model="keyword" :result="filterResult">
      <wv-group v-show="keyword">
        <wv-cell v-for="item in filterResult" :title="item.name" :to="item.path" is-link></wv-cell>
      </wv-group>
    </wv-search>

    <wv-group :title="navGroup.groupTitle" v-for="navGroup in navs">
      <wv-cell v-for="nav in navGroup.navItems" :to="nav.path" is-link :title="nav.name">
        <wv-badge slot="ft" v-if="nav.status === 'todo'">Todo</wv-badge>
      </wv-cell>
    </wv-group>
  </div>
</template>

<script type="text/babel">
import { navs } from '../route/index.js'

export default {
  data () {
    return {
      navs: navs,
      keyword: '',
      componentList: []
    }
  },

  mounted () {
    navs.map(navGroup => {
      this.componentList = this.componentList.concat(navGroup.navItems)
    })
  },

  computed: {
    filterResult () {
      return this.componentList.filter(value => new RegExp(this.keyword, 'i').test(value.name))
    }
  }
}
</script>
