import '../../scss/number-spinner.scss'

import Vue from 'vue'

interface options extends Vue {
  $refs: {
    input: HTMLInputElement
  }
}

export default Vue.extend<options>().extend({
  name: 'w-number-spinner',

  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    inputWidth: {
      type: String,
      default: '3em',
    },
    readonly: Boolean,
    disabled: Boolean,
    align: {
      type: String,
      default: 'center',
    },
    fillable: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Number,
      default: 0,
    },
  },

  data () {
    return {
      currentValue: this.value,
    }
  },

  inheritAttrs: false,

  model: {
    event: 'change',
  },

  computed: {
    increasable (): boolean {
      const num = this.currentValue

      return Number.isNaN(num) || num < this.max
    },

    decreasable (): boolean {
      const num = this.currentValue

      return Number.isNaN(num) || num > this.min
    },

    inputStyle (): object {
      return {
        width: this.inputWidth,
        textAlign: this.align,
      }
    },

    listeners (): object {
      const listeners = { ...this.$listeners }
      delete listeners.change
      return listeners
    },
  },

  created () {
    if (this.min < this.max) {
      this.currentValue = Math.min(this.max, Math.max(this.min, this.value))
    }
  },

  methods: {
    decrease (): void {
      if (this.decreasable) {
        let { currentValue } = this
        if (Number.isNaN(currentValue)) {
          currentValue = 0
        }
        this.setValue(
          Math.min(this.max, Math.max(this.min, currentValue - this.step))
        )
      }
    },

    increase (): void {
      if (this.increasable) {
        let { currentValue } = this
        if (Number.isNaN(currentValue)) {
          currentValue = 0
        }
        this.setValue(
          Math.min(this.max, Math.max(this.min, currentValue + this.step))
        )
      }
    },

    onChange (e: { target: HTMLInputElement }): void {
      this.setValue(Math.min(this.max, Math.max(this.min, Number(e.target.value))))
    },

    onPaste (e: ClipboardEvent): void {
      if (
        !this.fillable ||
        !/^-?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?$/.test(
          e.clipboardData!.getData('text')
        )
      ) {
        e.preventDefault()
      }
    },

    onKeypress (e: Event): void {
      if (!this.fillable) {
        e.preventDefault()
      }
    },

    setValue (val: number): void {
      const oldValue = this.currentValue

      this.currentValue = val
      this.$emit('change', val, oldValue)
      this.$refs.input.value = val.toString()
    },
  },

  watch: {
    currentValue (val): void {
      this.$emit('input', val)
      this.$emit('change', val)
    },

    value (val): void {
      if (typeof val === 'number') {
        if (val <= this.min) {
          this.currentValue = this.min
        } else if (val >= this.max) {
          this.currentValue = this.max
        } else {
          this.currentValue = val
        }
      }
    },
  },

  render (h) {
    return (
      <div
        class="wv-number-spinner"
        on={this.listeners}
      >
        <button
          class="spinner-btn btn-minus"
          onClick={() => { this.decrease() }}
          disabled={this.disabled || this.readonly || !this.decreasable}
        />
        <input
          ref="input"
          type="number"
          value={this.currentValue}
          min={this.min}
          max={this.max}
          step={this.step}
          disabled={this.disabled || (!this.decreasable && !this.increasable)}
          readonly={this.readonly}
          onChange={this.onChange}
          onPaste={this.onPaste}
          onKeypress={this.onKeypress}
          style={this.inputStyle}
        />
        <button
          class="spinner-btn btn-plus"
          onClick={() => { this.increase() }}
          disabled={this.disabled || this.readonly || !this.increasable}
        />
      </div>
    )
  },
})
