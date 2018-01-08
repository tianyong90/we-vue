import Button from './components/button/index'
import Group from './components/group/index'
import Cell from './components/cell/index'
import CellSwipe from './components/cell-swipe/index'
import CellSwipeButton from './components/cell-swipe-button/index'
import Input from './components/input/index'
import Textarea from './components/textarea/index'
import Badge from './components/badge/index'
import Switch from './components/switch/index'
import Spinner from './components/spinner/index'
import Navbar from './components/navbar/index'
import NavbarItem from './components/navbar-item/index'
import Tabbar from './components/tabbar/index'
import TabbarItem from './components/tabbar-item/index'
import Search from './components/search/index'
import Checklist from './components/checklist/index'
import Radio from './components/radio/index'
import Loadmore from './components/loadmore/index'
import Actionsheet from './components/actionsheet/index'
import Slider from './components/slider/index'
import Progress from './components/progress/index'
import Circle from './components/circle/index'
import Toast from './components/toast/index'
import Dialog from './components/dialog/index'
import Indicator from './components/indicator/index'
import Grid from './components/grid/index'
import GridItem from './components/grid-item/index'
import Flex from './components/flex/index'
import FlexItem from './components/flex-item/index'
import Icon from './components/icon/index'
import Swipe from './components/swipe/index'
import SwipeItem from './components/swipe-item/index'
import Popup from './components/popup/index'
import Panel from './components/panel/index'
import MediaBox from './components/media-box/index'
import Picker from './components/picker/index'
import DatetimePicker from './components/datetime-picker/index'
import Lazyload from './components/lazyload/index'
import Preview from './components/preview/index'
import Footer from './components/footer/index'
import Header from './components/header/index'
import TopTips from './components/top-tips/index'
import InfiniteScroll from './components/infinite-scroll/index'
import NumberSpinner from './components/number-spinner/index'
import 'weui/dist/style/weui.min.css'

const version = '1.6.1'
const install = function (Vue, config = {}) {
  if (install.installed) return

  Vue.component(Button.name, Button)
  Vue.component(Group.name, Group)
  Vue.component(Cell.name, Cell)
  Vue.component(CellSwipe.name, CellSwipe)
  Vue.component(CellSwipeButton.name, CellSwipeButton)
  Vue.component(Input.name, Input)
  Vue.component(Textarea.name, Textarea)
  Vue.component(Badge.name, Badge)
  Vue.component(Switch.name, Switch)
  Vue.component(Spinner.name, Spinner)
  Vue.component(Navbar.name, Navbar)
  Vue.component(NavbarItem.name, NavbarItem)
  Vue.component(Tabbar.name, Tabbar)
  Vue.component(TabbarItem.name, TabbarItem)
  Vue.component(Search.name, Search)
  Vue.component(Checklist.name, Checklist)
  Vue.component(Radio.name, Radio)
  Vue.component(Loadmore.name, Loadmore)
  Vue.component(Actionsheet.name, Actionsheet)
  Vue.component(Slider.name, Slider)
  Vue.component(Progress.name, Progress)
  Vue.component(Circle.name, Circle)
  Vue.component(Grid.name, Grid)
  Vue.component(GridItem.name, GridItem)
  Vue.component(Flex.name, Flex)
  Vue.component(FlexItem.name, FlexItem)
  Vue.component(Icon.name, Icon)
  Vue.component(Swipe.name, Swipe)
  Vue.component(SwipeItem.name, SwipeItem)
  Vue.component(Popup.name, Popup)
  Vue.component(Panel.name, Panel)
  Vue.component(MediaBox.name, MediaBox)
  Vue.component(Picker.name, Picker)
  Vue.component(DatetimePicker.name, DatetimePicker)
  Vue.component(Preview.name, Preview)
  Vue.component(Footer.name, Footer)
  Vue.component(Header.name, Header)
  Vue.component(TopTips.name, TopTips)
  Vue.component(NumberSpinner.name, NumberSpinner)
  Vue.use(InfiniteScroll)
  Vue.use(Lazyload, {
    loading: require('./assets/loading-spin.svg'),
    attempt: 3,
    ...config.lazyload
  })

  Vue.$dialog = Vue.prototype.$dialog = Dialog
  Vue.$toast = Vue.prototype.$toast = Toast
  Vue.$indicator = Vue.prototype.$indicator = Indicator
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  version,
  Button,
  Group,
  Cell,
  CellSwipe,
  CellSwipeButton,
  Input,
  Textarea,
  Badge,
  Switch,
  Spinner,
  Navbar,
  NavbarItem,
  Tabbar,
  TabbarItem,
  Search,
  Checklist,
  Radio,
  Loadmore,
  Actionsheet,
  Slider,
  Progress,
  Circle,
  Toast,
  Dialog,
  Indicator,
  Grid,
  GridItem,
  Flex,
  FlexItem,
  Icon,
  Swipe,
  SwipeItem,
  Popup,
  Panel,
  MediaBox,
  Picker,
  DatetimePicker,
  Lazyload,
  Preview,
  Footer,
  Header,
  TopTips,
  InfiniteScroll,
  NumberSpinner
}
