NumberSpinner
---
数字输入框。

## 引入

```js
import { NumberSpinner } from 'we-vue'

Vue.use(NumberSpinner)
```

## 例子

### 默认示例

```html
<w-number-spinner v-model="number1"></w-number-spinner>
```

### 禁用

```html
<w-number-spinner :disabled="true" v-model="number2"></w-number-spinner>
```

### 禁用键盘输入
```html
<w-number-spinner :fillable="false" v-model="number3"></w-number-spinner>
```

### 自定义最小最大值
```html
<w-number-spinner :min="1" :max="5" v-model="number4" @change="onChange"></w-number-spinner>
```

### 自定义递增值
```html
<w-number-spinner :step="5" v-model="number5"></w-number-spinner>
```

### 自定义输入框宽度
```html
<w-number-spinner input-width="6em" v-model="number6"></w-number-spinner>
```

### 自定义文本对齐方式

```html
<w-number-spinner align="right" v-model="number7"></w-number-spinner>
```

### 在 cell 中使用

```html
<w-group>
  <w-cell title="label">
    <w-number-spinner slot="ft" v-model="number1"></w-number-spinner>
  </w-cell>
</w-group>
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| min  | Number  |  最小值   |      |   0    |
| max  | Number  |  最大值   |      |   100    |
| step  | Number  |  递增值   |      |   1    |
| input-width  | String  |  输入框宽度   |      |   '3em'    |
| fillable | Boolean | 是否允许键盘输入 |      | true |
| disabled | Boolean | 是否禁用 |      | false |
| align | String | 输入框文本对方方式 |  'center', 'left', 'right'    |  'center'  |

## Events

|   事件名   |   说明    |   参数   |
| :----: | :-----: | :----: |
| change  | 数值改变事件  |  改变后的数值   |
