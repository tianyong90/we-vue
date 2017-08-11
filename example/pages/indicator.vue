<template>
  <div class="page">
    <wv-radio title="spinner 类型" v-model="spinnerType" :options="spinnerTypeOptions"></wv-radio>

    <div class="buttons">
      <wv-button type="primary" @click="openIndicator">显示加载指示</wv-button>
      <wv-button type="warn" @click="closeIndicator">关闭加载指示</wv-button>
    </div>
  </div>
</template>

<script>
  import Indicator from '../../src/components/indicator'

  export default {
    data () {
      return {
        spinnerType: 'default',
        spinnerTypeOptions: [{
          label: 'default',
          value: 'default'
        },
        {
          label: 'snake',
          value: 'snake'
        },
        {
          label: 'double-snake',
          value: 'double-snake'
        },
        {
          label: 'bar-circle',
          value: 'bar-circle'
        },
        {
          label: 'dot-circle',
          value: 'dot-circle'
        }]
      }
    },

    methods: {
      openIndicator () {
        Indicator.open({
          text: 'loading',
          spinnerType: this.spinnerType
        })
      },

      closeIndicator () {
        Indicator.close()
      }
    }
  }
</script>

<style scoped lang="scss">
  .buttons {
    display: block;
    padding: 0 10px;
    margin-top: 3rem;
  }
</style>
