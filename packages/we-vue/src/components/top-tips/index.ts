import Vue from 'vue'
import TopTipsComponent from './top-tips.vue'
import { isObj } from '../../utils'
import { CombinedVueInstance, OptionsVue } from 'vue/types/vue'

type TopTipsOptions = {
  message: string,
  visible?: boolean,
  duration?: number
}

type TopTipsType = CombinedVueInstance<Vue, {}, {}, {}, {
  visible: boolean,
  timer: any
}>
// {
//   defaultOptions: TopTipsOptions,
//   currentOptions: TopTipsOptions,
//   close: Function,
//   setDefaultOptions: Function,
//   resetDefaultOptions: Function,
//   [key: string]: any
// }

const defaultOptions: TopTipsOptions = {
  message: '',
  visible: true,
  duration: 3000
}

let instance: any
let currentOptions: TopTipsOptions = { ...defaultOptions }

const parseOptions: (message: string | object) => object = message => (isObj(message) ? <object>message : { message })

const createInstance: () => void = () => {
  instance = new (Vue.extend(TopTipsComponent))({
    el: document.createElement('div')
  })

  instance.$on('update:visible', visible => {
    instance.visible = visible
  })

  document.body.appendChild(instance.$el)
}

const TopTips: (options: TopTipsOptions | string) => TopTipsType = options => {
  options = {
    ...currentOptions,
    ...parseOptions(options)
  }

  // if (!instance) {
  //   createInstance()
  // }
  //
  // Object.assign(instance, options)
  // clearTimeout(instance.timer)
  //
  // Object.assign(instance, { ...options })
  //
  // if (options.duration > 0) {
  //   instance.timer = setTimeout(() => {
  //     instance.visible = false
  //   }, options.duration)
  // }
  //
  // return instance
}

// TopTips.close = () => {
//   if (instance) {
//     instance.visible = false
//   }
// }
//
// TopTips.setDefaultOptions = options => {
//   Object.assign(TopTips.currentOptions, options)
// }
//
// TopTips.resetDefaultOptions = () => {
//   TopTips.currentOptions = { ...defaultOptions }
// }

Vue.prototype.$toptips = TopTips

export default TopTips
