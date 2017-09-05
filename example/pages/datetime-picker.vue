<template>
  <div class="page">
    <wv-group title="基本示例">
      <wv-cell title="时间" :value="value1 | datetimeFilter('time')" is-link @click.native="$refs.picker1.open()"></wv-cell>
      <wv-cell title="日期" :value="value2 | datetimeFilter('date')" is-link @click.native="$refs.picker2.open()"></wv-cell>
      <wv-cell title="日期时间" :value="value3 | datetimeFilter('datetime')" is-link @click.native="$refs.picker3.open()"></wv-cell>
    </wv-group>

    <wv-group title="高级示例">
      <wv-cell title="自定义模板" :value="value4 | datetimeFilter('date')" is-link @click.native="$refs.picker4.open()"></wv-cell>
      <wv-cell title="设置初始值" :value="value5 | datetimeFilter('date')" is-link @click.native="$refs.picker5.open()"></wv-cell>
      <wv-cell title="自定义起止范围" :value="value6 | datetimeFilter('date')" is-link @click.native="$refs.picker6.open()"></wv-cell>
    </wv-group>

    <wv-datetime-picker type="time" ref="picker1" v-model="value1" @confirm="onConfirm"></wv-datetime-picker>
    <wv-datetime-picker type="date" ref="picker2" v-model="value2" @confirm="onConfirm"></wv-datetime-picker>
    <wv-datetime-picker type="datetime" ref="picker3" v-model="value3" @confirm="onConfirm"></wv-datetime-picker>

    <wv-datetime-picker type="date" ref="picker4" v-model="value4" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="onConfirm"></wv-datetime-picker>
    <wv-datetime-picker type="date" ref="picker5" v-model="value5" @confirm="onConfirm"></wv-datetime-picker>
    <wv-datetime-picker type="date" ref="picker6" v-model="value6" @confirm="onConfirm" :start-date="new Date()" :end-date="new Date(new Date().getFullYear() + 3, 4, 15)"></wv-datetime-picker>
  </div>
</template>

<script>
  import Toast from '../../src/components/toast'

  export default {
    data () {
      return {
        value1: null,
        value2: null,
        value3: null,
        value4: null,
        value5: new Date(),  // 设置初始值
        value6: null
      }
    },

    methods: {
      onConfirm (value) {
        Toast({
          duration: 3000,
          message: value.toString(),
          type: 'text'
        })
      }
    },

    filters: {
      datetimeFilter (value, type) {
        if (value !== null && typeof value === 'object') {
          let year = value.getFullYear()
          let month = value.getMonth() + 1
          let date = value.getDate()
          let hour = value.getHours()
          let minute = value.getMinutes()

          return type === 'date' ? `${year}-${month}-${date}` : `${year}-${month}-${date} ${hour}:${minute}`
        } else {
          return value
        }
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
