<template>
  <div class="page-with-padding">
    <wv-button type="default" @click="popupVisible1 = true">默认弹出层</wv-button>
    <wv-button type="default" @click="popupVisible1 = true; height = 300">默认弹出层（指定高度为 300px）</wv-button>
    <wv-button type="default" @click="popupVisible2 = true">弹出层（点击遮罩层不关闭）</wv-button>
    <wv-button type="default" @click="popupVisible3 = true">弹出层（自定义遮罩背景色）</wv-button>

    <wv-popup v-model="popupVisible1" @show="onShow" @hide="onHide" :height="height" background-color="white">
      <wv-group>
        <wv-switch title="关闭" v-model="popupVisible1"></wv-switch>
        <wv-cell title="title" value="value" is-link></wv-cell>
        <wv-cell title="title" value="value" is-link></wv-cell>
      </wv-group>
    </wv-popup>

    <wv-popup v-model="popupVisible2" :hide-on-mask="false" @show="onShow" @hide="onHide">
      <wv-group>
        <wv-switch title="关闭" v-model="popupVisible2"></wv-switch>
        <wv-cell title="title" value="value" is-link></wv-cell>
        <wv-cell title="title" value="value" is-link></wv-cell>
      </wv-group>
    </wv-popup>

    <wv-popup v-model="popupVisible3" mask-background-color="rgba(0, 255, 255, 0.5)" @show="onShow" @hide="onHide">
      <wv-group>
        <wv-switch title="关闭" v-model="popupVisible3"></wv-switch>
        <wv-cell title="title" value="value" is-link></wv-cell>
        <wv-cell title="title" value="value" is-link></wv-cell>
      </wv-group>
    </wv-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      height: 'auto',
      popupVisible1: false,
      popupVisible2: false,
      popupVisible3: false
    }
  },

  methods: {
    onShow () {
      console.log('shown')
    },

    onHide () {
      this.height = 'auto'
      console.log('hidden')
    }
  }
}
</script>
