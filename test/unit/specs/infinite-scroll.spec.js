import { mount } from 'vue-test-utils'
import InfiniteScrollComponent from '../components/infinite-scroll-component'
// import { dragHelper } from '../utils'

describe('infinite-scroll', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = mount(InfiniteScrollComponent, {
      propsData: {}
    })
  })

  // it('drag the handler', () => {
  //   wrapper = mount(InfiniteScrollComponent, {
  //     attachToDocument: true
  //   })
  //
  //   const rightWidth = wrapper.vm.$refs.rightBtns.clientWidth
  //
  //   // drag to left (distance = 20px)
  //   dragHelper(wrapper.find({ref: 'cellBd'}), -20, 0)
  //
  //   expect(wrapper.vm.offset).toBe(0)
  //
  //   // drag to right (distance = 20px)
  //   dragHelper(wrapper.find({ref: 'cellBd'}), 20, 0)
  //
  //   expect(wrapper.vm.offset).toBe(0)
  //
  //   // drag to left (distance < 20px)
  //   dragHelper(wrapper.find({ref: 'cellBd'}), -10, 0)
  //
  //   expect(wrapper.vm.offset).toBe(0)
  //
  //   // drag to right (distance = 20px)
  //   dragHelper(wrapper.find({ref: 'cellBd'}), -rightWidth, 0)
  //
  //   // drag to right (distance < 20px)
  //   dragHelper(wrapper.find({ref: 'cellBd'}), 10, 0)
  //
  //   expect(wrapper.vm.offset).toBe(0)
  // })
})
