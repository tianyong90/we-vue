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

  it('click cancel button', (done) => {
    const callbackSpy = sinon.spy()

    wrapper = shallow(Dialog, {
      propsData: {
        'visible.sync': true,
        callback: callbackSpy
      }
    })

    setTimeout(() => {
      wrapper.findAll('.weui-dialog__btn').at(0).trigger('click')
      expect(wrapper.vm.visible).toBe(false)
      expect(wrapper.emitted().cancel).toBeTruthy()
      expect(callbackSpy.called).toBeTruthy()

      done()
    }, 50)
  })

  it('click confirm button', (done) => {
    const callbackSpy = sinon.spy()

    wrapper = shallow(Dialog, {
      propsData: {
        'visible.sync': true,
        callback: callbackSpy
      }
    })

    setTimeout(() => {
      wrapper.findAll('.weui-dialog__btn').at(1).trigger('click')
      expect(wrapper.vm.visible).toBe(false)
      expect(wrapper.emitted().confirm).toBeTruthy()
      expect(callbackSpy.called).toBeTruthy()

      done()
    }, 50)
  })
})
