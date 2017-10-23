<template>
  <div class="page" ref="page">
    <wv-group title="Canlendar">
      <wv-cell title="样例" is-link @click="click0"></wv-cell>
    </wv-group>
  </div>
</template>

<script>
  export default {
    mounted () {
      this.calendar = new this.$calendar({

      })
    },

    methods: {
      click0 (e) {
        this.calendar.open(e)
      }
    }
  }
</script>

<style scoped>
  
</style>

