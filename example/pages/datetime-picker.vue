<template>
  <div class="page">
    <wv-group>
      <wv-cell title="时间" :value="time" is-link @click.native="timePickerVisible = true"></wv-cell>
      <wv-cell title="日期" :value="date" is-link @click.native="datePickerVisible = true"></wv-cell>
      <wv-cell title="日期时间" :value="datetime" is-link @click.native="datetimePickerVisible = true"></wv-cell>
    </wv-group>

    <wv-datetime-picker v-model="timePickerVisible"></wv-datetime-picker>
    <!--<wv-datetime-picker v-model="datePickerVisible"></wv-datetime-picker>-->
    <!--<wv-datetime-picker v-model="datetimePickerVisible"></wv-datetime-picker>-->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        timePickerVisible: false,
        datePickerVisible: false,
        datetimePickerVisible: false,
        time: '',
        date: '',
        datetime: ''
      }
    },

    methods: {}
  }
</script>

<style scoped lang="scss">
</style>
