import { shallowMount } from '@vue/test-utils'
import DialogApi from '@/dialog'
import Dialog from '@/dialog/dialog'
import { transitionGroupStub, later } from '../utils'

transitionGroupStub()

describe('test dialog api', () => {
  afterEach(() => {
    DialogApi.close()
  })

  test('create a dialog', async () => {
    const callback = jest.fn()

    DialogApi.close()

    DialogApi({
      title: 'title',
      message: 'test message',
      skin: 'ios',
      showCancelBtn: true
    }, callback)

    await later()

    expect(document.querySelector('.weui-dialog')).toBeTruthy()
  })

  // test('open an alert dialog', () => {
  //   DialogApi.alert({}).then(action => {
  //     expect(action).toBe('confirm')
  //   })
  //
  //   expect(document.querySelector('.weui-dialog')).toBeTruthy()
  //   document.querySelector('.weui-dialog__ft>.weui-dialog__btn_primary').click()
  // })
  //
  // test('open a confirm dialog, and confirm it', () => {
  //   DialogApi.confirm({}).then(action => {
  //     expect(action).toBe('confirm')
  //   })
  //
  //   expect(document.querySelector('.weui-dialog')).toBeTruthy()
  //   document.querySelector('.weui-dialog__ft>.weui-dialog__btn_primary').click()
  // })
  //
  // test('open a confirm dialog, and cancle it', () => {
  //   DialogApi.confirm({}).catch(action => {
  //     expect(action).toBe('cancel')
  //   })
  //
  //   expect(document.querySelector('.weui-dialog')).toBeTruthy()
  //   document.querySelector('.weui-dialog__ft>.weui-dialog__btn_default').click()
  // })
  //
  // test('open a confirm dialog with callback', () => {
  //   DialogApi.confirm({
  //     callback: action => {
  //       expect(action).toBe('confirm')
  //     }
  //   })
  //
  //   expect(document.querySelector('.weui-dialog')).toBeTruthy()
  //   document.querySelector('.weui-dialog__ft>.weui-dialog__btn_primary').click()
  // })
})

// describe('dialog component', () => {
//   let wrapper
//   afterEach(() => {
//     wrapper && wrapper.destroy()
//   })
//
//   test('create', () => {
//     wrapper = shallowMount(Dialog, {
//       propsData: {}
//     })
//
//     expect(wrapper.name()).toBe('wv-dialog')
//     expect(wrapper.contains('.weui-dialog')).toBeTruthy()
//   })
//
//   test('click cancel button', () => {
//     const callbackSpy = jest.fn()
//
//     wrapper = shallowMount(Dialog, {
//       propsData: {
//         'visible.sync': true,
//         callback: callbackSpy
//       }
//     })
//
//     wrapper.findAll('.weui-dialog__btn').at(0).trigger('click')
//     expect(wrapper.vm.visible).toBe(false)
//     expect(wrapper.emitted().cancel).toBeTruthy()
//     expect(callbackSpy).toHaveBeenCalled()
//   })
//
//   test('click confirm button', () => {
//     const callbackSpy = jest.fn()
//
//     wrapper = shallowMount(Dialog, {
//       propsData: {
//         'visible.sync': true,
//         callback: callbackSpy
//       }
//     })
//
//     wrapper.findAll('.weui-dialog__btn').at(1).trigger('click')
//     expect(wrapper.vm.visible).toBe(false)
//     expect(wrapper.emitted().confirm).toBeTruthy()
//     expect(callbackSpy).toHaveBeenCalled()
//   })
// })
