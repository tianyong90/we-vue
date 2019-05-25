<template>
  <header
    class="navbar navbar-expand flex-column flex-md-row fixed-top"
    :class="['navbar-' + theme]"
  >
    <div class="container-fluid justify-content-between">
      <nuxt-link class="navbar-brand" to="/">
        <img class="d-block logo" src="/images/logo.png" alt="we-vue" />
      </nuxt-link>

      <DocsearchBox v-if="$route.path.indexOf('/doc') > -1" :options="searchBoxOptions" />

      <div class="navbar-nav-scroll">
        <ul class="navbar-nav ml-3">
          <li class="nav-item">
            <nuxt-link to="/doc/v2/index">文档</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link :to="`/doc/${version}/changelog`">变更记录</nuxt-link>
          </li>
          <li class="nav-item">
            <a href="https://github.com/tianyong90/we-vue/issues/new/choose" target="new"
              >问题反馈</a
            >
          </li>
          <li class="nav-item">
            <a href="https://github.com/tianyong90/we-vue" target="new"
              ><i class="fab fa-github"></i> GitHub</a
            >
          </li>
          <li v-show="versionPickerVisible" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              @click.prevent="dropdowVisible = true"
            >
              {{ version | versionText }}
            </a>
            <div v-show="dropdowVisible" class="dropdown-menu dropdown-menu-right">
              <nuxt-link
                class="dropdown-item"
                :class="{ active: version === 'v2' }"
                href="#"
                to="/doc/v2/index"
                >v2.x</nuxt-link
              >
              <nuxt-link
                class="dropdown-item"
                :class="{ active: version === 'v3' }"
                href="#"
                to="/doc/v3/index"
                >v3.x</nuxt-link
              >
            </div>
          </li>
        </ul>
      </div>

      <!--TODO: 亮暗主题切换-->
      <!--<div class="iconfont icon-light theme-toggle" @click="toggleTheme"></div>-->
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import DocsearchBox from './docsearch-box'

export default Vue.extend({
  name: 'DocHeader',

  components: {
    DocsearchBox,
  },

  filters: {
    versionText: value => {
      return value + '.x'
    },
  },

  props: {
    theme: {
      type: String,
      default: 'lighter',
    },
  },

  data() {
    return {
      version: this.$route.params.version,
      dropdowVisible: false,
    }
  },

  computed: {
    searchBoxOptions() {
      return {
        algoliaOptions: { facetFilters: [`version:${this.version}`] },
      }
    },

    versionPickerVisible() {
      return this.$route.path.startsWith('/doc')
    },
  },

  watch: {
    '$route.params'(params) {
      const { version } = params
      this.version = version
    },
  },

  mounted() {
    window.addEventListener(
      'click',
      e => {
        if (!e.target.parentNode.classList.contains('dropdown')) {
          this.dropdowVisible = false
        }
      },
      false
    )
  },

  methods: {
    toggleTheme() {
      const theme = this.$store.state.theme === 'dark' ? 'light' : 'dark'
      this.$store.commit('SET_THEME', theme)
    },
  },
})
</script>

<style scoped lang="scss">
$header-height: 70px;
$header-background-color: #fff;
$header-home-background-color: #040f23;

.dropdown-menu {
  display: block;
}

.navbar {
  height: $header-height;
  background-color: $header-background-color;
  border-bottom: 1px solid #dfdfdf;
  z-index: 65535;

  .logo {
    width: 55px;
    height: 55px;
  }

  &.navbar-lighter {
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

  &.navbar-darker {
    .navbar-nav {
      a {
        color: #fff;
        text-decoration: none;
        display: inline-block;
        padding: 0 1em;

        &:hover {
          color: #222;
        }

        &.router-link-active {
          color: #222;
        }
      }
    }
  }
}

.theme-toggle {
  font-size: 1.5rem;
  font-weight: 500;
  color: #000;
  cursor: pointer;
}
</style>
