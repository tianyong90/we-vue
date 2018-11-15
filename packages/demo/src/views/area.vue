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
    />
  </div>
</template>

<script>
import area from '../assets/data/area'

export default {
  data () {
    return {
      pickerShow: true,
      area: area,
      code: '110101'
    }
  },

  mounted () {},

  methods: {
    showPicker () {
      this.pickerShow = true
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
