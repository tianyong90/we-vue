import Vue from 'vue'
import { createLocalVue } from '@vue/test-utils'
import WeVue from '@/components/we-vue'

describe('we-vue', () => {
  test('should register compoennts and directives', async () => {
    const { component, directive, use } = Vue

    Vue.component = jest.fn()
    Vue.directive = jest.fn()
    Vue.use = jest.fn()

    // TODO

    Vue.use = jest.fn()
    WeVue.install(Vue, {
      component: {
        component: 'component',
      },
    })
    expect(Vue.use).not.toBeCalled()
  })

  test('WeVue should be instaled in index.js', () => {
    const localVue = createLocalVue()

    localVue.use(WeVue)
  })
})
