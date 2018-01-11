<template>
  <div class="doc-content">
    <changelog-md/>
  </div>
</template>

<script>
import 'highlight.js/styles/github.css'

export default {
  components: {
    'changelog-md': () => import('../../CHANGELOG.md')
  }
}
</script>

<style scoped lang="scss">
  .doc-content {
    display: block;
    width: 1000px;
    overflow: hidden;
    margin: 20px auto 30px;
    padding: 1.8rem;
    border-radius: .5em;
    background-color: #fff;
  }
</style>
