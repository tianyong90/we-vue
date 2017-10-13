<template>
  <div class="page" @click="click">
  </div>
</template>

<script>
  import Dialog from '../../src/components/popup-dialog'

  export default {

    created () {
      this.dialog = new Dialog({
        
      })

      this.dialog2 = new Dialog({
        
      })
    },

    methods: {
      click (e) {
        this.dialog.open(e)
      }
    }
  }
</script>

<style scoped>
  
</style>

