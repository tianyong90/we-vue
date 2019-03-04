import ClickOutside from '../click-outside'

function bootstrap () {
  let registeredHandler = {} as any

  const el = document.createElement('div')

  const binding = {
    value: jest.fn(),
  }

  jest.spyOn(document.body, 'addEventListener').mockImplementation((eventName, eventHandler, options) => {
    registeredHandler = eventHandler
  })

  jest.spyOn(document.body, 'removeEventListener')

  ClickOutside.inserted(el, binding as any)

  return {
    callback: binding.value,
    el,
    registeredHandler,
  }
}

describe('click-outside', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should register and unregister handler', () => {
    const { registeredHandler, el } = bootstrap()

    expect(document.body.addEventListener).toHaveBeenCalledWith('click', registeredHandler, true)

    ClickOutside.unbind(el)
    expect(document.body.removeEventListener).toHaveBeenCalledWith('click', registeredHandler, true)
  })

  test('callback should be called when click outside', () => {
    const { registeredHandler, callback } = bootstrap()

    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })

    registeredHandler(event)

    expect(callback).toHaveBeenCalled()
  })
})
