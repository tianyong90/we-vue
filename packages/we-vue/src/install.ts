import * as _components from './components'
import * as _directives from './directives'
// lazyload plugin
import { Lazyload } from './plugins'

import { VueConstructor } from 'vue'

import { WeVueUseOptions } from 'types'

export function install (Vue: VueConstructor, args: WeVueUseOptions = {}) {
  if ((install as any).installed) return

  (install as any).installed = true

  const directives = args.directives || _directives as any
  const components = args.components || _components as any

  for (const name in directives) {
    if (directives.hasOwnProperty(name)) {
      const directive = directives[name]
      Vue.directive(name, directive)
    }
  }

  // install lazyload plugin
  Vue.use(Lazyload)

  ;(function registerComponents (components: any) {
    if (components) {
      for (const key in components) {
        const component = components[key]
        if (component) {
          // TODO: 前线可配置
          Vue.component(key, component as typeof Vue)
        }
      }
    }
  })(args.components || components)
}
