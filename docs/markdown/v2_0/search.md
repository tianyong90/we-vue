Search
---
搜索框。

## 引入

```js
import { Search } from 'we-vue'

Vue.use(Search)
```

## 例子

```html
<template>
  <div>
    <wv-search :autofocus="false" v-model="value" :result="filterResult"></wv-search>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      defaultResult: [
        'Apple',
        'Banana',
        'Orange',
        'Durian',
        'Lemon',
        'Peach',
        'Cherry',
        'Berry',
        'Core',
        'Fig',
        'Haw',
        'Melon',
        'Plum',
        'Pear',
        'Peanut',
        'Other'
      ]
    }
  },

  computed: {
    filterResult () {
      return this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value))
    }
  }
}
</script>
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| autofocus  | Boolean  |  自动激活输入框   |      |   false    |
| show  | Boolean  |  始终显示结果列表   |      |   false    |
| placeholder  | String  |  占位提示文字   |      |   '搜索'    |
| cancel-text  | String  |  取消按钮文字   |      |   '取消'    |
| result  | Array  |  结果   |      |     |

## Slots

|   name   |   描述    |
| :----: | :-----: |
| -  | 结果列表位  |
