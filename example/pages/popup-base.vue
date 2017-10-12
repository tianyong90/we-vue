<template>
  <div class="page" @click="click">
    
  </div>
</template>

<script>
  import BottomMenu from '../../src/components/popup-bottom-menu'

  export default {
    data () {
      return {

      }
    },

    created () {
      this.bottomMenu = new BottomMenu({
        items: [
          {
            name: 'btn0',
            click: () => {console.log('btn0 clicked');}
          },
          {
            name: 'btn1',
            click: () => {console.log('btn1 clicked');}
          }
        ]
      })
    },

    methods: {
      click (e) {
        this.bottomMenu.open(e)
      }
    }
  }
</script>

<style scoped>
  
</style>

