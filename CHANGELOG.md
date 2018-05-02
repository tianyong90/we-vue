## v2.1.1 (2018-5-2)

### 优化

- 加入 typescript 描述文件

### 构建

- 使用 commitzen 及 conventional-changelog

## v2.1.0 (2018-4-6)

### 优化

- 重构 number-spinner 组件，美化样式，优化其输入框对输入、粘贴事件处理逻辑

### 构建

- 升级 webpack 到 v4,调整相关配置
- 使用 mini-css-extract-plugin 替代 extract-text-webpack-plugin
- webpack 相关配置调整

## v2.0.4 (2018-4-2)

### 修复

- 修复 popup 组件 lockOnScroll 无法生效的 BUG

---
## v2.0.3 (2018-3-27)

### 修复

- 修复 checklist 组件，align 属性无法正常渲染的问题

---
## v2.0.2 (2018-3-15)

### 修复

- 修正 dialog 构建方法，解决 Dialog({}) 调用时对话框不显示的问题

## v2.0.1 (2018-3-5)

### 修复

- 调整 toast 样式，解决纯文本提示时不居中的问题

### 优化

- 纯文本 toast 提示支持多行文本

---
## v2.0.0 (2018-2-12)

以下更新内容相对于 v1.6

### 代码质量控制

- 全面的单元测试，覆盖组件源码 95% 以上
- 更规范的代码，使用 eslint-plugin-vue 插件检查及修正代码
- 使用 CircleCI 自动测试，确保组件可用性

### 重要更改及优化

- 重构 swipe 组件
  - 属性 speed => duration，默认值由 300 改为 500
  - 属性 auto => autoplay，无默认值
  - 取消 condinuous 属性
  - 优化连续滑动操作体验
  
- 优化 slider 组件
  - 新增 enableClick 组件，支持点击操作（默认开启）
  - show-value-box 更名为 show-value
  - 优化属性值校验
  - 简化计算逻辑
  
- 重构 dialog 组件
  - 组件返回 Promise 对象
  - shouCancelBtn => showCancelButton
  - shouConfirmBtn => showConfirmButton
  - cancelText => cancelButtonText
  - confirmText => confirmButtonText
  - 优化动画效果

- cell-swipe 优化
  - 组件外部点击时自动复位
  
- poopup 重构
  - 事件名调整 show => open, hide => close
  - 使用 :visible.sync="visible" 形式控制 popup 是否显示
  - 支持动画效果

- toast
  - 调整 api，支持 success, fail, loading, text 等类型提示
  - loading() 方法整合原 Indicator 组件功能

- 删除 Indicator 组件，其功能整合到 Toast 组件中，使用 Toast.loading() 方法

- picker
  - 使用 :visible.sync="visible" 形式控制 picker 是否显示
  - 新增 visibleItem 属性，定义可见选项数
  - slots 属性重命名为 columns

- datetime-picker
  - 根据 picker 的变化进行相应调整

- flex-item
  - 新增 offset 属性

- preview 组件重命名为 form-preview

- search 组件
  - search 组件重命名为 search-bar
  - search-bar 组件新增 result-text-key 属性
  - search-bar 新增 `click-result` 事件，点击搜索结果项时触发

- radio
  - options 属性设为 required
  - value 支持 Object, Bookean, String 多种类型

- checklist 组件
  - 优化 change 事件触发逻辑，避免选中值实际没有改变时触发该事件

---
## v2.0.0-alpha.5 (2018-2-7)

### 新增

- flex-item 组件新增 offset 属性

---
## v2.0.0-alpha.4 (2018-2-3)

### 非兼容更改

- preview 组件重命名为 form-preview

---
## v2.0.0-alpha.3 (2018-2-1)

### 非兼容更改

- search 组件重命名为 search-bar

### 新增

- search-bar 组件新增 result-text-key 属性
- search-bar 新增 `click-result` 事件，点击搜索结果项时触发

---
## v2.0.0-alpha.2 (2018-1-29)

### 优化

- radio 组件 options 属性设为 required
- radio 组件 value 支持 Object, Bookean, String 多种类型
- 优化 checklist 组件 change 事件触发逻辑，避免选中值实际没有改变时触发该事件

---
## v2.0.0-alpha.1 (2018-1-20)

### 代码质量控制

- 全面的单元测试，覆盖组件源码 95% 以上
- 更规范的代码，使用 eslint-plugin-vue 插件检查及修正代码
- 使用 CircleCI 自动测试，确保组件可用性

### 重要更改及优化

- 重构 swipe 组件
  - 属性 speed => duration，默认值由 300 改为 500
  - 属性 auto => autoplay，无默认值
  - 取消 condinuous 属性
  - 优化连续滑动操作体验
  
- 优化 slider 组件
  - 新增 enableClick 组件，支持点击操作（默认开启）
  - show-value-box 更名为 show-value
  - 优化属性值校验
  - 简化计算逻辑
  
- 重构 dialog 组件
  - 组件返回 Promise 对象
  - shouCancelBtn => showCancelButton
  - shouConfirmBtn => showConfirmButton
  - cancelText => cancelButtonText
  - confirmText => confirmButtonText
  - 优化动画效果

- cell-swipe 优化
  - 组件外部点击时自动复位
  
- poopup 重构
  - 事件名调整 show => open, hide => close
  - 使用 :visible.sync="visible" 形式控制 popup 是否显示
  - 支持动画效果

- toast
  - 调整 api，支持 success, fail, loading, text 等类型提示
  - loading() 方法整合原 Indicator 组件功能

- 删除 Indicator 组件，其功能整合到 Toast 组件中，使用 Toast.loading() 方法

- picker
  - 使用 :visible.sync="visible" 形式控制 picker 是否显示
  - 新增 visibleItem 属性，定义可见选项数
  - slots 属性重命名为 columns

- datetime-picker
  - 根据 picker 的变化进行相应调整

---
## v1.6.2 (2018-1-8)

### 修复

- 方法名拼写错误

---
## v1.6.1 (2018-1-7)

### 修复

- 修复两处方法名拼写错误

---
## v1.6.1 (2018-1-7)

### 新特性

- input, textarea 组件支持定义 focus, blur 事件处理方法

---
## v1.6.0 (2017-12-5)

### 优化

- actionsheet, dialog 组件使用过渡动效

### 非兼容性更改
    
- cell, cell-swipe, grid-item, footer-link, media-box 等具有跳转功能的组件，新增 `url` 属性，同时  `to` 属性支持传入对象值。对于仅使用 `vue-router` 跳转的情况，此更改无影响。但对于不使用 `vue-router` 的场景下，需要使用 `url` 来指定跳转目标链接。 

---
## v1.5.3 (2017-11-28)

### 修复

- input 组件中一处拼写错误
- 修正 textarea 组件初始值可能超出 max-length 的问题

---
## v1.5.2 (2017-11-27)

### 优化

- 重构 switch, cell-swipe, picker 滑动操作相关代码
- 解除 css3transfom 依赖，减小文件体积

---
## v1.5.1 (2017-11-17)

### 修复

- 紧急修正 v1.5.0 中 Toast, Indicator, TopTips 组件失效问题

---
## v1.5.0 (2017-11-16)

- picker 组件优化，增加滚动效果，并可点击选择 [#18](https://github.com/tianyong90/we-vue/pull/18)

### 其它调整

- 放弃 cooking 构建工具，回归 vue-cli，优化开发体验
- 不再构建 commonjs（仅构建 umd）
- 部分加入单元测试（后期将进一步覆盖）
- 源码格式规范化

### 非兼容性更改

- lib 目录下不再有 we-vue.common.js 及 style.min.js， 若单独手动引用，使用 `lin/index.js` 和 `lib/style.css`

---
## v1.4.18 (2017-10-31)

### 修复

- 修复 datetime-pick 一处可能引起死循环的 bug

---
## v1.4.17 (2017-10-24)

- popup 组件 heigt 属性，支持指定 % 及 vh 形式高度
- switch 禁用状态对应颜色调整
- input 组件新增 maxlength, name, minlength, autofocus, auto-complete 属性

---
## v1.4.16 (2017-10-24)

- switch 组件支持滑动操作，同时兼容点击操作

---
## v1.4.15 (2017-10-23)

### 新增

- input 组件字段验证模式支持输入时验证 (即 onInput 模式)，默认启用

---
## v1.4.14 (2017-09-23)

### 修复

- navbar 指示条宽度高处 bug

---
## v1.4.13 (2017-09-23)

### 新增

- navbar 的指示条支持动效，新增 animate 属性

### change

- navbar 高度调整
- navbar 指示条默认宽度调整，由 3px 改为 2px

### 修复

- navbar 禁用项点事件处理逻辑优化
- navbar 禁用项文字颜色设置

---
## v1.4.12 (2017-09-14)

### 新增

- 新增 number-spinner 组件

### 修复
- 未定义跳转链接的 cell-swipe 点击事件处理优化

---
## v1.4.11

- 完善 datetime-picker 组件
- picker 组件的 slot 支持显示为分隔符

---
## v1.4.10

### 修复

- Circle 组件文字未垂直居中

---
## v1.4.9

### 修复

- 修正文件夹大小写错误引起的问题

---
## v1.4.8

### 修复

- #9 修复当 Indicator.open() 和 Indicator.close() 调用间隔非常小时可能无法正常关闭提示的问题。

---
## v1.4.7

- Indicator 组件不再自动定时关闭，需要使用Indicator.close() 进行关闭
- Indicator 支持指定多种 spinner 样式

---
## v1.4.6

- header 组件样式加入 z-index 属性，解决可能被其它内容遮挡的问题

---
## v1.4.5

- dialog 组件 alert 方法调用时不显示取消按钮
- 参数名错误修正

---
## v1.4.4

- input 组件新增 focus() 方法，用于指定组件获取输入焦点

---
## v1.4.3

### 新增
- 新增 infinite-scroll （无限滚动加载）组件

### 修复
- 修正 spinner 样式，解决旋转动画中心可能不正确的问题

---
## v1.4.2

- picker 计算属性逻辑调整

---
## v1.4.1

- circle 组件样式异常修正

---
## v1.4.0

- input 组件调整，废弃 no-validate 属性，添加 validate-mode 属性以实现指定触发验证时机的功能
- spinner 组件完善，加入4种新的 spinner 类型

---
## v1.3.8


---
## v1.3.7

- picker 事件名调整

---
## v1.3.6

- picker 组件 change 事件触发相关逻辑修正
- picker 新增 confirm 和 cancel 事件

---
## v1.3.5

- search 代码简化
- progress 组件新增 cancel 事件

---
## v1.3.4

- 优化 cell-swipe 组件，添加多个 slots 使之支持左侧图标同时优化其点击事件的处理 [close #1]


---
## v1.3.3

- button 组件事件绑定逻辑优化，此后使用 button 时不再需要 .native 修饰符

---
## v1.3.2

- toast 组件中显示引入 icon

---
## v1.3.1

- 修正缺失的部分子组件入口

---
## v1.3.0

- 使用 cooking-cli 脚手架
- 构建逻辑调整，加入 commonjs 格式
- 支持按需加载（需要使用 babel-plugin-component）

---
## v1.2.1

- actionsheet 组件新增 title 属性，使用 ios 样式皮肤时有效
- 部分原内联的样式分离出来

---
## v1.2.0

- 更新 weui 到 1.1.2
- 优化 webpack 打包配置，删除打出生成的文件里的注释
- slider 加入 disabled 属性
- 新增 cell-swipe 和 cell-swipe-button 组件
- input 加入正则验证和必填验证功能，出错时显示相应状态

---
## v1.1.1

- picker 修正
- toast 宽度计算逻辑调整

---
## v1.1.0

- install 相关微调 ，依赖调整
- checklist 和 radio 新增change 事件
- checklist 和 radio 禁用项的背景色调整
- popup 自定义高度功能修正，新增自定义背景功能

---
## v1.0.19

- popup 新增 show 和 hide 事件

---
## v1.0.18

- actionsheet 初始显示状态问题修正
- popup 组件取消 is-modal 属性，相关功能使用 hide-on-mask 属性取代
- popup 组件支持自定义遮罩背景色

---
## v1.0.17

- popup组件初始显示状态赋值问题修正

---
## v1.0.16

- 支持无图标的纯文本 toast

---
## v1.0.13

- input 组件加入 ft slot 以满足更多的使用场景，并可以自定义 label 宽度
- 更新 vue-lazyload 依赖包
- 更新 webpack到2.3.x

---
## v1.0.10

- flex 加入 gutter 属性，表示栅格间间隔
- flex-item 加入 flex 属性，与 CSS3 flex 属性一致

---
## v1.0.9

- input 组件 label 属性值为空时不显示组件中的 label 部分，即不再占空位
- textarea组件优化

---
## v1.0.8

- 修改部分组件在 history 路由模式下跳转时链接错误的问题

---
## v1.0.7

- 加入 TopTips （顶部警告提示条）组件

---
## v1.0.6

- button 支持 loading 状态

---
## v1.0.5

- 构建工具 webpack升级为2.2版本
- 部分构建流程及配置调整，提高构建效率并减小生成的文件体积
