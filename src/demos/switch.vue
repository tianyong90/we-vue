<template>
  <div id="home">
    <wv-group>
      <wv-switch :disabled="false" v-model="isOpen"></wv-switch>
      <wv-switch :disabled="false" v-model="isOpen"></wv-switch>
    </wv-group>
  </div>
</template>

<script type="text/babel">
export default {
  mounted () {
  },

  data () {
    return {
      isOpen: true
    }
  },

  methods: {
  }
}
</script>

<style scoped lang="sass">
</style>