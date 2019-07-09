<template>
  <div class="page">
    <w-group title="基本示例">
      <w-cell
        title="时间"
        :value="demoTime | datetimeFilter('time')"
        is-link
        @click="openPicker('timePicker')"
      />
      <w-cell
        title="日期"
        :value="demoDate | datetimeFilter('date')"
        is-link
        @click="openPicker('datePicker')"
      />
      <w-cell
        title="日期时间"
        :value="demoDatetime1 | datetimeFilter('datetime')"
        is-link
        @click="openPicker('datetimePicker')"
      />
    </w-group>

    <w-group title="高级示例">
      <w-cell
        title="自定义模板"
        :value="demoDatetime2 | datetimeFilter('datetime')"
        is-link
        @click="openPicker('formatDatetimePicker')"
      />
      <w-cell
        title="自定义范围"
        :value="demoDatetime3 | datetimeFilter('datetime')"
        is-link
        @click="openPicker('rangeDatetimePicker')"
      />
    </w-group>

    <w-datetime-picker
      type="time"
      ref="timePicker"
      v-model="demoTime"
      @confirm="onConfirm"
    />

    <w-datetime-picker
      type="date"
      ref="datePicker"
      v-model="demoDate"
      @confirm="onConfirm"
    />

    <w-datetime-picker
      type="datetime"
      ref="datetimePicker"
      v-model="demoDatetime1"
      @confirm="onConfirm"
    />

    <w-datetime-picker
      type="datetime"
      ref="formatDatetimePicker"
      v-model="demoDatetime2"
      @confirm="onConfirm"
      year-format="{value}年"
      month-format="{value}月"
      date-format="{value}日"
      hour-format="{value}时"
      minute-format="{value}分"
    />

    <w-datetime-picker
      type="datetime"
      ref="rangeDatetimePicker"
      v-model="demoDatetime3"
      @confirm="onConfirm"
      :start-date="new Date('2017/01/01 00:00')"
      :end-date="new Date('2020/01/01 23:00')"
    />
  </div>
</template>

<script>
const timeNow = new Date()
const year = timeNow.getFullYear()
const month = timeNow.getMonth()
const date = timeNow.getDate()
const hour = timeNow.getHours()
const minute = timeNow.getMinutes()

export default {
  data () {
    return {
      demoTime: `${hour}:${minute}`,
      demoDatetime1: new Date(year, month, date, hour, minute, 0),
      demoDatetime2: new Date(),
      demoDatetime3: new Date(),
      demoDate: new Date()
    }
  },

  mounted () {
    this.haha = true
  },

  methods: {
    openPicker (ref) {
      this.$refs[ref].open()
    },

    onConfirm (value) {
      let message = ''

      if (value !== null && typeof value === 'object') {
        let year = value.getFullYear()
        let month = value.getMonth() + 1
        let date = value.getDate()
        let hour = value.getHours()
        let minute = value.getMinutes()

        message = `${year}-${month}-${date} ${hour}:${minute}`
      } else {
        message = value
      }

      this.$toast({
        duration: 3000,
        message: message,
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

        return type === 'date'
          ? `${year}-${month}-${date}`
          : `${year}-${month}-${date} ${hour}:${minute}`
      } else {
        return value
      }
    }
  }
}
</script>
