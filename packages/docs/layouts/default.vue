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

  computed: {
    ...mapState({
      theme: state => state.theme,
    }),
  },
})
</script>
