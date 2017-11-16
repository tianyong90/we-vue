import Vue from 'vue'
import Button from '@/components/button'

describe('Button.vue', () => {
  it('name should be \'wv-button\'', () => {
    const Constructor = Vue.extend(Button)
    const vm = new Constructor().$mount()
    expect(vm.$options.name).to.equal('wv-button')
  })
})
