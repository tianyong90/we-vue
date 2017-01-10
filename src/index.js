import 'weui/dist/style/weui.min.css'
import Button from './components/button/index.js'
import Group from './components/group/index.js'
import Cell from './components/cell/index.js'
import Icon from './components/icon/index.js'
import Textarea from './components/Textarea/index.js'
import Input from './components/input/index.js'
import Badge from './components/badge/index.js'
import Switch from './components/switch/index.js'
import Spinner from './components/spinner/index.js'
// import TabContainerItem from './components/tab-container-item/index.js'
// import TabContainer from './components/tab-container/index.js'
import Navbar from './components/navbar/index.js'
import NavbarItem from './components/navbar-item/index.js'
import Tabbar from './components/tabbar/index.js'
import TabbarItem from './components/tabbar-item/index.js'
import Search from './components/search/index.js'
import Checklist from './components/checklist/index.js'
import Radio from './components/radio/index.js'
import Slider from './components/slider/index.js'
import Loadmore from './components/loadmore/index.js'
import Actionsheet from './components/actionsheet/index.js'
import Popup from './components/popup/index.js'
import Swipe from './components/swipe/index.js'
import SwipeItem from './components/swipe-item/index.js'
import Picker from './components/picker/index.js'
// import DatetimePicker from './components/datetime-picker/index.js'
import Progress from './components/progress/index.js'
import Circle from './components/circle/index.js'
import Toast from './components/toast/index.js'
import Indicator from './components/indicator/index.js'
import Dialog from './components/dialog/index.js'
// import InfiniteScroll from './components/infinite-scroll/index.js'
import Lazyload from './components/lazyload/index.js'
import Grid from './components/grid/index.js'
import GridItem from './components/grid-item/index.js'
import Flex from './components/flex/index.js'
import FlexItem from './components/flex-item/index.js'
import Panel from './components/panel/index.js'
import MediaBox from './components/media-box/index.js'
// import '../src/assets/font/iconfont.css'

const install = function (Vue) {
  if (install.installed) return

  Vue.component(Button.name, Button)
  Vue.component(Group.name, Group)
  Vue.component(Cell.name, Cell)
  Vue.component(Icon.name, Icon)
  Vue.component(Textarea.name, Textarea)
  Vue.component(Input.name, Input)
  Vue.component(Badge.name, Badge)
  Vue.component(Switch.name, Switch)
  Vue.component(Spinner.name, Spinner)
  Vue.component(Tabbar.name, Tabbar)
  Vue.component(TabbarItem.name, TabbarItem)
  // Vue.component(TabContainerItem.name, TabContainerItem)
  // Vue.component(TabContainer.name, TabContainer)
  Vue.component(Navbar.name, Navbar)
  Vue.component(NavbarItem.name, NavbarItem)
  Vue.component(Search.name, Search)
  Vue.component(Checklist.name, Checklist)
  Vue.component(Radio.name, Radio)
  Vue.component(Slider.name, Slider)
  Vue.component(Loadmore.name, Loadmore)
  Vue.component(Actionsheet.name, Actionsheet)
  Vue.component(Popup.name, Popup)
  Vue.component(Swipe.name, Swipe)
  Vue.component(SwipeItem.name, SwipeItem)
  Vue.component(Progress.name, Progress)
  Vue.component(Circle.name, Circle)
  Vue.component(Picker.name, Picker)
  // Vue.component(DatetimePicker.name, DatetimePicker)
  Vue.component(Grid.name, Grid)
  Vue.component(GridItem.name, GridItem)
  Vue.component(Flex.name, Flex)
  Vue.component(FlexItem.name, FlexItem)
  Vue.component(Panel.name, Panel)
  Vue.component(MediaBox.name, MediaBox)
  // Vue.use(InfiniteScroll)
  Vue.use(Lazyload, {
    loading: require('./assets/loading-spin.svg'),
    try: 3
  })

  Vue.$dialog = Vue.prototype.$dialog = Dialog
  Vue.$toast = Vue.prototype.$toast = Toast
  Vue.$indicator = Vue.prototype.$indicator = Indicator
}

// 安装
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

module.exports = {
  version: '1.0.0',
  install,
  Button,
  Group,
  Cell,
  Icon,
  Textarea,
  Input,
  Badge,
  Switch,
  Spinner,
  // TabContainerItem,
  // TabContainer,
  Navbar,
  NavbarItem,
  Tabbar,
  TabbarItem,
  Search,
  Checklist,
  Radio,
  Slider,
  Loadmore,
  Actionsheet,
  Popup,
  Swipe,
  SwipeItem,
  Progress,
  Circle,
  Toast,
  Indicator,
  Dialog,
  // InfiniteScroll,
  Lazyload,
  Picker,
  // DatetimePicker,
  Grid,
  GridItem,
  Flex,
  FlexItem,
  Panel,
  MediaBox
}
