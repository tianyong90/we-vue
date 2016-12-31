import Navs from './nav.json'

export const navs = Navs

const registerRoute = (navs) => {
  let routes = []
  navs.map(nav => {
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

  return routes
}

const routes = registerRoute(Navs)

routes.push({
  path: '/',
  component: require('../pages/home.vue'),
  name: 'home',
  meta: {
    title: 'WE-VUE',
    description: 'description'
  }
})

export default routes
