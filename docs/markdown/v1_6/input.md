Input
---
输入框。

## 引入

```js
import { Input } from 'we-vue'
Vue.component(Input.name, Input)
```

:::warning
input 只能在 group 中使用。
:::

## 例子

### 默认示例

```html
<wv-group title="默认">
  <wv-input label="label" placeholder="请输入内容" v-model="valueText"></wv-input>
  <wv-input label="label" placeholder="请输入数字" type="number" v-model="valueNumber"></wv-input>
</wv-group>
```

### 带数据验证

```html
<wv-group title="带验证">
  <wv-input label="请输入 abc" placeholder="请输入 abc" v-model="valueText" pattern="^abc$" :validate-mode="{onFocus: false}"></wv-input>
  <wv-input label="必填字段" placeholder="请输入内容" v-model="valueRequired" required></wv-input>
  <wv-input label="失焦时验证" placeholder="请输入内容" v-model="valueOnBlur" required :validate-mode="{onFocus: false, onBlur: true, onChange: false}"></wv-input>
</wv-group>
```

### 只读

```html
<wv-group title="只读">
  <wv-input label="label" placeholder="请输入内容" :readonly="true" v-model="valueReadonly"></wv-input>
</wv-group>
```

### 自定义标签宽度

```html
<wv-group title="自定义标签宽度">
  <wv-input label="这是一个比较长的标签" :labelWidth="190" placeholder="请输入内容" v-model="valueText"></wv-input>
</wv-group>
```

### 无标签

```html
<wv-group title="无标签">
  <wv-input placeholder="请输入内容" v-model="valueText"></wv-input>
</wv-group>
```

### 综合示例

```html
<wv-group title="综合示例">
  <wv-input label="短信验证码" placeholder="请输入验证码" v-model="captcha">
    <button class="weui-vcode-btn" slot="ft">获取验证码</button >
  </wv-input>
  <wv-input label="验证码" class="weui-cell_vcode" placeholder="请输入验证码" v-model="vcode">
    <img :src="vcodeImage" class="vcode" slot="ft"/>
  </wv-input>
</wv-group>
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| type  | String  |  输入框类型   |      |   'text'    |
| label  | String  |  标签   |      |       |
| tlabel-width  | Number  |  标签宽度   |      |   105    |
| placeholder  | String  |  占位提示   |      |       |
| maxlength (v1.4.17+)  | Number  |  最大长度   |      |       |
| minlength (v1.4.17+)  | Number  |  最小长度   |      |       |
| disabled | Boolean | （原生属性）是否禁用 |      | false |
| readonly | Boolean | （原生属性）是否只读 |      | false |
| auto-complete (v1.4.17+) | Boolean | （原生属性）自动补全 |      | 'off' |
| autofocus (v1.4.17+) | Boolean | （原生属性）自动获得输入焦点 |      | false |
| required | Boolean | 是否必填 |      | false |
| validate-mode | Object | 验证触发条件 |      | {onFocus: true, onBlur: true, onChange: true, onInput: true} |
| pattern | String | 验证规则（正则表达式） |      |  |

:::warning
validate-mode 中 onInput 模式为 v1.4.15 新增
:::

## Slots

|   name   |   描述    |
| :----: | :-----: |
| ft  | 右侧图标位  |

## Methods

- focus() **(v1.4.4以上可用)**

> 用于指定 input 组件获取输入焦点

```js
this.$refs.theInput.focus()  // 其中 theInput 为对应 input 组件的 ref 值
```
