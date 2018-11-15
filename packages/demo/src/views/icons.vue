<template>
  <div class="page">
    <wv-grid>
      <wv-grid-item
        v-for="type in iconTypes"
        :key="type"
      >
        <wv-icon :type="type" :large="false" slot="icon"/>
        <span slot="label" v-text="type"/>
      </wv-grid-item>
    </wv-grid>
  </div>
</template>

<script>
export default {
  data () {
    return {
      iconTypes: [
        'success',
        'info',
        'warn',
        'waiting',
        'success-no-circle',
        'circle',
        'info-circle',
        'download',
        'cancel',
        'search'
      ]
    }
  }
}
</script>

<style scoped lang="scss">
</style>
