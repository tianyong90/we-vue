<template>
  <div class="page" ref="page">
    <wv-group title="Canlendar">
      <wv-cell title="选择日期" is-link @click="click0"></wv-cell>
      <wv-cell title="选择日期(快捷)" is-link @click="click2"></wv-cell>
      <wv-cell title="选择日期区间" is-link @click="click1"></wv-cell>
      <wv-cell title="选择日期区间(快捷)" is-link @click="click3"></wv-cell>
      <wv-cell title="选择日期时间" is-link @click="click4"></wv-cell>
      <wv-cell title="选择日期时间(快捷)" is-link @click="click5"></wv-cell>
      <wv-cell title="选择日期时间区间" is-link @click="click6"></wv-cell>
      <wv-cell title="选择日期时间区间(快捷)" is-link @click="click7"></wv-cell>
      <wv-cell title="默认选择范围" is-link @click="click8"></wv-cell>
      <wv-cell title="大行距" is-link @click="click9"></wv-cell>
      <wv-cell title="水平进入" is-link @click="click10"></wv-cell>
      <wv-cell title="支持animation.css的所有动画~" is-link @click="click11"></wv-cell>
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
          },

          animation: {
            in: {
              effect: 'zoomFromDom'
            },
            out: {
              effect: 'zoomFromDom'
            }
          }
        })
      },

      click4 (e) {
        this.calendar.open(e, {
          type: 'point',
          enableTimeSelect: true,
          
          onConfirm: (result) => {
            console.log(result)
          },

          onDisableDaySelected: (days) => {
            console.log(days)
          }
        })
      },

      click5 (e) {
        this.calendar.open(e, {
          type: 'point',
          enableTimeSelect: true,

          onConfirm: (start, end) => {
            console.log(start, end)
          },

          onDisableDaySelected: (days) => {
            console.log(days)
          }
        })
      },

      click6 (e) {
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

      click7 (e) {
        this.calendar.open(e, {
          enableTimeSelect: true,
          enableShortcut: true,
          
          onConfirm: (start, end) => {
            console.log(start, end)
          },

          onDisableDaySelected: (days) => {
            console.log(days)
          },

          animation: {
            in: {
              effect: 'zoomFromDom'
            },
            out: {
              effect: 'zoomFromDom'
            }
          }
        })
      },

      click8 (e) {
        this.calendar.open(e, {
          defaultRange: {
            startY: 2017,
            startM: 10,
            startD: 26,
            endY: 2017,
            endM: 11,
            endD: 7
          },

          onConfirm: (start, end) => {
            console.log(start, end)
          },

          onDisableDaySelected: (days) => {
            console.log(days)
          }
        })
      },

      click9 (e) {
        this.calendar.open(e, {
          isLargeRowledge: true,
          
          onConfirm: (start, end) => {
            console.log(start, end)
          },

          onDisableDaySelected: (days) => {
            console.log(days)
          }
        })
      },

      click10 (e) {
        this.calendar.open(e, {
          isLargeRowledge: true,
          
          onConfirm: (start, end) => {
            console.log(start, end)
          },

          onDisableDaySelected: (days) => {
            console.log(days)
          },

          animation: {
            in: ['animated-500', 'slideInRight'],
            out: ['animated-350', 'slideOutRight']
          }
        })
      },

      click11 (e) {
        this.calendar.open(e, {
          isLargeRowledge: true,
          
          onConfirm: (start, end) => {
            console.log(start, end)
          },

          onDisableDaySelected: (days) => {
            console.log(days)
          },

          animation: {
            in: ['animated', 'bounceIn'],
            out: ['animated', 'bounceOut']
          }
        })
      }
    }
  }
</script>

<style scoped>
  
</style>

