import Vue from 'vue'
import Router from 'vue-router'
import routes_v1_6 from './v1_6'
import routes_v2_0 from './v2_0'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  scrollBehavior: (to, from, savedPosition) => {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/index')
    },
    {
      path: '/doc',
      name: 'doc',
      component: () => import('../components/doc'),
      children: [
        ...routes_v1_6,
        ...routes_v2_0
      ]
    }
  ]
})
