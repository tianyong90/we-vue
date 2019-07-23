import { VueConstructor } from 'vue'
import { WeVueUseOptions } from 'types'

export function install (Vue: VueConstructor, args: WeVueUseOptions = {}) {
  if ((install as any).installed) return
  (install as any).installed = true

  const components = args.components || {}
  const directives = args.directives || {}
  const plugins = args.plugins || {}

  for (const name in directives) {
    const directive = directives[name]
    Vue.directive(name, directive)
  }

  for (const name in plugins) {
    const plugin = plugins[name]
    Vue.use(plugin)
  }

  ;(function registerComponents (components: any) {
    if (components) {
      for (const key in components) {
        const component = components[key]
        Vue.component(key, component as typeof Vue)
      }
      return true
    }
    return false
  })(components)
}
