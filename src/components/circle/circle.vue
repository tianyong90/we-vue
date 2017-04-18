<template>
  <div class="wv-circle" :style="style">
    <svg :width="diameter" :height="diameter" :viewBox="'0 0 ' + diameter + ' ' + diameter">
      <path :d="pathString" :stroke="trailColor" :stroke-width="lineWidth" fill="none"/>
      <path :d="pathString" stroke-linecap="round" :stroke="strokeColor" :stroke-width="lineWidth" :style="pathStyle"
            :fill="fillColor"/>
    </svg>
    <div class="wv-circle-content">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'wv-circle',

    props: {
      diameter: {
        type: Number,
        default: 100
      },
      lineWidth: {
        type: Number,
        default: 4
      },
      strokeColor: {
        type: String,
        default: '#3FC7FA'
      },
      trailColor: {
        type: String,
        default: '#D9D9D9'
      },
      fillColor: {
        type: String,
        default: 'none'
      },
      speed: {
        type: Number,
        default: 500
      },
      value: {
        type: Number,
        default: 0
      }
    },

    data () {
      return {
        currentValue: this.value
      }
    },

    computed: {
      style () {
        return {
          width: this.diameter + 'px',
          heigth: this.diameter + 'px'
        }
      },

      pathRadius () {
        return (this.diameter - this.lineWidth) / 2
      },

      radius () {
        return this.diameter / 2
      },

      pathString () {
        return `M ${this.radius},${this.radius} m 0,-${this.pathRadius}
      a ${this.pathRadius},${this.pathRadius} 0 1 1 0,${2 * this.pathRadius}
      a ${this.pathRadius},${this.pathRadius} 0 1 1 0,-${2 * this.pathRadius}`
      },

      len () {
        return Math.PI * 2 * this.pathRadius
      },

      pathStyle () {
        return {
          'stroke-dasharray': `${this.len}px ${this.len}px`,
          'stroke-dashoffset': `${((100 - this.currentValue) / 100 * this.len)}px`,
          'transition': `stroke-dashoffset ${this.speed}ms ease 0s, stroke ${this.speed}ms ease`
        }
      }
    },

    watch: {
      currentValue (val) {
        this.$emit('input', val)
      },

      value (val) {
        this.currentValue = val
      }
    }
  }
</script>

<style scoped lang="scss">
  .wv-circle {
    position: relative;
    width: 100%;
    height: 100%;

    .wv-circle-content {
      width: 100%;
      text-align: center;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
