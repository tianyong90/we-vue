<template>
  <div class="page">
    <wv-group title="基本示例">
      <wv-cell title="时间" :value="demoTime | datetimeFilter('time')" is-link @click.native="$refs.timePicker.open()"/>
      <wv-cell title="日期" :value="value2 | datetimeFilter('date')" is-link @click.native="$refs.picker2.open()"/>
      <wv-cell title="日期时间" :value="demoDatetime | datetimeFilter('datetime')" is-link @click.native="$refs.picker3.open()"/>
    </wv-group>

    <wv-group title="高级示例">
      <wv-cell title="自定义模板" :value="value4 | datetimeFilter('date')" is-link @click.native="$refs.picker4.open()"/>
      <wv-cell title="设置初始值" :value="value5 | datetimeFilter('date')" is-link @click.native="$refs.picker5.open()"/>
      <wv-cell title="自定义起止范围" :value="value6 | datetimeFilter('date')" is-link @click.native="$refs.picker6.open()"/>
    </wv-group>

    <wv-datetime-picker
      type="time"
      ref="timePicker"
      v-model="demoTime"
      @confirm="onConfirm"
    />

    <wv-datetime-picker
      type="datetime"
      ref="picker3"
      v-model="demoDatetime"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import Toast from '../../src/components/toast'

export default {
  data () {
    return {
      demoTime: '12:23',
      value2: null,
      demoDatetime: new Date(),
      value4: null,
      value5: new Date(), // 设置初始值
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
