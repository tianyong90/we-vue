import Vue from 'vue'

const MIN_DISTANCE = 10
function getDirection (x: number, y: number): string {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal'
  }
  if (y > x && y > MIN_DISTANCE) {
    return 'vertical'
  }
  return ''
}

interface options extends Vue {
  startX: number
  startY: number
  deltaX: number
  deltaY: number
  offsetX: number
  offsetY: number
}

export default Vue.extend<Vue & options>().extend({
  name: 'touchable',

  data () {
    return {
      direction: '',
    }
  },

  methods: {
    touchStart (event: TouchEvent): void {
      this.resetTouchStatus()
      this.startX = event.touches[0].clientX
      this.startY = event.touches[0].clientY
    },

    touchMove (event: TouchEvent): void {
      const touch = event.touches[0]
      this.deltaX = touch.clientX - this.startX
      this.deltaY = touch.clientY - this.startY
      this.offsetX = Math.abs(this.deltaX)
      this.offsetY = Math.abs(this.deltaY)
      this.direction = this.direction || getDirection(this.offsetX, this.offsetY)
    },

    resetTouchStatus (): void {
      this.direction = ''
      this.deltaX = 0
      this.deltaY = 0
      this.offsetX = 0
      this.offsetY = 0
    },
  },
})
