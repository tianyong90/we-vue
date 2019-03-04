CellSwipe
---
左滑唤出按钮的列表项。

## 引入

```js
import { CellSwipe, CellSwipeButton } from 'we-vue'

Vue.use(CellSwipe).use(CellSwipeButton)
```
:::warning
cell-swipe 只能在 group 中使用。cell-swipe-button 仅与 cell-swipe 结合使用
:::

## 例子

### 默认示例

```html
<w-group title="默认">
  <w-cell-swipe title="标题文字" :value="true">
    <w-cell-swipe-button type="warn" slot="right" @click="deleteClicked">删除</w-cell-swipe-button>
    <w-cell-swipe-button type="default" slot="right" @click="readClicked">查看</w-cell-swipe-button>
  </w-cell-swipe>
</w-group>
```

### 右侧按钮内为图标

```html
<w-group title="图标按钮">
  <w-cell-swipe title="标题文字" :value="true">
    <w-cell-swipe-button type="warn" slot="right" @click.native="deleteClicked">
      <i class="iconfont icon-rubish"></i>
    </w-cell-swipe-button>
    <w-cell-swipe-button type="default" slot="right" @click.native="readClicked">
      <i class="iconfont icon-view"></i>
    </w-cell-swipe-button>
  </w-cell-swipe>
</w-group>
```

### 左侧带图标

```html
<w-group title="左侧带图标">
  <w-cell-swipe title="标题文字">
    <img :src="imgIcon" slot="icon" class="cell-icon">
    <w-cell-swipe-button type="warn" slot="right" @click.native="deleteClicked">删除</w-cell-swipe-button>
    <w-cell-swipe-button type="default" slot="right" @click.native="readClicked">查看</w-cell-swipe-button>
  </w-cell-swipe>
</w-group>
```

### 点击后可跳转

```html
<w-group title="可跳转">
  <w-cell-swipe title="标题文字" is-link to="/">
    <w-cell-swipe-button type="warn" slot="right" @click.native="deleteClicked">删除</w-cell-swipe-button>
    <w-cell-swipe-button type="default" slot="right" @click.native="readClicked">查看</w-cell-swipe-button>
  </w-cell-swipe>
</w-group>
```

## API

- cell-swipe

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| title  | String  |  标题，即左侧label   |      |       |
| value  | String  |  内容，即左侧文字   |      |       |
| to  | String 或 Object  |  vue-router 跳转的目标地址，与 is-link 配合使用   |      |       |
| url  | String  |  跳转 url，与 is-link 配合使用   |      |       |
| is-link | Boolean | 是否为链接 |      | false |

:::tip
从 v1.6.0 开始，使用 to 定义 vue-router 跳转目标，使用 url 定义普通跳转。
:::

- cell-swipe-button

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| type  | String  |  按钮类型   |      |   'default'    |


## Slots

- cell-swipe

|   name   |   描述    |
| :----: | :-----: |
| icon  | 左侧图标位，参考 cell 组件  |
| hd  | 中部标题位，参考 cell 组件  |
| ft  | 右侧说明文字位，参考 cell 组件  |
| right  | 右侧位可加入多个按钮  |

- cell-swipe-button

|   name   |   描述    |
| :----: | :-----: |
| -  | 按钮内容位，可为文字或其它元素  |
