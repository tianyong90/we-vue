<template>
  <header class="navbar navbar-expand flex-column flex-md-row fixed-top">
    <div class="container-fluid justify-content-between">
      <router-link class="navbar-brand" to="/" exact>
        <img class="d-block logo" src="../assets/images/logo.png" alt="we-vue">
      </router-link>

      <DocsearchBox
        v-if="$route.path.indexOf('/doc') > -1"
        :options="searchBoxOptions"
      />

      <div class="navbar-nav-scroll">
        <ul class="navbar-nav ml-3">
          <li class="nav-item">
            <router-link to="/doc/v2/index">文档</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/doc/changelog">变更记录</router-link>
          </li>
          <li class="nav-item">
            <a href="https://github.com/tianyong90/we-vue/issues/new/choose" target="new">问题反馈</a>
          </li>
          <li class="nav-item">
            <a href="https://github.com/tianyong90/we-vue" target="new"><i class="fab fa-github"></i> GitHub</a>
          </li>
          <li class="nav-item dropdown" v-if="$route.name !== 'home'">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ version | versionText }}
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" :class="{ 'active': version === 'v2' }" href="#" @click.prevent="changeVersion('v2')">v2.x</a>
              <a class="dropdown-item" :class="{ 'active': version === 'v3' }" href="#" @click.prevent="changeVersion('v3')">v3.x</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import DocsearchBox from './docsearch-box'

export default {
  name: 'doc-header',

  components: {
    DocsearchBox
  },

  props: {
    versionPickerVisible: Boolean
  },

  data () {
    return {
      version: this.$route.meta.version
    }
  },

  computed: {
    searchBoxOptions () {
      return {
        algoliaOptions: { facetFilters: [`version:${this.version}`] }
      }
    }
  },

  methods: {
    changeVersion (version) {
      this.version = version
      this.$router.push(`/doc/${version}/index`)
    }
  },

  beforeRouteUpdate (to, from, next) {
    this.version = to.meta.version

    next()
  },

  filters: {
    versionText: value => {
      return value.replace('_', '.')
    }
  }
}
</script>

<style scoped lang="scss">
$header-height: 70px;
$header-background-color: #fff;
$header-home-background-color: #040f23;

.navbar {
  height: $header-height;
  background-color: $header-background-color;
  z-index: 100;
  border-bottom: 1px solid #dfdfdf;

  .logo {
    width: 55px;
    height: 55px;
  }

  .navbar-nav {
    a {
      color: #333;
      text-decoration: none;
      display: inline-block;
      padding: 0 1em;

      &:hover {
        color: #41b883;
      }

      &.router-link-active {
        color: #41b883;
      }
    }
  }
}
</style>
