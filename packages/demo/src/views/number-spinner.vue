<template>
  <div class="page">
    <w-group title="在 cell 中使用">
      <w-cell title="默认">
        <w-number-spinner slot="ft" v-model="number1"/>
      </w-cell>
      <w-cell title="只读">
        <w-number-spinner :readonly="true" slot="ft" v-model="number2"/>
      </w-cell>
      <w-cell title="禁用">
        <w-number-spinner :disabled="true" slot="ft" v-model="number3"/>
      </w-cell>
      <w-cell title="禁止键盘输入">
        <w-number-spinner :fillable="false" slot="ft" v-model="number4"/>
      </w-cell>
      <w-cell title="min=1,max=5">
        <w-number-spinner :min="1" :max="5" slot="ft" v-model="number5" @change="onChange"/>
      </w-cell>
      <w-cell title="step=5">
        <w-number-spinner :step="5" slot="ft" v-model="number6"/>
      </w-cell>
      <w-cell title="自定义输入框宽度">
        <w-number-spinner input-width="6em" slot="ft" v-model="number7"/>
      </w-cell>
      <w-cell title="自定义文本对齐方式">
        <w-number-spinner align="right" slot="ft" v-model="number8"/>
      </w-cell>
    </w-group>

    <div class="independent-spinner">
      <w-number-spinner v-model="number9"/>
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
