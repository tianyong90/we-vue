Popup
---
弹出层。

## 引入

```js
import { Popup } from 'we-vue'
Vue.component(Popup.name, Popup)
```

## 例子

### 默认，指定高度

```html
<wv-popup v-model="popupVisible1" @show="onShow" @hide="onHide" :height="height" background-color="white">
  <wv-group>
    <wv-switch title="关闭" v-model="popupVisible1"></wv-switch>
    <wv-cell title="title" value="value" is-link></wv-cell>
    <wv-cell title="title" value="value" is-link></wv-cell>
  </wv-group>
</wv-popup>
```

### 模态弹出层

```html
<wv-popup v-model="popupVisible2" :hide-on-mask="false" @show="onShow" @hide="onHide">
  <wv-group>
    <wv-switch title="关闭" v-model="popupVisible2"></wv-switch>
    <wv-cell title="title" value="value" is-link></wv-cell>
    <wv-cell title="title" value="value" is-link></wv-cell>
  </wv-group>
</wv-popup>
```

### 自定义遮罩背景色

```html
<wv-popup v-model="popupVisible3" mask-background-color="rgba(0, 255, 255, 0.5)" @show="onShow" @hide="onHide">
  <wv-group>
    <wv-switch title="关闭" v-model="popupVisible3"></wv-switch>
    <wv-cell title="title" value="value" is-link></wv-cell>
    <wv-cell title="title" value="value" is-link></wv-cell>
  </wv-group>
</wv-popup>
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| height  | Number/String  |  高度,可设置 %、px、vh 单位的高度   |      |   'auto'    |
| hide-on-mask  | Boolean  |  点击遮罩层关闭弹出层   |      |   true    |
| mask-background-color  | String  |  遮罩层背景色   |      |   'rgba(0, 0, 0, 0.6)'    |
| background-color  | String  |  弹出层背景色   |      |   '#fff'    |

## Slots

|   name   |   描述    |
| :----: | :-----: |
| -  | 弹出层内容区  |
