SearchBar
---
搜索框。

## 引入

```js
import { SearchBar } from 'we-vue'

Vue.use(SearchBar)
```

## 例子

```html
<template>
  <div>
    <w-search-bar 
      :autofocus="false" 
      v-model="value" 
      :result="filterResult"
      @search="onSearch"
      @cancel="onCancel"
    />
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
  },

  methods: {
    onSearch (val) {
      // 自定义搜索处理
    },

    onCancel () {
      // 自定义取消事件处理
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
| result-text-key  | String  |  结果列表显示字段对应的 key(结果为对象数组时用)   |      |     |

## Slots

|   name   |   描述    |
| :----: | :-----: |
| -  | 结果列表位  |


## Events

|   事件名   |   说明    |   参数   |
| :----: | :-----: | :----: |
| click-result  | 点击搜索结果项事件  |  所点击的搜索结果项   |
| search  | 点击搜索按钮时触发  |  当前搜索框值   |
| cancel  | 点击取消时触发  |    |
