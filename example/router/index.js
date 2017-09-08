import Vue from 'vue'
import VueRouter from 'vue-router'
import Navs from './nav.json'
export const navs = Navs

Vue.use(VueRouter)

const registerRoute = (groups) => {
  let routes = []

  groups.map(group => {
    let groupItems = group.navItems

    groupItems.map(nav => {
      try {
        routes.push({
          path: `${nav.path}`,
          component: resolve => require([`../pages${nav.path}.vue`], resolve),
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
  component: resolve => require(['../pages/index.vue'], resolve),
  name: 'index',
  meta: {
    title: 'WE-VUE',
    description: 'weui1.x + vue2.x + webpack2.x = we-vue'
  }
})

routes.push({
  path: '*',
  component: resolve => require(['../pages/404.vue'], resolve),
  name: '404',
  meta: {
    title: '404 Not Found',
    description: ''
  }
})

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
