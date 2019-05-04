<template>
  <div class="page">
    <w-group title="省市区选择示例">
      <w-cell title="默认" is-link @click.native="showPickerDefault"/>
      <w-cell title="两列" is-link @click.native="showPickerTwoColumns"/>
    </w-group>

    <w-area-picker
      :visible.sync="pickerShowDefault"
      :area-list="area"
      @confirm="confirmArea"
      v-model="selectedArea"
    />

    <w-area-picker
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
      pickerShowDefault: true,
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
