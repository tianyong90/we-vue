import { shallow } from 'vue-test-utils'
import DialogApi from '@/components/dialog'
import Dialog from '@/components/dialog/dialog.vue'
import sinon from 'sinon'

describe('test dialog api', () => {
  afterEach(() => {
    DialogApi.close()
  })

  it('create a dialog', () => {
    const callbackSpy = sinon.spy()

    DialogApi({
      title: 'title',
      message: 'test message',
      skin: 'ios',
      showCancelBtn: true
    }, callbackSpy)

    setTimeout(() => {
      expect(document.querySelector('.weui-dialog')).toBeTruthy()
    }, 300)
  })

  it('create an alert dialog', (done) => {
    DialogApi.alert({}).then(action => {
      expect(action).toBe('confirm')
      done()
    })

    setTimeout(() => {
      expect(document.querySelector('.weui-dialog')).toBeTruthy()
      document.querySelector('.weui-dialog__ft>.weui-dialog__btn_primary').click()
    }, 300)
  })

  it('open a confirm dialog, and confirm it', (done) => {
    DialogApi.confirm({}).then(action => {
      expect(action).toBe('confirm')
      done()
    })

    setTimeout(() => {
      expect(document.querySelector('.weui-dialog')).toBeTruthy()
      document.querySelector('.weui-dialog__ft>.weui-dialog__btn_primary').click()
    }, 300)
  })

  it('open a confirm dialog, and cancle it', (done) => {
    DialogApi.confirm({}).catch(action => {
      expect(action).toBe('cancel')
      done()
    })

    setTimeout(() => {
      expect(document.querySelector('.weui-dialog')).toBeTruthy()
      document.querySelector('.weui-dialog__ft>.weui-dialog__btn_default').click()
    }, 300)
  })

  it('open a confirm dialog with callback', (done) => {
    DialogApi.confirm({
      callback: action => {
        expect(action).toBe('confirm')
        done()
      }
    })

    setTimeout(() => {
      expect(document.querySelector('.weui-dialog')).toBeTruthy()
      document.querySelector('.weui-dialog__ft>.weui-dialog__btn_primary').click()
    }, 300)
  })
})

describe('dialog component', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Dialog, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-dialog')
    expect(wrapper.contains('.weui-dialog')).toBeTruthy()
  })

  // TODO
  it('click cancel button', () => {
    wrapper = shallow(Dialog, {
      propsData: {}
    })

    wrapper.findAll('.weui-dialog__btn').at(0).trigger('click')

    // expect(wrapper.name()).toBe('wv-dialog')
    // expect(wrapper.contains('.weui-dialog')).toBeTruthy()
  })

  // TODO
  it('click confirm button', () => {
    wrapper = shallow(Dialog, {
      propsData: {}
    })

    wrapper.findAll('.weui-dialog__btn').at(1).trigger('click')

    // expect(wrapper.name()).toBe('wv-dialog')
    // expect(wrapper.contains('.weui-dialog')).toBeTruthy()
  })
})
