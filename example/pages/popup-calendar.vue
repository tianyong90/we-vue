<template>
  <div class="page" ref="page">
    <wv-group title="Canlendar">
      <wv-cell title="选择日期" is-link @click="click0"></wv-cell>
      <wv-cell title="选择日期区间" is-link @click="click1"></wv-cell>
      <wv-cell title="选择日期(快捷)" is-link @click="click2"></wv-cell>
      <wv-cell title="选择日期区间(快捷)" is-link @click="click3"></wv-cell>
      <wv-cell title="选择日期时间区间" is-link @click="click4"></wv-cell>
    </wv-group>
  </div>
</template>

<script>
  export default {
    mounted () {
      this.calendar = new this.$calendar({

      })
    },

    methods: {
      click0 (e) {
        this.calendar.open(e, {
          type: 'point',
          
          onConfirm: (result) => {
            console.log(result)
          },

          onDisableDaySelected: (days) => {
            console.log(days)
          }
        })
      },

      click1 (e) {
        this.calendar.open(e, {
          onConfirm: (start, end) => {
            console.log(start, end)
          },

          onDisableDaySelected: (days) => {
            console.log(days)
          }
        })
      },

      click2 (e) {
        this.calendar.open(e, {
          enableShortcut: true,
          type: 'point',
          
          onConfirm: (start, end) => {
            console.log(start, end)
          },

          onDisableDaySelected: (days) => {
            console.log(days)
          }
        })
      },

      click3 (e) {
        this.calendar.open(e, {
          enableShortcut: true,
          
          onConfirm: (start, end) => {
            console.log(start, end)
          },

          onDisableDaySelected: (days) => {
            console.log(days)
          }
        })
      },

      click4 (e) {
        this.calendar.open(e, {
          enableTimeSelect: true,
          
          onConfirm: (start, end) => {
            console.log(start, end)
          },

          onDisableDaySelected: (days) => {
            console.log(days)
          }
        })
      },
    }
  }
</script>

<style scoped>
  
</style>

