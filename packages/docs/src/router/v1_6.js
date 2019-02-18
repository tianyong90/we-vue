const demoUrlBase = 'https://demo.wevue.org'

/* eslint-disable camelcase */
let v1_6 = [
  {
    path: 'v1_6/index',
    component: () => import('../markdown/v1_6/index.md'),
    meta: {
      title: '概述'
    }
  },
  {
    path: 'v1_6/quickstart',
    component: () => import('../markdown/v1_6/quickstart.md'),
    meta: {
      title: '快速上手'
    }
  },
  {
    path: 'v1_6/badge',
    component: () => import('../markdown/v1_6/badge.md'),
    meta: {
      title: 'Badge',
      demo_url: `${demoUrlBase}/badge`
    }
  },
  {
    path: 'v1_6/circle',
    component: () => import('../markdown/v1_6/circle.md'),
    meta: {
      title: 'Circle',
      demo_url: `${demoUrlBase}/circle`
    }
  },
  {
    path: 'v1_6/icons',
    component: () => import('../markdown/v1_6/icon.md'),
    meta: {
      title: 'Icons',
      demo_url: `${demoUrlBase}/icons`
    }
  },
  {
    path: 'v1_6/lazyload',
    component: () => import('../markdown/v1_6/lazyload.md'),
    meta: {
      title: 'Lazyload',
      demo_url: `${demoUrlBase}/lazyload`
    }
  },
  {
    path: 'v1_6/progress',
    component: () => import('../markdown/v1_6/progress.md'),
    meta: {
      title: 'Progress',
      demo_url: `${demoUrlBase}/progress`
    }
  },
  {
    path: 'v1_6/slider',
    component: () => import('../markdown/v1_6/slider.md'),
    meta: {
      title: 'Slider',
      demo_url: `${demoUrlBase}/slider`
    }
  },
  {
    path: 'v1_6/spinner',
    component: () => import('../markdown/v1_6/spinner.md'),
    meta: {
      title: 'Spinner',
      demo_url: `${demoUrlBase}/spinner`
    }
  },
  {
    path: 'v1_6/swipe',
    component: () => import('../markdown/v1_6/swipe.md'),
    meta: {
      title: 'Swipe',
      demo_url: `${demoUrlBase}/swipe`
    }
  },
  {
    path: 'v1_6/button',
    component: () => import('../markdown/v1_6/button.md'),
    meta: {
      title: 'Button',
      demo_url: `${demoUrlBase}/button`
    }
  },
  {
    path: 'v1_6/check_list',
    component: () => import('../markdown/v1_6/check_list.md'),
    meta: {
      title: 'CheckList',
      demo_url: `${demoUrlBase}/checklist`
    }
  },
  {
    path: 'v1_6/input',
    component: () => import('../markdown/v1_6/input.md'),
    meta: {
      title: 'Input',
      demo_url: `${demoUrlBase}/input`
    }
  },
  {
    path: 'v1_6/number_spinner',
    component: () => import('../markdown/v1_6/number_spinner.md'),
    meta: {
      title: 'NumberSpinner',
      demo_url: `${demoUrlBase}/number-spinner`
    }
  },
  {
    path: 'v1_6/radio',
    component: () => import('../markdown/v1_6/radio.md'),
    meta: {
      title: 'Radio',
      demo_url: `${demoUrlBase}/radio`
    }
  },
  {
    path: 'v1_6/switch',
    component: () => import('../markdown/v1_6/switch.md'),
    meta: {
      title: 'Switch',
      demo_url: `${demoUrlBase}/switch`
    }
  },
  {
    path: 'v1_6/textarea',
    component: () => import('../markdown/v1_6/textarea.md'),
    meta: {
      title: 'Textarea',
      demo_url: `${demoUrlBase}/textarea`
    }
  },
  {
    path: 'v1_6/preview',
    component: () => import('../markdown/v1_6/preview.md'),
    meta: {
      title: 'Preview',
      demo_url: `${demoUrlBase}/preview`
    }
  },
  {
    path: 'v1_6/action_sheet',
    component: () => import('../markdown/v1_6/action_sheet.md'),
    meta: {
      title: 'ActionSheet',
      demo_url: `${demoUrlBase}/actionsheet`
    }
  },
  {
    path: 'v1_6/dialog',
    component: () => import('../markdown/v1_6/dialog.md'),
    meta: {
      title: 'Dialog',
      demo_url: `${demoUrlBase}/dialog`
    }
  },
  {
    path: 'v1_6/infinite_scroll',
    component: () => import('../markdown/v1_6/infinite_scroll.md'),
    meta: {
      title: 'InfiniteScroll',
      demo_url: `${demoUrlBase}/infinite-scroll`
    }
  },
  {
    path: 'v1_6/toast',
    component: () => import('../markdown/v1_6/toast.md'),
    meta: {
      title: 'Toast',
      demo_url: `${demoUrlBase}/toast`
    }
  },
  {
    path: 'v1_6/top_tips',
    component: () => import('../markdown/v1_6/top_tips.md'),
    meta: {
      title: 'TopTips',
      demo_url: `${demoUrlBase}/top-tips`
    }
  },
  {
    path: 'v1_6/picker',
    component: () => import('../markdown/v1_6/picker.md'),
    meta: {
      title: 'Picker',
      demo_url: `${demoUrlBase}/picker`
    }
  },
  {
    path: 'v1_6/datetime_picker',
    component: () => import('../markdown/v1_6/datetime_picker.md'),
    meta: {
      title: 'DatetimePicker',
      demo_url: `${demoUrlBase}/datetime-picker`
    }
  },
  {
    path: 'v1_6/header',
    component: () => import('../markdown/v1_6/header.md'),
    meta: {
      title: 'Header',
      demo_url: `${demoUrlBase}/header`
    }
  },
  {
    path: 'v1_6/navbar',
    component: () => import('../markdown/v1_6/navbar.md'),
    meta: {
      title: 'Navbar',
      demo_url: `${demoUrlBase}/navbar`
    }
  },
  {
    path: 'v1_6/tabbar',
    component: () => import('../markdown/v1_6/tabbar.md'),
    meta: {
      title: 'Tabbar',
      demo_url: `${demoUrlBase}/tabbar`
    }
  },
  {
    path: 'v1_6/search',
    component: () => import('../markdown/v1_6/search.md'),
    meta: {
      title: 'Search',
      demo_url: `${demoUrlBase}/search-bar`
    }
  },
  {
    path: 'v1_6/cell',
    component: () => import('../markdown/v1_6/cell.md'),
    meta: {
      title: 'Cell',
      demo_url: `${demoUrlBase}/cell`
    }
  },
  {
    path: 'v1_6/cell_swipe',
    component: () => import('../markdown/v1_6/cell_swipe.md'),
    meta: {
      title: 'CellSwipe',
      demo_url: `${demoUrlBase}/cell-swipe`
    }
  },
  {
    path: 'v1_6/flex',
    component: () => import('../markdown/v1_6/flex.md'),
    meta: {
      title: 'Flex',
      demo_url: `${demoUrlBase}/flex`
    }
  },
  {
    path: 'v1_6/footer',
    component: () => import('../markdown/v1_6/footer.md'),
    meta: {
      title: 'Footer',
      demo_url: `${demoUrlBase}/footer`
    }
  },
  {
    path: 'v1_6/grid',
    component: () => import('../markdown/v1_6/grid.md'),
    meta: {
      title: 'Grid',
      demo_url: `${demoUrlBase}/grid`
    }
  },
  {
    path: 'v1_6/loadmore',
    component: () => import('../markdown/v1_6/loadmore.md'),
    meta: {
      title: 'Loadmore',
      demo_url: `${demoUrlBase}/loadmore`
    }
  },
  {
    path: 'v1_6/panel',
    component: () => import('../markdown/v1_6/panel.md'),
    meta: {
      title: 'Panel',
      demo_url: `${demoUrlBase}/panel`
    }
  },
  {
    path: 'v1_6/popup',
    component: () => import('../markdown/v1_6/popup.md'),
    meta: {
      title: 'Popup',
      demo_url: `${demoUrlBase}/popup`
    }
  },
  {
    path: 'troubleshooting',
    component: () => import('../markdown/troubleshooting.md'),
    meta: {
      title: '问题解答'
    }
  },
  {
    path: 'contributing',
    component: () => import('../markdown/contributing.md'),
    meta: {
      title: '贡献'
    }
  },
  // TODO
  // {
  //   path: 'changelog',
  //   component: () => import('PROJECT_ROOT/CHANGELOG.md'),
  //   meta: {
  //     title: '变更记录'
  //   }
  // }
]

v1_6 = v1_6.map(route => {
  route.meta.version = 'v1_6'

  return route
})

export default v1_6
