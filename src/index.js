import AndroidOverflowEffect from './components/android-overflow-effect/index'
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
import SearchAnimated from './components/search-animated/index'
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
import Swipeplus from './components/swipeplus/index'
import SwipeItem from './components/swipe-item/index'
import SwipeIndicator from './components/swipe-indicator/index'
import Popup from './components/popup/index'
import PopupBase from './components/popup-base/index'
import PopupBottomMenu from './components/popup-bottom-menu/index'
import PopupCenterMenu from './components/popup-center-menu/index'
import PopupPressMenu from './components/popup-press-menu/index'
import PopupDialog from './components/popup-dialog/index'
import PopupDialogCustom from './components/popup-dialog-custom/index'
import PopupImgViewer from './components/popup-img-viewer/index'
import PopupPicker from './components/popup-picker/index'
import PickerView from './components/picker-view/index'
import PopupCalendar from './components/popup-calendar/index'
import Panel from './components/panel/index'
import PullDownRefresh from './components/pull-down-refresh/index'
import GestureTilePress from './components/gesture-tile-press/index'
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
import './style/animate.min.css'
import './style/animated-preset.css'

const version = '1.4.18'
const install = function (Vue, config = {}) {
  if (install.installed) return

  Vue.component(AndroidOverflowEffect.name, AndroidOverflowEffect)
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
  Vue.component(SearchAnimated.name, SearchAnimated)
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
  Vue.component(Swipeplus.name, Swipeplus)
  Vue.component(SwipeItem.name, SwipeItem)
  Vue.component(SwipeIndicator.name, SwipeIndicator)
  Vue.component(Popup.name, Popup)
  Vue.component(PickerView.name, PickerView)
  Vue.component(Panel.name, Panel)
  Vue.component(PullDownRefresh.name, PullDownRefresh)
  Vue.component(GestureTilePress.name, GestureTilePress)
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

  Vue.prototype.$dialog = Dialog
  Vue.prototype.$popup = PopupBase
  Vue.prototype.$bottomMenu = PopupBottomMenu
  Vue.prototype.$centerMenu = PopupCenterMenu
  Vue.prototype.$pressMenu = PopupPressMenu
  Vue.prototype.$popUpDialog = PopupDialog
  Vue.prototype.$popUpDialogCustom = PopupDialogCustom
  Vue.prototype.$popupImgViewer = PopupImgViewer
  Vue.prototype.$picker = PopupPicker
  Vue.prototype.$calendar = PopupCalendar
  Vue.prototype.$toast = Toast
  Vue.prototype.$indicator = Indicator
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  version,
  AndroidOverflowEffect,
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
  SearchAnimated,
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
  Swipeplus,
  SwipeItem,
  SwipeIndicator,
  Popup,
  PopupBase,
  PopupBottomMenu,
  PopupCenterMenu,
  PopupPressMenu,
  PopupDialog,
  PopupDialogCustom,
  PopupImgViewer,
  PopupPicker,
  PickerView,
  PopupCalendar,
  Panel,
  PullDownRefresh,
  GestureTilePress,
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
