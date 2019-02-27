import ClickOutside from '@/directives/click-outside'

function bootstrap () {
  let registeredHandler

  const el = document.createElement('div')

  const binding = {
    value: jest.fn(),
  }

  jest.spyOn(global.document.body, 'addEventListener').mockImplementation((eventName, eventHandler, options) => {
    registeredHandler = eventHandler
  })

  jest.spyOn(global.document.body, 'removeEventListener')

  ClickOutside.inserted(el, binding)

  return {
    callback: binding.value,
    el,
    registeredHandler,
  }
}

describe('click-outside', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()

    jest.clearAllMocks()
  })

  test('should register and unregister handler', () => {
    const { registeredHandler, el } = bootstrap()

    expect(global.document.body.addEventListener).toHaveBeenCalledWith('click', registeredHandler, true)

    ClickOutside.unbind(el)
    expect(global.document.body.removeEventListener).toHaveBeenCalledWith('click', registeredHandler, true)
  })

  test('callback should be called when click outside', () => {
    const { registeredHandler, callback, el } = bootstrap()

    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })

    registeredHandler(event)

    expect(callback).toHaveBeenCalled()
  })
})
