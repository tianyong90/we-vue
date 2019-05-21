<template>
  <form class="form-inline ml-auto mr-2">
    <input
      id="algolia-search-input"
      class="form-control algolia-search-input search-query"
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
      default: () => {}
    }
  },

  watch: {
    options(newValue) {
      this.$el.innerHTML =
        '<input class="form-control d-flex ml-2 mr-auto algolia-search-input search-query" id="asalgolia-search-input" placeholder="搜索文档">'

      this.initialize(newValue)
    }
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
              debug: true // Set debug to true if you want to inspect the dropdown
            })
          )
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.algolia-search-input {
  background: url(/svg/icon_search.svg) no-repeat 98% 50%;
  background-size: 1.4rem;

  &:focus {
    outline: none;
    border-color: #41b883;
    box-shadow: 0 0 0 1px #41b883, 0 0 0 0.2rem rgba(41, 184, 83, 0.25);
  }

  &::placeholder {
    color: #999;
  }
}
</style>
