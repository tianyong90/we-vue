import Vue from 'vue'
import TopTipsComponent from './top-tips'
import { isObj } from '../../utils'

type TopTipsOptions = {
  message: string
  visible?: boolean
  duration?: number
}

type TopTipsType = {
  visible: boolean
  timer?: any
  defaultOptions?: TopTipsOptions
} & Vue

const defaultOptions: TopTipsOptions = {
  visible: true,
  message: '',
  duration: 3000,
}

let instance: TopTipsType
let currentOptions: TopTipsOptions = { ...defaultOptions }

function parseOptions (message: TopTipsOptions | string): object {
  return (isObj(message) ? <object>message : { message })
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

function TopTips (options: TopTipsOptions | string) {
  options = {
    ...currentOptions,
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
    }, (options as TopTipsOptions).duration)
  }

  return instance
}

TopTips.close = function (): void {
  if (instance) {
    instance.visible = false
  }
}

TopTips.setDefaultOptions = function (options: TopTipsOptions): void {
  Object.assign(currentOptions, options)
}

TopTips.resetDefaultOptions = function (): void {
  currentOptions = { ...defaultOptions }
}

Vue.prototype.$toptips = TopTips

export default TopTips
