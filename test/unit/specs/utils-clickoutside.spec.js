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

    expect(onClickoutside1Spy..mock.calls.length).toBeFalsy()
    expect(onClickoutside2Spy..mock.calls.length).toBeTruthy()

    onClickoutside1Spy.resetHistory()
    onClickoutside2Spy.resetHistory()

    // both handler should be called when click .item-3
    wrapper.find('.item-3').trigger('click')

    expect(onClickoutside1Spy.mock.calls.length).toBe(1)
    expect(onClickoutside2Spy.mock.calls.length).toBe(1)
  })
})
