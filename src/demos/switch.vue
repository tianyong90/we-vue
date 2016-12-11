<template>
  <div id="home">
    <vui-group>
      <vui-switch :disabled="false" v-model="isOpen"></vui-switch>
    </vui-group>
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