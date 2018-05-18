<template>
  <input
    class="form-control d-flex ml-2 mr-auto algolia-search-input search-query"
    id="algolia-search-input"
    placeholder="搜索文档"
  >
</template>

<script>
import 'docsearch.js/dist/cdn/docsearch.min.css'
import docsearch from 'docsearch.js'

export default {
  name: 'docsearch-box',

  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },

  mounted () {
    this.initialize()
  },

  methods: {
    initialize () {
      docsearch(Object.assign(this.options, {
        apiKey: 'feb33c2506cdece7f0267859a856767a',
        indexName: 'wevue',
        inputSelector: '#algolia-search-input',
        debug: true // Set debug to true if you want to inspect the dropdown
      }))
    }
  },

  watch: {
    options (newValue) {
      this.$el.innerHTML = '<input class="form-control d-flex ml-2 mr-auto algolia-search-input search-query" id="asalgolia-search-input" placeholder="搜索文档">'

      this.initialize(newValue)
    }
  }
}
</script>

<style scoped lang="scss">
  .algolia-search-input {
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
