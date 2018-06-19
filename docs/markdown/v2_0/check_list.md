CheckList
---
复选列表。

## 引入

```js
import { CheckList } from 'we-vue'

Vue.use(CheckList)
```

## 例子

```html
<template>
	<div>
		<wv-checklist title="基本示例" :options="options" v-model="checkedItems"></wv-checklist>
	</div>
</template>

<script>
export default {
  data () {
    return {
      options: [
        {
          label: '选项1',
          value: 'value1'
        },
        {
          label: '选项2',
          value: 'value2'
        },
        {
          label: '选项3',
          value: 'value3'
        },
        {
          label: '选项4（禁用）',
          value: 'value4',
          disabled: true
        }
      ],
      checkedItems: ['value1', 'value3']
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
| value | Array | 当前值 |      |    |
| max | Number | 最多可选中的项数 |      |    |

