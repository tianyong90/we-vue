<template>
  <div class="page">
    <wv-group title="省市区选择示例">
      <wv-cell title="默认" is-link @click.native="showPicker"/>
    </wv-group>

    <wv-area
      :visible="pickerShow"
      :area-list="area"
      value-key="name"
      @confirm="confirmArea"
      v-model="selectedArea"
    />
  </div>
</template>

<script>
import areaList from '../assets/data/area'

export default {
  data () {
    return {
      pickerShow: true,
      area: areaList,
      code: '110101',
      selectedArea: '110101'
    }
  },

  mounted () {},

  methods: {
    showPicker () {
      this.pickerShow = true
      console.log(this.pickerShow)
    },

    confirmArea () {
      console.log()
    }
  },

  filters: {
    pickerValueFilter (val) {
      if (Array.isArray(val)) {
        return val.toString()
      } else {
        return '请选择'
      }
    }
  }
}
</script>
