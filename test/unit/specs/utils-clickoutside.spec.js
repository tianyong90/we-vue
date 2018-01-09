import { shallow } from 'vue-test-utils'
import ClickoutsideComponent from '../components/clickoutside-component'
import sinon from 'sinon'

describe('clickoutside', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('test handlers', () => {
    const onClickoutside1Spy = sinon.spy()
    const onClickoutside2Spy = sinon.spy()

    wrapper = shallow(ClickoutsideComponent, {
      attachToDocument: true,
      methods: {
        onClickoutside1: onClickoutside1Spy,
        onClickoutside2: onClickoutside2Spy
      }
    })

    // onClickoutside2Spy should be called when click .item-1
    wrapper.find('.item-1').trigger('click')

    expect(onClickoutside1Spy.called).toBe(false)
    expect(onClickoutside2Spy.called).toBe(true)

    onClickoutside1Spy.resetHistory()
    onClickoutside2Spy.resetHistory()

    // both handler should be called when click .item-3
    wrapper.find('.item-3').trigger('click')

    expect(onClickoutside1Spy.calledOnce).toBe(true)
    expect(onClickoutside2Spy.calledOnce).toBe(true)
  })
})
