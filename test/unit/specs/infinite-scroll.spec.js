import { mount } from 'vue-test-utils'
import InfiniteScrollComponent from '../components/infinite-scroll-component'
import sinon from 'sinon'

describe('infinite-scroll', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    const loadMoreSpy = sinon.spy()
    wrapper = mount(InfiniteScrollComponent, {
      attachToDocument: true,
      propsData: {
        disabled: false,
        list: [],
        onLoadMore: loadMoreSpy
      },
      methods: {
        loadMore: loadMoreSpy
      }
    })

    setTimeout(() => {
      expect(loadMoreSpy.called).toBe(false)
    }, 500)

    wrapper.vm.$nextTick(() => {
      expect(loadMoreSpy.called).toBe(false)
    })
  })

  // TODO:
  it('test loadMore function', (done) => {
    const loadMoreSpy = sinon.spy(function () {
      wrapper.vm.list = wrapper.vm.list.concat([{id: 1}, {id: 2}, {id: 3}])
      wrapper.vm.disabled = true
    })
    wrapper = mount(InfiniteScrollComponent, {
      attachToDocument: true,
      propsData: {
        disabled: false,
        list: [{id: 10}],
        onLoadMore: loadMoreSpy
      }
    })

    setTimeout(() => {
      const callCount = loadMoreSpy.callCount

      const item = wrapper.findAll('.list-item')
      // expect(loadMoreSpy.calledOnce).toBe(true)
      // expect(loadMoreSpy.called).toBe(true)
      // expect(item.length).toEqual(4)
      // expect(item[item.length - 1].text()).toEqual('3')
      done()
    }, 500)
  })

  it('test disabled', (done) => {
    const loadMoreSpy = sinon.spy()
    wrapper = mount(InfiniteScrollComponent, {
      attachToDocument: true,
      propsData: {
        disabled: true,
        list: [],
        onLoadMore: loadMoreSpy
      }
    })

    setTimeout(() => {
      expect(loadMoreSpy.called).toBe(false)
    }, 500)

    setTimeout(() => {
      wrapper.setProps({
        disabled: false
      })

      setTimeout(() => {
        expect(loadMoreSpy.called).toBe(true)
        done()
      }, 500)
    }, 600)
  })

  // TODO
  it('scrollTarget height === 0', (done) => {
    const loadMoreSpy = sinon.spy()
    wrapper = mount(InfiniteScrollComponent, {
      attachToDocument: true,
      propsData: {
        disabled: false,
        display: 'none',
        list: [],
        onLoadMore: loadMoreSpy
      }
    })

    setTimeout(() => {
      const el = wrapper.vm.$el.outerHTML

      expect(loadMoreSpy.called).toBe(false)
      done()
    }, 500)
  })

  it('don not loadmore when mounted, immedialateCheck === false', (done) => {
    const loadMoreSpy = sinon.spy()
    wrapper = mount(InfiniteScrollComponent, {
      attachToDocument: true,
      propsData: {
        immediateCheck: false,
        list: [],
        onLoadMore: loadMoreSpy
      }
    })

    setTimeout(() => {
      expect(loadMoreSpy.called).toBe(false)
      done()
    }, 500)
  })
})
