import { shallow } from 'vue-test-utils'
import DialogApi from '@/components/dialog'
import Dialog from '@/components/dialog/dialog.vue'
import sinon from 'sinon'

describe('test dialog api', () => {
  afterEach(() => {
    DialogApi.close()
  })

  it('open a dialog', () => {
    const callback = sinon.spy()

    DialogApi({
      title: 'title',
      message: '欢迎使用 we-vue!',
      skin: 'ios',
      showCancelBtn: true
    }, callback)

    setTimeout(() => {
      expect(document.querySelector('.weui-dialog')).toBeTruthy()
      document.querySelector('.weui-dialog__ft>.weui-dialog__btn_primary').click()

      expect(callback.called).toBeTruthy()
    }, 200)
  })

  it('open a alert dialog', () => {
    DialogApi.alert({
      title: 'title',
      message: '欢迎使用 we-vue!',
      skin: 'ios',
      showCancelBtn: true
    })

    setTimeout(() => {
      expect(document.querySelector('.weui-dialog')).toBeTruthy()
      document.querySelector('.weui-dialog__ft>.weui-dialog__btn_primary').click()
    }, 200)
  })

  it('open a confirm dialog', () => {
    DialogApi.confirm({
      title: 'title',
      message: '欢迎使用 we-vue!',
      skin: 'ios',
      showCancelBtn: true
    })

    setTimeout(() => {
      expect(document.querySelector('.weui-dialog')).toBeTruthy()
      document.querySelector('.weui-dialog__ft>.weui-dialog__btn_primary').click()
    }, 200)
  })
})

describe('dialog', () => {
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
})
