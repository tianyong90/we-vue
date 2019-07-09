import Vue from 'vue'

import '@/scss/progress.scss'

export default Vue.extend({
  name: 'w-progress',

  props: {
    percent: {
      type: [Number, String],
      required: true,
      validator: (val: number) => val >= 0 && val <= 100,
    },
    showClear: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: '#09bb07',
    },
    backgroundColor: {
      type: String,
      default: '#ebebeb',
    },
    strokeWidth: {
      type: Number,
      default: 3,
      validator: (val: number) => val > 0,
    },
    borderRadius: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    style (): object {
      return {
        height: `${this.strokeWidth}px`,
        backgroundColor: this.backgroundColor,
        borderRadius: `${this.borderRadius}px`,
      }
    },

    barStyle (): object {
      return {
        width: `${this.percent}%`,
        height: `${this.strokeWidth}px`,
        backgroundColor: this.color,
        borderRadius: `${this.borderRadius}px`,
      }
    },
  },

  methods: {
    onClickCancel (e: MouseEvent) {
      e.preventDefault()
      this.$emit('cancel', this)
    },
  },

  render () {
    return (
      <div class="weui-progress">
        <div class="weui-progress__bar" style={this.style}>
          <div
            class="weui-progress__inner-bar js_progress"
            style={this.barStyle}
          />
        </div>
        {
          this.showClear &&
            <span class="weui-progress__opr">
              <i class="weui-icon-cancel" onClick={(e: MouseEvent) => { this.onClickCancel(e) }}/>
            </span>
        }
      </div>
    )
  },
})
