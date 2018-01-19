Switch
---
开关。

## 引入

```js
import { Switch } from 'we-vue'
Vue.component(Switch.name, Switch)
```

## 例子

### 默认

```html
<wv-switch title="开关1"  v-model="switchValue1"></wv-switch>
```

### 禁用

```html
<wv-switch title="开关2（禁用）" disabled v-model="switchValue2"></wv-switch>
```

### 非列表项中的开关（即独立开关）

```html
<wv-switch v-model="switchValue3" :is-in-cell="false"></wv-switch>
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| title  | String  |  标题   |      |       |
| is-in-cell | Boolean | 是否为列表项中的开关 |      | true |
| disabled | Boolean | 是否禁用 |      | false |
