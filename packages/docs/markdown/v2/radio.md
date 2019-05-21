---
title: Radio
keywords: 'we-vue, radio'
description: ''
demo_url: //demo.wevue.org/radio
---

Radio

单选列表。

## 引入

```js
import { Radio } from 'we-vue'

Vue.use(Radio)
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
        value: 'hello',
        options: [{
          label: 'label1',
          value: 'hello'
        },
        {
          label: 'label2',
          value: true
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
        console.log(val)
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
| value | String, Number, Object, Boolean | 当前值 |      |    |
