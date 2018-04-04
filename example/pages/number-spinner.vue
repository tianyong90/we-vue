<template>
  <div class="page">
    <wv-group title="在 cell 中使用">
      <wv-cell title="默认">
        <wv-number-spinner slot="ft" v-model="number1"/>
      </wv-cell>
      <wv-cell title="只读">
        <wv-number-spinner :readonly="true" slot="ft" v-model="number2"/>
      </wv-cell>
      <wv-cell title="禁用">
        <wv-number-spinner :disabled="true" slot="ft" v-model="number3"/>
      </wv-cell>
      <wv-cell title="禁止键盘输入">
        <wv-number-spinner :fillable="false" slot="ft" v-model="number4"/>
      </wv-cell>
      <wv-cell title="min=1,max=5">
        <wv-number-spinner :min="1" :max="5" slot="ft" v-model="number5" @change="onChange"/>
      </wv-cell>
      <wv-cell title="step=5">
        <wv-number-spinner :step="5" slot="ft" v-model="number6"/>
      </wv-cell>
      <wv-cell title="自定义输入框宽度">
        <wv-number-spinner input-width="6em" slot="ft" v-model="number7"/>
      </wv-cell>
      <wv-cell title="自定义文本对齐方式">
        <wv-number-spinner align="right" slot="ft" v-model="number8"/>
      </wv-cell>
    </wv-group>

    <div class="independent-spinner">
      <wv-number-spinner v-model="number9"/>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      number1: 1,
      number2: 1,
      number3: 1,
      number4: 1,
      number5: 1,
      number6: 1,
      number7: 1,
      number8: 1,
      number9: 1
    }
  },

  methods: {
    onChange (evt) {
      console.log(evt)
    }
  }
}
</script>

<style scoped lang="scss">
  .page {
    background-color: #f2f2f2;
  }

  .independent-spinner {
    display: block;
    background-color: #fff;
    margin-top: 20px;
    padding: 1em;
  }
</style>
