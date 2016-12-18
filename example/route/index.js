import NavConfig from './nav.json'

const registerRoute = (config) => {
  let routes = []
  config.map(nav => {
    try {
      routes.push(
        {
          path: `${nav.path}`,
          component: require(`../pages${nav.path}.vue`),
          name: nav.title || nav.name,
          meta: {
            title: nav.title || nav.name,
            description: nav.description
          }
        }
      )
    } catch (e) {
      console.error(e)
      nav.disabled = true
    }
  })

  return { routes, navs: config }
}

const route = registerRoute(NavConfig)

export const navs = route.navs

route.routes.push({
  path: '/',
  component: require('../pages/home.vue')
})

export default route.routes
