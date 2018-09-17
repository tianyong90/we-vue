<template>
  <div class="page">
    <wv-group title="省市区选择示例">
      <wv-cell title="默认" is-link @click.native="showPicker"/>
    </wv-group>

    <wv-area
      :visible.sync="pickerShow"
      :area-list="area"
      value-key="name"
      @confirm="confirmArea"
      value="110101"
    />
  </div>
</template>

<script>
import area from '../assets/data/area'
// import pca from '../assets/data/pca'
//
// const provinces = Object.keys(pca)
//
// // 获取某一省下的市
// const getCities = (province) => {
//   return Object.keys(pca[province])
// }
//
// // 获取某一市下的区/县
// function getAreas (province, city) {
//   return Object.values(pca[province][city])
// }

export default {
  data () {
    return {
      pickerShow: true,
      address: [],
      area: area
    }
  },

  mounted () {
  },

  methods: {
    showPicker () {
      console.log()
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
