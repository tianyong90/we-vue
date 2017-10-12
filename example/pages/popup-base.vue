<template>
  <div class="page" @click="click">
    <img :src="logoImg" alt="">
  </div>
</template>

<script>
  import BottomMenu from '../../src/components/popup-bottom-menu'
  import logoImg from '../assets/images/logo.png'

  export default {
    data () {
      return {
        logoImg
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
            click: () => {this.bottomMenu2.open()}
          }
        ]
      })

      this.bottomMenu2 = new BottomMenu({
        items: [
          {
            name: 'btn2',
            click: () => {console.log('btn2 clicked');}
          },
          {
            name: 'btn3',
            click: () => {console.log('btn3 clicked');}
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

