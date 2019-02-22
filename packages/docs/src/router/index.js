/* eslint-disable camelcase */
import Vue from 'vue'
import Router from 'vue-router'
import routes_v2 from './v2'
import routes_v3 from './v3'

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
      component: () => import('../views/index')
    },
    {
      path: '/doc',
      name: 'doc',
      component: () => import('../views/doc'),
      children: [...routes_v2, ...routes_v3]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
