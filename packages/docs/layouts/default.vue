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
  components: {
    Header,
  },
  head() {
    return {
      // 酷暑模板
      titleTemplate: `%s - WE-VUE`,
    }
  },

  computed: {
    ...mapState({
      theme: state => state.theme,
    }),
  },
})
</script>
