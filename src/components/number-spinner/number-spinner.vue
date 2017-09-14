<template>
  <div class="wv-number-spinner">
    <button class="spinner-btn btn-decrease" :class="{ 'btn-disabled': btnDecreaseDisabled}" :disabled="disabled" @click="decrease">-</button>
    <input type="number" v-model.number="currentValue" :disabled="disabled" :readonly="!fillable" @blur="onBlur" :style="inputStyle"/>
    <button class="spinner-btn btn-increase" :class="{ 'btn-disabled': btnIncreaseDisabled}"  :disabled="disabled" @click="increase">+</button>
  </div>
</template>

<script>
  export default {
    name: 'wv-number-spinner',

    props: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      },
      inputWidth: {
        type: String,
        default: '3em'
      },
      fillable: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      align: {
        type: String,
        default: 'center'
      },
      value: {
        validator (val) {
          return typeof val === 'number' || val === ''
        },
        default: 0
      }
    },

    data () {
      return {
        currentValue: this.value
      }
    },

    computed: {
      btnDecreaseDisabled () {
        return this.disabled || (this.currentValue === this.min)
      },

      btnIncreaseDisabled () {
        return this.disabled || (this.currentValue === this.max)
      },

      inputStyle () {
        return {
          width: this.inputWidth,
          textAlign: this.align
        }
      }
    },

    methods: {
      onBlur () {
        if (this.currentValue === '') {
          this.currentValue = this.min
        }
      },

      increase () {
        this.currentValue += this.step
      },

      decrease () {
        this.currentValue -= this.step
      }
    },

    watch: {
      currentValue (val) {
        this.$emit('input', val)
        this.$emit('change', val)
      },

      value (val) {
        if (typeof val === 'number') {
          if (val <= this.min) {
            this.currentValue = this.min
          } else if (val >= this.max) {
            this.currentValue = this.max
          } else {
            this.currentValue = val
          }
        } else if (val === '') {
          this.currentValue = ''
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .wv-number-spinner {
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;

    input {
      display: inline-block;
      float: left;
      border: none;
      outline: none;
      padding: 0 .5em;
    }

    .spinner-btn {
      display: inline-block;
      float: left;
      color: #000;
      font-size: 13px;
      padding: 0 .6em;
      border: none;
    }

    .btn-decrease {
      border-right: 1px solid #ccc;
    }

    .btn-increase {
      border-left: 1px solid #ccc;
    }

    .spinner-btn[disabled] {
      color: #888;
    }
  }
</style>
