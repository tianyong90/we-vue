import InfiniteScroll from './directive'
import '../../style/empty.css'
import Vue from 'vue'

const install = function (Vue) {
  Vue.directive('InfiniteScroll', InfiniteScroll)
}

if (!Vue.prototype.$isServer && window.Vue) {
  window.infiniteScroll = InfiniteScroll
  Vue.use(install)
}

InfiniteScroll.install = install
export default InfiniteScroll
