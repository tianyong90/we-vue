Cell
---
列表项。

## 引入

```js
import { Cell } from 'we-vue'
Vue.component(Cell.name, Cell)
```
> **cell 只能在 group 中使用。**

## 例子

### 带说明的列表项

```html
<wv-group title="带说明的列表项">
  <wv-cell title="标题文字" :value="true"></wv-cell>
</wv-group>
```

### 带图标、说明的列表项

```html
<wv-group title="带图标、说明的列表项">
  <wv-cell title="标题文字">
    <img :src="imgIcon" slot="icon" class="cell-icon">
    <span slot="ft">说明文字</span>
  </wv-cell>
  <wv-cell title="标题文字" value="说明文字">
    <img :src="imgIcon" slot="icon" class="cell-icon">
  </wv-cell>
</wv-group>
```

### 带跳转的列表项

```html
<wv-group title="带跳转的列表项">
  <wv-cell title="标题文字" is-link to="/"></wv-cell>
  <wv-cell title="标题文字" is-link to="/"></wv-cell>
</wv-group>
```

### 带说明、跳转的列表项

```html
<wv-group title="带说明、跳转的列表项">
  <wv-cell title="标题文字" value="说明文字" is-link to="/"></wv-cell>
  <wv-cell title="标题文字" value="说明文字" is-link to="/"></wv-cell>
</wv-group>
```

### 带图标、说明、跳转的列表项

```html
<wv-group title="带图标、说明、跳转的列表项">
  <wv-cell title="标题文字" value="说明文字" is-link to="/">
    <img :src="imgIcon" alt="" slot="icon" class="cell-icon">
  </wv-cell>
  <wv-cell title="标题文字" value="说明文字" is-link to="/">
    <img :src="imgIcon" alt="" slot="icon" class="cell-icon">
  </wv-cell>
</wv-group>
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| title  | String  |  标题，即左侧label   |      |       |
| value  | String  |  内容，即左侧文字   |      |       |
| to  | String  |  跳转目标，与 is-link 配合使用   |      |       |
| is-link | Boolean | 是否为链接 |      | false |

## Slots

|   name   |   描述    |
| :----: | :-----: |
| icon  | 左侧图标  |
| bd  | 左侧文字  |
| ft  | 右侧文字  |
