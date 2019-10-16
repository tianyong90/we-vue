<template>
  <div class="page page-with-padding">
    <w-button type="default" @click="popupVisible1 = true">默认弹出层</w-button>
    <w-button type="default" @click="popupVisible2 = true">指定高度为 300px</w-button>
    <w-button type="default" @click="popupVisible3 = true">指定高度 100%</w-button>
    <w-button type="default" @click="popupVisible4 = true">点击遮罩层不关闭</w-button>
    <w-button type="default" @click="popupVisible5 = true">自定义遮罩样式</w-button>

    <w-popup :visible.sync="popupVisible1">
      <w-group>
        <w-switch title="关闭" v-model="popupVisible1"/>
        <w-cell title="title" value="value" is-link/>
        <w-cell title="title" value="value" is-link/>
      </w-group>
    </w-popup>

    <w-popup :visible.sync="popupVisible2" :height="300">
      <w-group>
        <w-switch title="关闭" v-model="popupVisible2"/>
        <w-cell title="title" value="value" is-link/>
        <w-cell title="title" value="value" is-link/>
      </w-group>
    </w-popup>

    <w-popup :visible.sync="popupVisible3" height="100%">
      <w-group>
        <w-switch title="关闭" v-model="popupVisible3"/>
        <w-cell title="title" value="value" is-link/>
        <w-cell title="title" value="value" is-link/>
      </w-group>
    </w-popup>

    <w-popup
      :visible.sync="popupVisible4"
      :close-on-click-mask="false"
      @open="onShow"
      @close="onHide"
    >
      <w-group>
        <w-switch title="关闭" v-model="popupVisible4"/>
        <w-cell title="title" value="value" is-link/>
        <w-cell title="title" value="value" is-link/>
      </w-group>
    </w-popup>

    <w-popup :visible.sync="popupVisible5" :mask-style="{ backgroundColor: 'rgba(0, 255, 255, 0.5)' }">
      <w-group>
        <w-switch title="关闭" v-model="popupVisible5"/>
        <w-cell title="title" value="value" is-link/>
        <w-cell title="title" value="value" is-link/>
      </w-group>
    </w-popup>
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
      popupVisible5: false,
    }
  },

  methods: {
    onShow () {
      console.log('shown')
    },

    onHide () {
      console.log('hidden')
    },
  },
}
</script>
