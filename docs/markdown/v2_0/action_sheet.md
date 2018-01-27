ActionSheet
---
弹出式菜单。

## 引入

```js
import { ActionSheet } from 'we-vue'

Vue.use(ActionSheet)
```

## 例子

### 基本使用

```html
<wv-actionsheet type="ios" :actions="actions" cancel-text="取消" v-model="sheetVisible"></wv-actionsheet>
```

### 指定皮肤样式

```html
<wv-actionsheet type="android" :actions="actions" cancel-text="取消" v-model="sheetVisible"></wv-actionsheet>
```

### 带标题（仅 ios 样式菜单支持）

```html
<wv-actionsheet type="ios" title="<h3 style='color: red;'>一个大标题</h3><p>最多两行</p>" :actions="actions" cancel-text="取消" v-model="sheetVisible"></wv-actionsheet>
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| type  | String  |  皮肤样式   |   'ios', 'android'   |   'ios'    |
| title  | String  |  标题    |          |       |
| cancel-text  | String  |  取消菜单项文字    |          |   'Cancel'    |
| actions | Array | 菜单项 |      |  |
