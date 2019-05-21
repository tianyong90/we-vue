---
title: Textarea
keywords: 'we-vue, textarea'
description: ''
demo_url: //demo.wevue.org/textarea
---

Textarea

文本框。

## 引入

```js
import { Textarea } from 'we-vue'

Vue.use(Textarea)
```

:::warning
textarea 只能在 group 中使用。
:::

## 例子

### 基本示例

```html
<w-group title="标题">
  <w-textarea placeholder="请输入文本" :rows="6" v-model="content1"></w-textarea>
</w-group>
```

### 自定义字数限制

```html
<w-group>
  <w-textarea placeholder="请输入文本" :rows="3" v-model="content2" :max-length="10"></w-textarea>
</w-group>
```

### 不显示字数提示

```html
<w-group>
  <w-textarea placeholder="请输入文本" :rows="1" :show-counter="false" v-model="content1"></w-textarea>
</w-group>
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| placeholder  | String  |  占位提示   |      |       |
| rows  | Number  |  行数   |      |   3    |
| max-length  | Number/String  |  最大字数   |      |   100    |
| show-counter  | Boolean  |  是否显示字数提示   |      |   true    |
| disabled | Boolean | 是否禁用 |      | false |
| readonly | Boolean | 是否只读 |      | false |
