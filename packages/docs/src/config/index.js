/* eslint-disable camelcase */

const nav = {
  v2: () => import('./nav_v2'),
  v3: () => import('./nav_v3')
}

export { nav }
