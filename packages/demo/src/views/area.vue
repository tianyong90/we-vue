<template>
  <div class="page">
    <wv-group title="省市区选择示例">
      <wv-cell title="默认" is-link @click.native="showPickerDefault"/>
      <wv-cell title="两列" is-link @click.native="showPickerTwoColumns"/>
    </wv-group>

    <wv-area
      :visible.sync="pickerShowDefault"
      :area-list="area"
      @confirm="confirmArea"
      v-model="selectedArea"
    />

    <wv-area
      :visible.sync="pickerShowTwoColumns"
      :area-list="area"
      value-key="name"
      columns-count="2"
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
      pickerShowDefault: false,
      pickerShowTwoColumns: false,
      area: areaList,
      code: '110101',
      selectedArea: '110101'
    }
  },

  mounted () {},

  methods: {
    showPickerDefault () {
      this.pickerShowDefault = true
    },

    showPickerTwoColumns () {
      this.pickerShowTwoColumns = true
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
