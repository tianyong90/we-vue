import '../style/empty.css'
import InfiniteScroll from './directive'
import Vue from 'vue'

const install = (Vue) => {
  Vue.directive('InfiniteScroll', InfiniteScroll)
}

/* istanbul ignore next */
if (!Vue.prototype.$isServer && window.Vue) {
  window.infiniteScroll = InfiniteScroll
  Vue.use(install)
}

InfiniteScroll.install = install

export default InfiniteScroll
