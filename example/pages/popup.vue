<template>
  <div class="page-with-padding">
    <wv-button type="default" @click.native="showPopup">显示弹出层</wv-button>

    <wv-popup v-model="popupVisible">
      <wv-group>
        <wv-switch title="title" v-model="switchValue"></wv-switch>
        <wv-cell title="title" value="value" is-link></wv-cell>
        <wv-cell title="title" value="value" is-link></wv-cell>
      </wv-group>
    </wv-popup>
  </div>
</template>

<script type="text/babel">
export default {
  data () {
    return {
      popupVisible: false,
      switchValue: false
    }
  },

  methods: {
    showPopup () {
      this.popupVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
</style>
