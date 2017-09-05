## v1.4.11

- 完善 datetime-picker 组件
- picker 组件的 slot 支持显示为分隔符

## v1.4.10

### fix

- Circle 组件文字未垂直居中

## v1.4.9

### fix

- 修正文件夹大小写错误引起的问题

## v1.4.8

### fix

- #9 修复当 Indicator.open() 和 Indicator.close() 调用间隔非常小时可能无法正常关闭提示的问题。

## v1.4.7

- Indicator 组件不再自动定时关闭，需要使用Indicator.close() 进行关闭
- Indicator 支持指定多种 spinner 样式

## v1.4.6

- header 组件样式加入 z-index 属性，解决可能被其它内容遮挡的问题

## v1.4.5

- dialog 组件 alert 方法调用时不显示取消按钮
- 参数名错误修正

## v1.4.4

- input 组件新增 focus() 方法，用于指定组件获取输入焦点

## v1.4.3

### 新增
- 新增 infinite-scroll （无限滚动加载）组件

### 修复
- 修正 spinner 样式，解决旋转动画中心可能不正确的问题

## v1.4.2

- picker 计算属性逻辑调整

## v1.4.1

- circle 组件样式异常修正

## v1.4.0

- input 组件调整，废弃 no-validate 属性，添加 validate-mode 属性以实现指定触发验证时机的功能
- spinner 组件完善，加入4种新的 spinner 类型

## v1.3.8


## v1.3.7

- picker 事件名调整

## v1.3.6

- picker 组件 change 事件触发相关逻辑修正
- picker 新增 confirm 和 cancel 事件

## v1.3.5

- search 代码简化
- progress 组件新增 cancel 事件

## v1.3.4

- 优化 cell-swipe 组件，添加多个 slots 使之支持左侧图标同时优化其点击事件的处理 [close #1]


## v1.3.3

- button 组件事件绑定逻辑优化，此后使用 button 时不再需要 .native 修饰符

## v1.3.2

- toast 组件中显示引入 icon

## v1.3.1

- 修正缺失的部分子组件入口

## v1.3.0

- 使用 cooking-cli 脚手架
- 构建逻辑调整，加入 commonjs 格式
- 支持按需加载（需要使用 babel-plugin-component）

## v1.2.1

- actionsheet 组件新增 title 属性，使用 ios 样式皮肤时有效
- 部分原内联的样式分离出来

## v1.2.0

- 更新 weui 到 1.1.2
- 优化 webpack 打包配置，删除打出生成的文件里的注释
- slider 加入 disabled 属性
- 新增 cell-swipe 和 cell-swipe-button 组件
- input 加入正则验证和必填验证功能，出错时显示相应状态

## v1.1.1

- picker 修正
- toast 宽度计算逻辑调整

## v1.1.0

- install 相关微调 ，依赖调整
- checklist 和 radio 新增change 事件
- checklist 和 radio 禁用项的背景色调整
- popup 自定义高度功能修正，新增自定义背景功能

## v1.0.19

- popup 新增 show 和 hide 事件

## v1.0.18

- actionsheet 初始显示状态问题修正
- popup 组件取消 is-modal 属性，相关功能使用 hide-on-mask 属性取代
- popup 组件支持自定义遮罩背景色

## v1.0.17

- popup组件初始显示状态赋值问题修正

## v1.0.16

- 支持无图标的纯文本 toast

## v1.0.13

- input 组件加入 ft slot 以满足更多的使用场景，并可以自定义 label 宽度
- 更新 vue-lazyload 依赖包
- 更新 webpack到2.3.x

## v1.0.10

- flex 加入 gutter 属性，表示栅格间间隔
- flex-item 加入 flex 属性，与 CSS3 flex 属性一致

## v1.0.9

- input 组件 label 属性值为空时不显示组件中的 label 部分，即不再占空位
- textarea组件优化

## v1.0.8

- 修改部分组件在 history 路由模式下跳转时链接错误的问题

## v1.0.7

- 加入 TopTips （顶部警告提示条）组件

## v1.0.6

- button 支持 loading 状态

## v1.0.5

- 构建工具 webpack升级为2.2版本
- 部分构建流程及配置调整，提高构建效率并减小生成的文件体积
