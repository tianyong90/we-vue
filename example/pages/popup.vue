<template>
  <div class="page page-with-padding">
    <wv-button type="default" @click="popupVisible1 = true">默认弹出层</wv-button>
    <wv-button type="default" @click="popupVisible2 = true">指定高度为 300px</wv-button>
    <wv-button type="default" @click="popupVisible3 = true">指定高度 100%</wv-button>
    <wv-button type="default" @click="popupVisible4 = true">点击遮罩层不关闭</wv-button>
    <wv-button type="default" @click="popupVisible5 = true">自定义遮罩样式</wv-button>

    <wv-popup :visible.sync="popupVisible1">
      <wv-group>
        <wv-switch title="关闭" v-model="popupVisible1"></wv-switch>
        <wv-cell title="title" value="value" is-link></wv-cell>
        <wv-cell title="title" value="value" is-link></wv-cell>
      </wv-group>
    </wv-popup>

    <wv-popup :visible.sync="popupVisible2" :height="300">
      <wv-group>
        <wv-switch title="关闭" v-model="popupVisible2"></wv-switch>
        <wv-cell title="title" value="value" is-link></wv-cell>
        <wv-cell title="title" value="value" is-link></wv-cell>
      </wv-group>
    </wv-popup>

    <wv-popup :visible.sync="popupVisible3" height="100%">
      <wv-group>
        <wv-switch title="关闭" v-model="popupVisible3"></wv-switch>
        <wv-cell title="title" value="value" is-link></wv-cell>
        <wv-cell title="title" value="value" is-link></wv-cell>
      </wv-group>
    </wv-popup>

    <wv-popup :visible.sync="popupVisible4"
              :close-on-click-mask="false"
              @open="onShow"
              @close="onHide"
    >
      <wv-group>
        <wv-switch title="关闭" v-model="popupVisible4"></wv-switch>
        <wv-cell title="title" value="value" is-link></wv-cell>
        <wv-cell title="title" value="value" is-link></wv-cell>
      </wv-group>
    </wv-popup>

    <wv-popup :visible.sync="popupVisible5"
              :mask-style="{ backgroundColor: 'rgba(0, 255, 255, 0.5)' }"
    >
      <wv-group>
        <wv-switch title="关闭" v-model="popupVisible5"></wv-switch>
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
        popupVisible1: false,
        popupVisible2: false,
        popupVisible3: false,
        popupVisible4: false,
        popupVisible5: false
      }
    },

    methods: {
      onShow () {
        console.log('shown')
      },

      onHide () {
        console.log('hidden')
      }
    }
  }
</script>
