Panel
---
面板。

## 引入

```js
import { Panel, MediaBox } from 'we-vue'

Vue.use(Panel).use(MediaBox)
```

:::warning
media-box 仅与 panel 结合使用
:::

## 例子

### 图文结合

```html
<w-panel title="图文组合列表">
  <w-media-box :thumb="thumb" title="标题一" :description="description" to="/"></w-media-box>
  <w-media-box :thumb="thumb" title="标题二" :description="description" to="/"></w-media-box>

  <w-cell title="查看更多" is-link slot="ft"></w-cell>
</w-panel>
```

### 文字组合

```html
<w-panel title="文字组合列表">
  <w-media-box :thumb="thumb" title="标题一" :description="description" to="/" type="text"></w-media-box>
  <w-media-box :thumb="thumb" title="标题二" :description="description" to="/" type="text"></w-media-box>

  <w-cell title="查看更多" is-link slot="ft"></w-cell>
</w-panel>
```

### 小图标图文组合

``` html
<w-panel title="小图文组合列表">
  <w-cell title="文字标题" is-link to="/">
    <img :src="thumbSmall" alt="" slot="icon" class="cell-icon">
  </w-cell>
  <w-cell title="文字标题" is-link to="/">
    <img :src="thumbSmall" alt="" slot="icon" class="cell-icon">
  </w-cell>
</w-panel>
```

### 文字列表附来源

```html
<w-panel title="文字列表附来源">
  <w-media-box :thumb="thumb" title="标题一" :description="description" to="/" type="text">
    <ul class="weui-media-box__info" slot="box_ft">
      <li class="weui-media-box__info__meta">文字来源</li>
      <li class="weui-media-box__info__meta">时间</li>
      <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">其它信息</li>
    </ul>
  </w-media-box>
</w-panel>
```

## API

- panel

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| title  | String  |  标题   |      |        |

- media-box

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| type  | String  |  类型   |  'appmsg', 'small-appmsg'    |   'appmsg'     |
| thumb  | String  |  图标图片地址   |      |        |
| title  | String  |  标题   |      |        |
| description  | String  |  描述   |      |        |
| to  | String 或 Object  |  vue-router 跳转地址   |      |        |
| url  | String  |  url 跳转地址   |      |        |

## Slots

- panel

|   name   |   描述    |
| :----: | :-----: |
| -  | 面板内容区  |
| ft  | 面板脚部  |

- media-box

|   name   |   描述    |
| :----: | :-----: |
| box_ft  | 文字描述下方链接区  |
