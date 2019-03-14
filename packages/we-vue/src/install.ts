import { VueConstructor } from 'vue'
import { WeVueUseOptions } from 'types'

export function install (Vue: VueConstructor, args: WeVueUseOptions = {}) {
  if ((install as any).installed) return
  (install as any).installed = true

  const directives = args.directives || {}
  const components = args.components || {}
  const plugins = args.plugins || {}

  for (const name in directives) {
    if (directives.hasOwnProperty(name)) {
      const directive = directives[name]
      Vue.directive(name, directive)
    }
  }

  for (const name in plugins) {
    if (plugins.hasOwnProperty(name)) {
      const plugin = plugins[name]
      Vue.use(plugin)
    }
  }

  ;(function registerComponents (components: any) {
    if (components) {
      for (const key in components) {
        if (components.hasOwnProperty(key)) {
          const component = components[key]
          // 前线可配置
          if (typeof args.namePrefix !== 'undefined') {
            Vue.component((args.namePrefix as string).toLowerCase() + key.slice(1), component as typeof Vue)
          } else {
            Vue.component(key, component as typeof Vue)
          }
        }
      }
    }
  })(components)
}
