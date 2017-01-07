<template>
  <div class="page-with-padding">
    <wv-button type="default" @click.native="showPopup">显示弹出层</wv-button>

    <wv-picker></wv-picker>
  </div>
</template>

<script type="text/babel">
// import { PickerSlot } from './picker-slot.vue'
export default {
  methods: {
    showPopup () {
      console.log(123)
    }
  }
}
</script>

<style scoped lang="scss">
  .popup-body {
    display: block;
    overflow: hidden;
    background: white;
  }
</style>
