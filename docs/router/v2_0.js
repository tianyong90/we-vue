const demoUrlBase = 'https://demo.wevue.org'

let v2_0 = [
  {
    path: 'v2_0/index',
    component: () => import('../markdown/v2_0/index.md'),
    meta: {
      title: '概述'
    }
  },
  {
    path: 'v2_0/quickstart',
    component: () => import('../markdown/v2_0/quickstart.md'),
    meta: {
      title: '快速上手'
    }
  },
  {
    path: 'v2_0/badge',
    component: () => import('../markdown/v2_0/badge.md'),
    meta: {
      title: 'Badge',
      demo_url: `${demoUrlBase}/badge`
    }
  },
  {
    path: 'v2_0/circle',
    component: () => import('../markdown/v2_0/circle.md'),
    meta: {
      title: 'Circle',
      demo_url: `${demoUrlBase}/circle`
    }
  },
  {
    path: 'v2_0/icons',
    component: () => import('../markdown/v2_0/icons.md'),
    meta: {
      title: 'Icons',
      demo_url: `${demoUrlBase}/icons`
    }
  },
  {
    path: 'v2_0/lazyload',
    component: () => import('../markdown/v2_0/lazyload.md'),
    meta: {
      title: 'Lazyload',
      demo_url: `${demoUrlBase}/lazyload`
    }
  },
  {
    path: 'v2_0/progress',
    component: () => import('../markdown/v2_0/progress.md'),
    meta: {
      title: 'Progress',
      demo_url: `${demoUrlBase}/progress`
    }
  },
  {
    path: 'v2_0/slider',
    component: () => import('../markdown/v2_0/slider.md'),
    meta: {
      title: 'Slider',
      demo_url: `${demoUrlBase}/slider`
    }
  },
  {
    path: 'v2_0/spinner',
    component: () => import('../markdown/v2_0/spinner.md'),
    meta: {
      title: 'Spinner',
      demo_url: `${demoUrlBase}/spinner`
    }
  },
  {
    path: 'v2_0/swipe',
    component: () => import('../markdown/v2_0/swipe.md'),
    meta: {
      title: 'Swipe',
      demo_url: `${demoUrlBase}/swipe`
    }
  },
  {
    path: 'v2_0/button',
    component: () => import('../markdown/v2_0/button.md'),
    meta: {
      title: 'Button',
      demo_url: `${demoUrlBase}/button`
    }
  },
  {
    path: 'v2_0/check_list',
    component: () => import('../markdown/v2_0/check_list.md'),
    meta: {
      title: 'CheckList',
      demo_url: `${demoUrlBase}/checklist`
    }
  },
  {
    path: 'v2_0/input',
    component: () => import('../markdown/v2_0/input.md'),
    meta: {
      title: 'Input',
      demo_url: `${demoUrlBase}/input`
    }
  },
  {
    path: 'v2_0/number_spinner',
    component: () => import('../markdown/v2_0/number_spinner.md'),
    meta: {
      title: 'NumberSpinner',
      demo_url: `${demoUrlBase}/number-spinner`
    }
  },
  {
    path: 'v2_0/radio',
    component: () => import('../markdown/v2_0/radio.md'),
    meta: {
      title: 'Radio',
      demo_url: `${demoUrlBase}/radio`
    }
  },
  {
    path: 'v2_0/switch',
    component: () => import('../markdown/v2_0/switch.md'),
    meta: {
      title: 'Switch',
      demo_url: `${demoUrlBase}/switch`
    }
  },
  {
    path: 'v2_0/textarea',
    component: () => import('../markdown/v2_0/textarea.md'),
    meta: {
      title: 'Textarea',
      demo_url: `${demoUrlBase}/textarea`
    }
  },
  {
    path: 'v2_0/preview',
    component: () => import('../markdown/v2_0/preview.md'),
    meta: {
      title: 'Preview',
      demo_url: `${demoUrlBase}/preview`
    }
  },
  {
    path: 'v2_0/action_sheet',
    component: () => import('../markdown/v2_0/action_sheet.md'),
    meta: {
      title: 'ActionSheet',
      demo_url: `${demoUrlBase}/actionsheet`
    }
  },
  {
    path: 'v2_0/dialog',
    component: () => import('../markdown/v2_0/dialog.md'),
    meta: {
      title: 'Dialog',
      demo_url: `${demoUrlBase}/dialog`
    }
  },
  {
    path: 'v2_0/infinite_scroll',
    component: () => import('../markdown/v2_0/infinite_scroll.md'),
    meta: {
      title: 'InfiniteScroll',
      demo_url: `${demoUrlBase}/infinite-scroll`
    }
  },
  {
    path: 'v2_0/toast',
    component: () => import('../markdown/v2_0/toast.md'),
    meta: {
      title: 'Toast',
      demo_url: `${demoUrlBase}/toast`
    }
  },
  {
    path: 'v2_0/top_tips',
    component: () => import('../markdown/v2_0/top_tips.md'),
    meta: {
      title: 'TopTips',
      demo_url: `${demoUrlBase}/top-tips`
    }
  },
  {
    path: 'v2_0/picker',
    component: () => import('../markdown/v2_0/picker.md'),
    meta: {
      title: 'Picker',
      demo_url: `${demoUrlBase}/picker`
    }
  },
  {
    path: 'v2_0/datetime_picker',
    component: () => import('../markdown/v2_0/datetime_picker.md'),
    meta: {
      title: 'DatetimePicker',
      demo_url: `${demoUrlBase}/datetime-picker`
    }
  },
  {
    path: 'v2_0/header',
    component: () => import('../markdown/v2_0/header.md'),
    meta: {
      title: 'Header',
      demo_url: `${demoUrlBase}/header`
    }
  },
  {
    path: 'v2_0/navbar',
    component: () => import('../markdown/v2_0/navbar.md'),
    meta: {
      title: 'Navbar',
      demo_url: `${demoUrlBase}/navbar`
    }
  },
  {
    path: 'v2_0/tabbar',
    component: () => import('../markdown/v2_0/tabbar.md'),
    meta: {
      title: 'Tabbar',
      demo_url: `${demoUrlBase}/tabbar`
    }
  },
  {
    path: 'v2_0/search',
    component: () => import('../markdown/v2_0/search.md'),
    meta: {
      title: 'Search',
      demo_url: `${demoUrlBase}/search`
    }
  },
  {
    path: 'v2_0/cell',
    component: () => import('../markdown/v2_0/cell.md'),
    meta: {
      title: 'Cell',
      demo_url: `${demoUrlBase}/cell`
    }
  },
  {
    path: 'v2_0/cell_swipe',
    component: () => import('../markdown/v2_0/cell_swipe.md'),
    meta: {
      title: 'CellSwipe',
      demo_url: `${demoUrlBase}/cell-swipe`
    }
  },
  {
    path: 'v2_0/flex',
    component: () => import('../markdown/v2_0/flex.md'),
    meta: {
      title: 'Flex',
      demo_url: `${demoUrlBase}/flex`
    }
  },
  {
    path: 'v2_0/footer',
    component: () => import('../markdown/v2_0/footer.md'),
    meta: {
      title: 'Footer',
      demo_url: `${demoUrlBase}/footer`
    }
  },
  {
    path: 'v2_0/grid',
    component: () => import('../markdown/v2_0/grid.md'),
    meta: {
      title: 'Grid',
      demo_url: `${demoUrlBase}/grid`
    }
  },
  {
    path: 'v2_0/loadmore',
    component: () => import('../markdown/v2_0/loadmore.md'),
    meta: {
      title: 'Loadmore',
      demo_url: `${demoUrlBase}/loadmore`
    }
  },
  {
    path: 'v2_0/panel',
    component: () => import('../markdown/v2_0/panel.md'),
    meta: {
      title: 'Panel',
      demo_url: `${demoUrlBase}/panel`
    }
  },
  {
    path: 'v2_0/popup',
    component: () => import('../markdown/v2_0/popup.md'),
    meta: {
      title: 'Popup',
      demo_url: `${demoUrlBase}/popup`
    }
  },
  {
    path: 'v2_0/troubleshooting',
    component: () => import('../markdown/v2_0/troubleshooting.md'),
    meta: {
      title: '问题解答'
    }
  },
  {
    path: 'v2_0/contributing',
    component: () => import('../markdown/v2_0/contributing.md'),
    meta: {
      title: '贡献'
    }
  },
  {
    path: 'v2_0/changelog',
    component: () => import('../../CHANGELOG.md'),
    meta: {
      title: '变更记录'
    }
  }
]

v2_0 = v2_0.map((route) => {
  route.meta.version = 'v2_0'

  return route
})

export default v2_0
