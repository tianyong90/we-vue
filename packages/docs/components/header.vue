<template>
  <header class="bg-blue-600 sticky top-0 z-50 px-6 py-2">
    <div class="w-full flex flex-row items-center overflow-visible">
      <nuxt-link to="/">
        <img class="w-12 h-12" src="/images/logo.png" alt="we-vue" />
      </nuxt-link>

      <div class="ml-auto flex items-center">
        <DocsearchBox v-if="$route.path.includes('/doc')" :options="searchBoxOptions" />

        <ul class="flex flex-row list-none">
          <li class="mr-6">
            <nuxt-link class="text-white no-underline text-lg" to="/doc/v2/index">文档</nuxt-link>
          </li>
          <li class="mr-6">
            <nuxt-link class="text-white no-underline text-lg" :to="`/doc/${version}/changelog`"
              >变更记录</nuxt-link
            >
          </li>
          <li class="mr-6">
            <a
              class="text-white no-underline text-lg"
              href="https://github.com/tianyong90/we-vue/issues/new/choose"
              target="new"
              >问题反馈</a
            >
          </li>
          <li class="mr-6">
            <a
              class="text-white no-underline text-lg"
              href="https://github.com/tianyong90/we-vue"
              target="new"
              ><i class="fab fa-github"></i> GitHub</a
            >
          </li>
          <li v-show="versionPickerVisible" class="ml-6 relative overflow-visible dropdown">
            <a
              class="dropdown-toggle text-white no-underline text-lg"
              href="#"
              role="button"
              @click.prevent="dropdowVisible = true"
            >
              {{ version | versionText }}
            </a>
            <div v-show="dropdowVisible" class="dropdown-menu">
              <nuxt-link
                class="text-base text-black px-8 py-1 hover:text-white hover:bg-blue-700 block no-underline"
                :class="{ active: version === 'v2' }"
                href="#"
                to="/doc/v2/index"
                >v2.x</nuxt-link
              >
              <nuxt-link
                class="text-base text-black px-8 py-1 hover:text-white hover:bg-blue-700 block no-underline"
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
    versionText: (value: string) => {
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
    searchBoxOptions(): object {
      return {
        algoliaOptions: { facetFilters: [`version:${this.version}`] },
      }
    },

    versionPickerVisible(): boolean {
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
.dropdown-menu {
  position: absolute;
  top: 30px;
  right: 0;
  padding: 0.5rem 1rem;
  background-color: #efefef;
  border: 1px solid #dcdcdc;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
</style>
