<template>
  <div class="page-with-padding">
    <wv-button type="default" @click.native="popupVisible1 = true">默认弹出层</wv-button>
    <wv-button type="default" @click.native="popupVisible2 = true">弹出层（点击遮罩层不关闭）</wv-button>
    <wv-button type="default" @click.native="popupVisible3 = true">弹出层（自定义遮罩背景色）</wv-button>

    <wv-popup v-model="popupVisible1">
      <wv-group>
        <wv-switch title="关闭" v-model="popupVisible1"></wv-switch>
        <wv-cell title="title" value="value" is-link></wv-cell>
        <wv-cell title="title" value="value" is-link></wv-cell>
      </wv-group>
    </wv-popup>

    <wv-popup v-model="popupVisible2" :hide-on-mask="false">
      <wv-group>
        <wv-switch title="关闭" v-model="popupVisible2"></wv-switch>
        <wv-cell title="title" value="value" is-link></wv-cell>
        <wv-cell title="title" value="value" is-link></wv-cell>
      </wv-group>
    </wv-popup>

    <wv-popup v-model="popupVisible3" mask-background-color="rgba(0, 255, 255, 0.5)">
      <wv-group>
        <wv-switch title="关闭" v-model="popupVisible3"></wv-switch>
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
      popupVisible1: false,
      popupVisible2: false,
      popupVisible3: false
    }
  }
}
</script>
