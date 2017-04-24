import 'weui/dist/style/weui.min.css'
import Header from './components/header/index'
import Button from './components/button/index'
import Group from './components/group/index'
import Cell from './components/cell/index'
import CellSwipe from './components/cell-swipe/index'
import CellSwipeButton from './components/cell-swipe-button/index'
import Icon from './components/icon/index'
import Textarea from './components/Textarea/index'
import Input from './components/input/index'
import Badge from './components/badge/index'
import Switch from './components/switch/index'
import Spinner from './components/spinner/index'
// import TabContainerItem from './components/tab-container-item/index'
// import TabContainer from './components/tab-container/index'
import Navbar from './components/navbar/index'
import NavbarItem from './components/navbar-item/index'
import Tabbar from './components/tabbar/index'
import TabbarItem from './components/tabbar-item/index'
import Search from './components/search/index'
import Checklist from './components/checklist/index'
import Radio from './components/radio/index'
import Slider from './components/slider/index'
import Loadmore from './components/loadmore/index'
import Actionsheet from './components/actionsheet/index'
import Popup from './components/popup/index'
import Swipe from './components/swipe/index'
import SwipeItem from './components/swipe-item/index'
import Picker from './components/picker/index'
// import DatetimePicker from './components/datetime-picker/index'
import Progress from './components/progress/index'
import Circle from './components/circle/index'
import Toast from './components/toast/index'
import Indicator from './components/indicator/index'
import Dialog from './components/dialog/index'
import Lazyload from './components/lazyload/index'
import Grid from './components/grid/index'
import GridItem from './components/grid-item/index'
import Flex from './components/flex/index'
import FlexItem from './components/flex-item/index'
import Panel from './components/panel/index'
import MediaBox from './components/media-box/index'
import Preview from './components/preview/index'
import Footer from './components/footer/index'
// import '../src/assets/font/iconfont.css'

const install = function (Vue, config = {}) {
  if (install.installed) return

  Vue.component(Header.name, Header)
  Vue.component(Button.name, Button)
  Vue.component(Group.name, Group)
  Vue.component(Cell.name, Cell)
  Vue.component(CellSwipe.name, CellSwipe)
  Vue.component(CellSwipeButton.name, CellSwipeButton)
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
  Vue.component(Preview.name, Preview)
  Vue.component(Footer.name, Footer)
  Vue.use(Lazyload, {
    loading: require('./assets/loading-spin.svg'),
    attempt: 3,
    ...config.lazyload
  })

  Vue.$dialog = Vue.prototype.$dialog = Dialog
  Vue.$toast = Vue.prototype.$toast = Toast
  Vue.$indicator = Vue.prototype.$indicator = Indicator
}

// 安装
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const version = '1.0.19'
export default {
  version,
  install,
  Header,
  Button,
  Group,
  Cell,
  CellSwipe,
  CellSwipeButton,
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
  Lazyload,
  Picker,
  // DatetimePicker,
  Grid,
  GridItem,
  Flex,
  FlexItem,
  Panel,
  MediaBox,
  Preview,
  Footer
}
