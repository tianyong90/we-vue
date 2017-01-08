<template>
  <div class="weui-cell weui-cell_switch">
    <div class="weui-cell__bd" v-html="title"></div>
    <div class="weui-cell__ft">
      <input class="weui-switch" v-model="value" type="checkbox">
    </div>
  </div>
  <!--<input class="weui-switch" :disabled="disabled" @change="$emit('change', currentValue)" v-model="currentValue" type="checkbox">-->
</template>

<script type="text/babel">
export default {
  name: 'wv-switch',

  props: {
    title: String,
    disabled: Boolean,
    value: Boolean
  },

  mounted () {
    this.currentValue = this.value
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
