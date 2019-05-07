import Vue from 'vue'
import Modal from './Modal'
import context from './context'

const defaultConfig = {
  className: '',
  customStyle: {}
}

let mask

export function openMask (vm, config) {
  if (!context.stack.some(item => item.vm === vm)) {
    context.stack.push({ vm, config })
    updateMask()
  }
}

export function closeMask (vm) {
  const { stack } = context

  if (stack.length) {
    if (context.top.vm === vm) {
      stack.pop()
      updateMask()
    } else {
      context.stack = stack.filter(item => item.vm !== vm)
    }
  }
}

export function updateMask () {
  if (!mask) {
    mask = new (Vue.extend(Modal))({
      el: document.createElement('div')
    })
    mask.$on('click', onClickMask)
  }

  if (context.top) {
    const { vm, config } = context.top

    const el = vm.$el
    const target = el && el.parentNode ? el.parentNode : document.body

    if (target) {
      target.appendChild(mask.$el)
    }
    Object.assign(mask, defaultConfig, config, { visible: true })
  } else {
    mask.visible = false
  }
}

// close popup when click modal && closeOnClickMask is true
export function onClickMask () {
  if (context.top) {
    const { vm } = context.top
    vm.$emit('click-mask')
    vm.closeOnClickMask && vm.close()
  }
}
