// This file is auto gererated by build/bin/build-entry.js
import 'weui/dist/style/weui.min.css'
import Actionsheet from './components/actionsheet'
import Badge from './components/badge'
import Button from './components/button'
import Cell from './components/cell'
import CellSwipe from './components/cell-swipe'
import CellSwipeButton from './components/cell-swipe-button'
import Checklist from './components/checklist'
import Circle from './components/circle'
import DatetimePicker from './components/datetime-picker'
import Dialog from './components/dialog'
import Flex from './components/flex'
import FlexItem from './components/flex-item'
import Footer from './components/footer'
import FormPreview from './components/form-preview'
import Grid from './components/grid'
import GridItem from './components/grid-item'
import Group from './components/group'
import Header from './components/header'
import Icon from './components/icon'
import InfiniteScroll from './components/infinite-scroll'
import Input from './components/input'
import Lazyload from './components/lazyload'
import Loadmore from './components/loadmore'
import MediaBox from './components/media-box'
import Navbar from './components/navbar'
import NavbarItem from './components/navbar-item'
import NumberSpinner from './components/number-spinner'
import Panel from './components/panel'
import Picker from './components/picker'
import Popup from './components/popup'
import Progress from './components/progress'
import Radio from './components/radio'
import SearchBar from './components/search-bar'
import Slider from './components/slider'
import Spinner from './components/spinner'
import Swipe from './components/swipe'
import SwipeItem from './components/swipe-item'
import Switch from './components/switch'
import Tabbar from './components/tabbar'
import TabbarItem from './components/tabbar-item'
import Textarea from './components/textarea'
import Toast from './components/toast'
import TopTips from './components/top-tips'

const version = '2.1.3'
const components = [
  Actionsheet,
  Badge,
  Button,
  Cell,
  CellSwipe,
  CellSwipeButton,
  Checklist,
  Circle,
  DatetimePicker,
  Flex,
  FlexItem,
  Footer,
  FormPreview,
  Grid,
  GridItem,
  Group,
  Header,
  Icon,
  Input,
  Loadmore,
  MediaBox,
  Navbar,
  NavbarItem,
  NumberSpinner,
  Panel,
  Picker,
  Popup,
  Progress,
  Radio,
  SearchBar,
  Slider,
  Spinner,
  Swipe,
  SwipeItem,
  Switch,
  Tabbar,
  TabbarItem,
  Textarea
]

const install = (Vue, config = {}) => {
  components.forEach(Component => {
    Vue.use(Component)
  })

  Vue.use(InfiniteScroll)
  Vue.use(Lazyload, {
    loading: require('./assets/loading-spin.svg'),
    attempt: 3,
    ...config.lazyload
  })

  Vue.$dialog = Vue.prototype.$dialog = Dialog
  Vue.$toast = Vue.prototype.$toast = Toast
  Vue.$toptips = Vue.prototype.$toptips = TopTips
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  version,
  Actionsheet,
  Badge,
  Button,
  Cell,
  CellSwipe,
  CellSwipeButton,
  Checklist,
  Circle,
  DatetimePicker,
  Dialog,
  Flex,
  FlexItem,
  Footer,
  FormPreview,
  Grid,
  GridItem,
  Group,
  Header,
  Icon,
  InfiniteScroll,
  Input,
  Lazyload,
  Loadmore,
  MediaBox,
  Navbar,
  NavbarItem,
  NumberSpinner,
  Panel,
  Picker,
  Popup,
  Progress,
  Radio,
  SearchBar,
  Slider,
  Spinner,
  Swipe,
  SwipeItem,
  Switch,
  Tabbar,
  TabbarItem,
  Textarea,
  Toast,
  TopTips
}

export default {
  install,
  version
}
