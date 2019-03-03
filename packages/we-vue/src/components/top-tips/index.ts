import Vue, { PluginFunction } from 'vue'
import TopTipsComponent from './top-tips'
import { isObj } from '../../utils'

type TopTipsOptions = {
  message?: string
  visible?: boolean
  duration?: number
}

type TopTipsParams = (string | Partial<TopTipsOptions>)

type InstanceType = Vue & {
  visible?: boolean
  timer?: any
}

export interface TopTips {
  (params: TopTipsParams): InstanceType
  close (): void
  setDefaultOptions (options: TopTipsOptions): void
  resetDefaultOptions (): void
  install?: PluginFunction<Vue>
  defaultOptions?: TopTipsOptions
}

let instance: InstanceType

const defaultOptions: TopTipsOptions = {
  visible: true,
  message: '',
  duration: 3000,
}

function parseOptions (params: TopTipsParams): Partial<TopTipsOptions> {
  return (isObj(params) ? <object>params : { message: params })
}

const createInstance: () => void = () => {
  instance = new (Vue.extend(TopTipsComponent))({
    el: document.createElement('div'),
  })

  instance.$on('update:visible', (visible: boolean) => {
    instance.visible = visible
  })

  document.body.appendChild(instance.$el)
}

const TopTips = <TopTips> function (options: TopTipsParams) {
  options = {
    ...TopTips.defaultOptions,
    ...parseOptions(options),
  }

  if (!instance) {
    createInstance()
  }

  Object.assign(instance, options)
  clearTimeout(instance.timer)

  Object.assign(instance, { ...options as TopTipsOptions })

  if ((options as TopTipsOptions).duration! > 0) {
    instance.timer = setTimeout(() => {
      instance.visible = false
    }, options.duration)
  }

  return instance
}

TopTips.defaultOptions = defaultOptions

TopTips.close = function (): void {
  if (instance) {
    instance.visible = false
  }
}

TopTips.setDefaultOptions = function (options: Partial<TopTipsOptions>): void {
  TopTips.defaultOptions = { ...defaultOptions, ...options }
}

TopTips.resetDefaultOptions = function (): void {
  TopTips.defaultOptions = defaultOptions
}

TopTips.install = () => {
  // TODO
}
Vue.prototype.$toptips = TopTips

export { TopTips }
export default TopTips
