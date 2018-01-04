import ScrollUtil from '@/utils/scroll'
import sinon from 'sinon'

describe('utils scroll', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.reset()
  })

  it('isAttached method', () => {
    const element = document.createElement('div')

    expect(ScrollUtil.isAttached(element)).toBe(false)

    // append element to document
    document.body.appendChild(element)
    expect(ScrollUtil.isAttached(element)).toBe(true)

    // create a mockElement
    const mockElement = {
      parentNode: {
        nodeType: 11
      }
    }
    expect(ScrollUtil.isAttached(mockElement)).toBe(false)
  })

  // TODO:
  it('debounce method', () => {
    // debounce should be defines as functin
    expect(typeof ScrollUtil.debounce).toEqual('function')

    // debounce should return a functin
    expect(typeof ScrollUtil.debounce()).toEqual('function')

    // the callback stub
    const callback = sinon.stub()

    let fn = ScrollUtil.debounce(callback, 100)

    setTimeout(fn, 100)
    setTimeout(fn, 250)

    clock.tick(200)

    expect(callback.called).toBe(true)
  })

  it('getScrollEventTarget method', () => {
    const element = document.createElement('div')

    element.style.overflowY = 'scroll'

    // append element to document
    document.body.appendChild(element)
    expect(ScrollUtil.getScrollEventTarget(element)).toBe(element)

    // overflowY is not 'scroll' or 'auto'
    element.style.overflowY = 'hidden'
    expect(ScrollUtil.getScrollEventTarget(element)).toBe(window)
  })

  it('getScrollTop method', () => {
    // the element has scrollTop property
    let element = { scrollTop: 10 }

    expect(ScrollUtil.getScrollTop(element)).toBe(10)

    // the element has no scrollTop property
    element = { pageYOffset: 20 }

    expect(ScrollUtil.getScrollTop(element)).toBe(20)
  })

  it('setScrollTop method', () => {
    // the element has scrollTop property
    let element = { scrollTop: null }

    ScrollUtil.setScrollTop(element, 10)

    expect(element.scrollTop).toBe(10)

    // the element HAS NO scrollTop property
    const scrollToSpy = sinon.spy()
    element = {
      scrollX: 0,
      scrollTo: scrollToSpy
    }

    ScrollUtil.setScrollTop(element, 10)

    expect(scrollToSpy.calledWith(0, 10)).toBe(true)
  })

  it('getElementTop method', () => {
    // getElementTop of window
    expect(ScrollUtil.getElementTop(window)).toBe(0)

    const element = {getBoundingClientRect: () => {}}

    const getBoundingClientRectStub = sinon.stub(element, 'getBoundingClientRect')
    getBoundingClientRectStub.returns({ top: 10 })

    const getScrollTopStub = sinon.stub(ScrollUtil, 'getScrollTop')
    getScrollTopStub.withArgs(window).returns(10)

    expect(ScrollUtil.getElementTop(element)).toBe(20)

    getBoundingClientRectStub.restore()
    getScrollTopStub.restore()
  })

  it('getVisibleHeight method', () => {
    // getVisibleHeight of window
    expect(ScrollUtil.getVisibleHeight(window)).toBe(window.innerHeight)

    const element = {getBoundingClientRect: () => {}}

    const getBoundingClientRectStub = sinon.stub(element, 'getBoundingClientRect')
    getBoundingClientRectStub.returns({ height: 10 })

    expect(ScrollUtil.getVisibleHeight(element)).toBe(10)

    getBoundingClientRectStub.restore()
  })
})
