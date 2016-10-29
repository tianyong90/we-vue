<template>
  <div id="home">
    <vui-switch :disabled="false" v-model="isOpen"></vui-switch>
    <span>{{ isOpen }}</span>
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

<style lang="css">
</style>