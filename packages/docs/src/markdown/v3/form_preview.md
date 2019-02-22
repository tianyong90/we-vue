FormPreview
---
表单预览。

## 引入

```js
import { FormPreview } from 'we-vue'

Vue.use(FormPreview)
```

## 例子

```html
<template>
  <div class="page">
    <wv-form-preview class="preview-item" title="订单详情" value="100.00" :dataItems="dataItems" :buttons="buttons1"/>
    <wv-form-preview class="preview-item" title="订单详情" value="100.00" :dataItems="dataItems" :buttons="buttons2"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataItems: [
        {
          label: '商品',
          value: '电动打蛋机'
        },
        {
          label: '标题标题',
          value: '名字名字名字'
        },
        {
          label: '标题标题',
          value: '很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字'
        }
      ],
      buttons1: [
        {
          text: '操作',
          type: 'primary',
          action: function () {
            console.log('执行主要操作……')
          }
        }
      ],
      buttons2: [
        {
          text: '辅助操作',
          type: 'default',
          action: function () {
            console.log('执行辅助操作……')
          }
        },
        {
          text: '操作',
          type: 'primary',
          action: function () {
            console.log('执行主要操作……')
          }
        }
      ]
    }
  }
}
</script>
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| title  | String  |  标题   |      |   |
| value  | String  |  金额   |      |   |
| data-items  | Array  |  表单数据项   |      |   |
| buttons  | Array  |  按钮   |      |   |
