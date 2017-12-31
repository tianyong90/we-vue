import { mount, createLocalVue } from 'vue-test-utils'
import InfiniteScrollComponent from '../components/infinite-scroll-component'
import sinon from 'sinon'

describe('infinite-scroll', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  let defaultList = []
  for (let i = 0; i < 10; i++) {
    defaultList.push(i)
  }

  // TODO:
  it('create', () => {
    const loadMoreSpy = sinon.spy()
    const localVue = createLocalVue()
    wrapper = mount(InfiniteScrollComponent, {
      attachToDocument: true,
      propsData: {
        disabled: false,
        list: defaultList
      },
      methods: {
        loadMore: loadMoreSpy
      }
    })

    localVue.nextTick(() => {
      wrapper.element.scrollTo(0, 1000)

      expect(loadMoreSpy.called).toBe(true)
    })
  })

  // TODO;
  // it('unbind directive', () => {
  //   const loadMoreSpy = sinon.spy()
  //   wrapper = mount(InfiniteScrollComponent, {
  //     attachToDocument: true,
  //     propsData: {
  //       disabled: false,
  //       list: defaultList,
  //       loadMore: loadMoreSpy
  //     }
  //   })
  //
  //   InfiniteScroll.unbind(wrapper.find('.list').element)
  //
  //   expect(loadMoreSpy.called).toBeTruthy()
  // })
})
