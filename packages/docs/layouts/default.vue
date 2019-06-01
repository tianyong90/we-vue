<template>
  <div :class="`theme-${theme}`">
    <Header />
    <nuxt class="main" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import Header from '@/components/header.vue'

export default Vue.extend({
  head() {
    return {
      // 酷暑模板
      titleTemplate: `%s - WE-VUE`,
    }
  },

  components: {
    Header,
  },

  computed: {
    ...mapState({
      theme: state => state.theme,
    }),
  },
})
</script>
