Popup
---
弹出层。

## 引入

```js
import { Popup } from 'we-vue'

Vue.use(Popup)
```

## 例子

### 指定高度

```html
<w-popup :visible.sync="popupVisible2" :height="300">
  <w-group>
    <w-switch title="关闭" v-model="popupVisible2"/>
    <w-cell title="title" value="value" is-link/>
    <w-cell title="title" value="value" is-link/>
  </w-group>
</w-popup>

<w-popup :visible.sync="popupVisible3" height="100%">
  <w-group>
    <w-switch title="关闭" v-model="popupVisible3"/>
    <w-cell title="title" value="value" is-link/>
    <w-cell title="title" value="value" is-link/>
  </w-group>
</w-popup>
```

### 模态弹出层

```html
<w-popup
  :visible.sync="popupVisible4"
  :close-on-click-mask="false"
  @open="onShow"
  @close="onHide"
>
  <w-group>
    <w-switch title="关闭" v-model="popupVisible4"/>
    <w-cell title="title" value="value" is-link/>
    <w-cell title="title" value="value" is-link/>
  </w-group>
</w-popup>
```

### 自定义遮罩背景色

```html
<w-popup :visible.sync="popupVisible5" :mask-style="{ backgroundColor: 'rgba(0, 255, 255, 0.5)' }">
  <w-group>
    <w-switch title="关闭" v-model="popupVisible5"/>
    <w-cell title="title" value="value" is-link/>
    <w-cell title="title" value="value" is-link/>
  </w-group>
</w-popup>
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| height  | Number/String  |  高度,可设置 %、px、vh 单位的高度   |      |   'auto'    |
| mask  | Boolean  |  是否显示遮罩   |      |   true    |
| lock-on-scroll  | Boolean  |  锁定滚动   |      |   true    |
| close-on-click-mask  | Boolean  |  点击遮罩层关闭弹出层   |      |   true    |
| mask-class  | String  |  遮罩层附加 css 类   |      |    |
| mask-style  | String  |  遮罩层样式   |      |   'rgba(0, 0, 0, 0.6)'    |

## Slots

|   name   |   描述    |
| :----: | :-----: |
| -  | 弹出层内容区  |
