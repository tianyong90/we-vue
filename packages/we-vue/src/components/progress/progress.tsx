import Vue from 'vue'

import '../../scss/progress.scss'

export default Vue.extend({
  name: 'wv-progress',

  props: {
    percent: {
      type: [Number, String],
    },
    showClear: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    onClickCancel (e: MouseEvent) {
      e.preventDefault()
      this.$emit('cancel', this)
    },
  },

  render (h) {
    return (
      <div class="weui-progress">
        <div class="weui-progress__bar">
          <div
            class="weui-progress__inner-bar js_progress"
            style={{ width: this.percent + '%' }}
          />
        </div>
        {
          this.showClear
            ? <span class="weui-progress__opr">
              <i class="weui-icon-cancel" onClick={(e: MouseEvent) => { this.onClickCancel(e) }}/>
            </span>
            : h()
        }
      </div>
    )
  },
})
