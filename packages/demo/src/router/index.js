import Vue from 'vue'
import VueRouter from 'vue-router'
import Navs from './nav.json'
export const navs = Navs

Vue.use(VueRouter)

const registerRoute = groups => {
  let routes = []

  groups.map(group => {
    group.navItems.map(nav => {
      try {
        routes.push({
          path: `${nav.path}`,
          component: () => import(`../views${nav.path}.vue`),
          name: nav.title || nav.name,
          meta: {
            title: nav.title || nav.name,
            description: nav.description
          }
        })
      } catch (e) {
        nav.disabled = true
      }
    })
  })

  return routes
}

const routes = registerRoute(Navs)

routes.push({
  path: '/',
  component: () => import(/* webpackChunkName: "index" */ '../views/index.vue'),
  name: 'index',
  meta: {
    title: 'WE-VUE',
    description: 'weui1.x + vue2.x + webpack2.x = we-vue'
  }
})

routes.push({
  path: '*',
  component: () => import(/* webpackChunkName: "404" */ '../views/404.vue'),
  name: '404',
  meta: {
    title: '404 Not Found',
    description: ''
  }
})

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
