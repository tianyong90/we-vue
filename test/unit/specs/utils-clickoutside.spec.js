import { shallow } from '@vue/test-utils'
import ClickoutsideComponent from '../components/clickoutside-component'

describe('clickoutside', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('test handlers', () => {
    const onClickoutside1Spy = jest.fn()
    const onClickoutside2Spy = jest.fn()

    wrapper = shallow(ClickoutsideComponent, {
      attachToDocument: true,
      methods: {
        onClickoutside1: onClickoutside1Spy,
        onClickoutside2: onClickoutside2Spy
      }
    })

    // onClickoutside2Spy should be called when click .item-1
    wrapper.find('.item-1').trigger('click')

    expect(onClickoutside1Spy).not.toHaveBeenCalled()
    expect(onClickoutside2Spy).toHaveBeenCalled()

    onClickoutside1Spy.mockClear()
    onClickoutside2Spy.mockClear()

    // both handler should be called when click .item-3
    wrapper.find('.item-3').trigger('click')

    expect(onClickoutside1Spy).toHaveBeenCalledTimes(1)
    expect(onClickoutside2Spy).toHaveBeenCalledTimes(1)
  })
})
