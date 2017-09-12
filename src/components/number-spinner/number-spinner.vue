<template>
  <div class="wv-number-spinner">
    <span class="spinner-btn btn-decrease" :class="{ 'btn-disabled': currentValue === min}" @click="decrease">-</span>
    <input type="number" :value="currentValue" @change="onChange" @input="handleInput" :style="{ width: inputWidth }"/>
    <span class="spinner-btn btn-increase" :class="{ 'btn-disabled': currentValue === max}" @click="increase">+</span>
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
        default: '4em'
      },
      allowInput: {
        type: Boolean,
        default: true
      },
      disabled: Boolean,
      value: Number
    },

    data () {
      return {
        currentValue: this.value
      }
    },

    methods: {
      handleInput (event) {
        // TODO:
        const targetValue = Number.parseInt(event.target.value)

        if (targetValue <= this.min) {
          this.currentValue = this.min
        } else if (targetValue >= this.max) {
          this.currentValue = this.max
        } else {
          this.currentValue = targetValue
        }
      },

      onChange () {
        this.$emit('change', this.currentValue)
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
        if (val <= this.min) {
          this.currentValue = this.min
        } else if (val >= this.max) {
          this.currentValue = this.max
        } else {
          this.currentValue = val
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
      text-align: center;
    }

    .spinner-btn {
      display: inline-block;
      float: left;
      color: #000;
      font-size: 13px;
      padding: 0 .6em;
    }

    .btn-decrease {
      border-right: 1px solid #ccc;
    }

    .btn-increase {
      border-left: 1px solid #ccc;
    }

    .btn-disabled {
      color: #ccc;
    }
  }
</style>
