import InfiniteScroll from './directive'
import Vue, { VueConstructor } from 'vue'

const install = (Vue: VueConstructor) => {
  Vue.directive('InfiniteScroll', InfiniteScroll)
}

/* istanbul ignore next */
if (!Vue.prototype.$isServer && window.Vue) {
  Vue.use(install)
}

// TODO
// InfiniteScroll.install = install

export default InfiniteScroll
