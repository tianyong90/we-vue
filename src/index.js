// import Header from './components/header/index.js'
import Button from './components/button/index.js'
import CellGroup from './components/cell-group/index.js'
import Cell from './components/cell/index.js'
// import Field from './components/field/index.js'
// import Badge from './components/badge/index.js'
import Switch from './components/switch/index.js'
// import Spinner from './components/spinner/index.js'
// import TabContainerItem from './components/tab-container-item/index.js'
// import TabContainer from './components/tab-container/index.js'
import Navbar from './components/navbar/index.js'
import Tabbar from './components/tabbar/index.js'
import TabItem from './components/tab-item/index.js'
import Search from './components/search/index.js'
import Checklist from './components/checklist/index.js'
import Radio from './components/radio/index.js'
// import Loadmore from './components/loadmore/index.js'
import Actionsheet from './components/actionsheet/index.js'
// import Popup from './components/popup/index.js'
// import Swipe from './components/swipe/index.js'
// import SwipeItem from './components/swipe-item/index.js'
// import Range from './components/range/index.js'
// import Picker from './components/picker/index.js'
import Progress from './components/progress/index.js'
import Toast from './components/toast/index.js'
import Indicator from './components/indicator/index.js'
import Dialog from './components/dialog/index.js'
// import InfiniteScroll from './components/infinite-scroll/index.js'
// import Lazyload from './components/lazyload/index.js'
// import DatetimePicker from './components/datetime-picker/index.js'
// import IndexList from './components/index-list/index.js'
// import IndexSection from './components/index-section/index.js'
import Grid from './components/grid/index.js'
import GridItem from './components/grid-item/index.js'
import Flex from './components/flex/index.js'
import FlexItem from './components/flex-item/index.js'
// import '../src/assets/font/iconfont.css'

const install = function (Vue) {
  if (install.installed) return

  // Vue.component(Header.name, Header)
  Vue.component(Button.name, Button)
  Vue.component(CellGroup.name, CellGroup)
  Vue.component(Cell.name, Cell)
  // Vue.component(Field.name, Field)
  // Vue.component(Badge.name, Badge)
  Vue.component(Switch.name, Switch)
  // Vue.component(Spinner.name, Spinner)
  Vue.component(Tabbar.name, Tabbar)
  Vue.component(TabItem.name, TabItem)
  // Vue.component(TabContainerItem.name, TabContainerItem)
  // Vue.component(TabContainer.name, TabContainer)
  Vue.component(Navbar.name, Navbar)
  Vue.component(Search.name, Search)
  Vue.component(Checklist.name, Checklist)
  Vue.component(Radio.name, Radio)
  // Vue.component(Loadmore.name, Loadmore)
  Vue.component(Actionsheet.name, Actionsheet)
  // Vue.component(Popup.name, Popup)
  // Vue.component(Swipe.name, Swipe)
  // Vue.component(SwipeItem.name, SwipeItem)
  // Vue.component(Range.name, Range)
  // Vue.component(Picker.name, Picker)
  Vue.component(Progress.name, Progress)
  // Vue.component(DatetimePicker.name, DatetimePicker)
  // Vue.component(IndexList.name, IndexList)
  // Vue.component(IndexSection.name, IndexSection)
  Vue.component(Grid.name, Grid)
  Vue.component(GridItem.name, GridItem)
  Vue.component(Flex.name, Flex)
  Vue.component(FlexItem.name, FlexItem)
  // Vue.use(InfiniteScroll)
  // Vue.use(Lazyload, {
  //   loading: require('./assets/loading-spin.svg'),
  //   try: 3
  // })

  Vue.$dialog = Vue.prototype.$dialog = Dialog
  Vue.$toast = Vue.prototype.$toast = Toast
  Vue.$indicator = Vue.prototype.$indicator = Indicator
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

module.exports = {
  version: '1.0.0',
  install,
  // Header,
  Button,
  CellGroup,
  Cell,
  // Field,
  // Badge,
  Switch,
  // Spinner,
  // TabContainerItem,
  // TabContainer,
  Navbar,
  Tabbar,
  TabItem,
  Search,
  Checklist,
  Radio,
  // Loadmore,
  Actionsheet,
  // Popup,
  // Swipe,
  // SwipeItem,
  // Range,
  // Picker,
  Progress,
  Toast,
  Indicator,
  Dialog,
  // InfiniteScroll,
  // Lazyload,
  // DatetimePicker,
  // IndexList,
  // IndexSection
  Grid,
  GridItem,
  Flex,
  FlexItem
}
