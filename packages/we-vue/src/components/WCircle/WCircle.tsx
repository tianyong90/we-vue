import '../../scss/circle.scss'

import Vue from 'vue'

export default Vue.extend({
  name: 'w-circle',

  props: {
    diameter: {
      type: Number,
      default: 100,
    },
    lineWidth: {
      type: Number,
      default: 4,
    },
    strokeColor: {
      type: String,
      default: '#3FC7FA',
    },
    trailColor: {
      type: String,
      default: '#D9D9D9',
    },
    fillColor: {
      type: String,
      default: 'transparent',
    },
    speed: {
      type: Number,
      default: 500,
    },
    value: {
      type: Number,
      default: 0,
    },
  },

  data () {
    return {
      currentValue: this.value as any,
    }
  },

  computed: {
    style (): object {
      return {
        width: this.diameter + 'px',
        height: this.diameter + 'px',
      }
    },

    pathRadius (): number {
      return (this.diameter - this.lineWidth) / 2
    },

    radius (): number {
      return this.diameter / 2
    },

    pathString (): string {
      return `M ${this.radius},${this.radius} m 0,-${this.pathRadius}
      a ${this.pathRadius},${this.pathRadius} 0 1 1 0,${2 * this.pathRadius}
      a ${this.pathRadius},${this.pathRadius} 0 1 1 0,-${2 * this.pathRadius}`
    },

    len (): number {
      return Math.PI * 2 * this.pathRadius
    },

    pathStyle (): object {
      return {
        'stroke-dasharray': `${this.len}px ${this.len}px`,
        'stroke-dashoffset': `${((100 - this.currentValue) / 100) *
        this.len}px`,
        transition: `stroke-dashoffset ${this.speed}ms ease 0s, stroke ${this.speed}ms ease`,
      }
    },
  },

  watch: {
    currentValue (val): void {
      this.$emit('input', val)
    },

    value (val): void {
      this.currentValue = val
    },
  },

  render () {
    return (
      <div class="wv-circle" style={this.style}>
        <svg
          width={this.diameter}
          height={this.diameter}
          viewBox={'0 0 ' + this.diameter + ' ' + this.diameter}
        >
          <path
            d={this.pathString}
            stroke={this.trailColor}
            stroke-width={this.lineWidth}
            fill="none"
          />
          <path
            d={this.pathString}
            stroke-linecap="round"
            stroke={this.strokeColor}
            stroke-width={this.lineWidth}
            style={this.pathStyle}
            fill={this.fillColor}
          />
          <text
            class="wv-circle-content"
            text-anchor="middle"
            dominant-baseline="middle"
            x="50%"
            y="50%"
          >
            {this.$slots.default}
          </text>
        </svg>
      </div>
    )
  },
})
