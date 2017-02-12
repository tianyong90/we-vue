import Navs from './nav.json'
export const navs = Navs

const registerRoute = (groups) => {
  let routes = []

  groups.map(group => {
    let groupItems = group.navItems

    groupItems.map(nav => {
      try {
        routes.push({
          path: `${nav.path}`,
          component: require(`../pages${nav.path}.vue`),
          name: nav.title || nav.name,
          meta: {
            title: nav.title || nav.name,
            description: nav.description
          }
        })
      } catch (e) {
        console.error(e)
        nav.disabled = true
      }
    })
  })

  return routes
}

const routes = registerRoute(Navs)

routes.push({
  path: '/',
  component: require('../pages/index.vue'),
  name: 'index',
  meta: {
    title: 'WE-VUE',
    description: 'weui1.x + vue2.x + webpack2.x = we-vue'
  }
})

routes.push({
  path: '*',
  component: require('../pages/404.vue'),
  name: '404',
  meta: {
    title: '',
    description: ''
  }
})

export default routes
