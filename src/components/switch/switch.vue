<template>
  <div class="weui-cell weui-cell_switch" v-if="isInCell">
    <div class="weui-cell__bd" v-html="title"></div>
    <div class="weui-cell__ft">
      <input class="weui-switch" :disabled="disabled" v-model="currentValue" @change="$emit('change', currentValue)" type="checkbox">
    </div>
  </div>
  <input class="weui-switch" :disabled="disabled" @change="$emit('change', currentValue)" v-model="currentValue" type="checkbox" v-else>
</template>

<script type="text/babel">
export default {
  name: 'wv-switch',

  props: {
    title: String,
    disabled: Boolean,
    isInCell: {
      type: Boolean,
      default: true
    },
    value: Boolean
  },

  data () {
    return {
      currentValue: this.value
    }
  },

  watch: {
    value (val) {
      this.currentValue = val
    },

    currentValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>
