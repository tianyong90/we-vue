<template>
  <form class="">
    <input
      id="algolia-search-input"
      class="appearance-none p-2 rounded-full border-none focus:shadow-outline bg-blue-700 text-white search-input"
      placeholder="搜索文档"
    />
  </form>
</template>

<script>
import 'docsearch.js/dist/cdn/docsearch.min.css'

export default {
  name: 'DocsearchBox',

  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },

  watch: {
    options(newValue) {
      this.$el.innerHTML =
        '<input class="form-control d-flex ml-2 mr-auto algolia-search-input search-query" id="asalgolia-search-input" placeholder="搜索文档">'

      this.initialize(newValue)
    },
  },

  mounted() {
    this.initialize()
  },

  methods: {
    initialize() {
      if (window) {
        import('docsearch.js').then(({ default: docsearch }) => {
          docsearch(
            Object.assign(this.options, {
              apiKey: 'feb33c2506cdece7f0267859a856767a',
              indexName: 'wevue',
              inputSelector: '#algolia-search-input',
              debug: true, // Set debug to true if you want to inspect the dropdown
            })
          )
        })
      }
    },
  },
}
</script>

<style scoped lang="scss">
.search-input {
  background-image: url(/svg/icon_search.svg);
  background-repeat: no-repeat;
  background-position: 95% center;
  background-size: 1.4rem;

  &::placeholder {
    color: #ccc;
  }
}
</style>
