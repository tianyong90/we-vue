Radio
---
单选列表。

## 引入

```js
import { Radio } from 'we-vue'
Vue.component(Radio.name, Radio)
```

## 例子

```html
<template>
	<div>
    <wv-radio title="title" v-model="value" :options="options" @change="onChange"></wv-radio>
	</div>
</template>

<script>
  export default {
    data () {
      return {
        value: 'value2',
        options: [{
          label: 'label1',
          value: 'value1'
        },
        {
          label: 'label2',
          value: 'value2'
        },
        {
          label: 'label3 (disabled)',
          value: 'value3',
          disabled: true
        }]
      }
    },

    methods: {
      onChange (val) {
        // do something
      }
    }
  }
</script>
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| title  | String  |  标题，即左侧label   |      |       |
| align  | String  |  对齐方式   |  'left','right'    |   'left'    |
| options  | Array  |  选项   |      |       |
| value | String | 当前值 |      |    |
