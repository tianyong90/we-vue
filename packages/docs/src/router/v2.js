const demoUrlBase = 'https://demo.wevue.org'

/* eslint-disable camelcase */
let v2 = [
  {
    path: 'v2/index',
    component: () => import('../markdown/v2/index.md'),
    meta: {
      title: '概述'
    }
  },
  {
    path: 'v2/quickstart',
    component: () => import('../markdown/v2/quickstart.md'),
    meta: {
      title: '快速上手'
    }
  },
  {
    path: 'v2/badge',
    component: () => import('../markdown/v2/badge.md'),
    meta: {
      title: 'Badge',
      demo_url: `${demoUrlBase}/badge`
    }
  },
  {
    path: 'v2/circle',
    component: () => import('../markdown/v2/circle.md'),
    meta: {
      title: 'Circle',
      demo_url: `${demoUrlBase}/circle`
    }
  },
  {
    path: 'v2/icons',
    component: () => import('../markdown/v2/icon.md'),
    meta: {
      title: 'Icons',
      demo_url: `${demoUrlBase}/icons`
    }
  },
  {
    path: 'v2/lazyload',
    component: () => import('../markdown/v2/lazyload.md'),
    meta: {
      title: 'Lazyload',
      demo_url: `${demoUrlBase}/lazyload`
    }
  },
  {
    path: 'v2/progress',
    component: () => import('../markdown/v2/progress.md'),
    meta: {
      title: 'Progress',
      demo_url: `${demoUrlBase}/progress`
    }
  },
  {
    path: 'v2/slider',
    component: () => import('../markdown/v2/slider.md'),
    meta: {
      title: 'Slider',
      demo_url: `${demoUrlBase}/slider`
    }
  },
  {
    path: 'v2/spinner',
    component: () => import('../markdown/v2/spinner.md'),
    meta: {
      title: 'Spinner',
      demo_url: `${demoUrlBase}/spinner`
    }
  },
  {
    path: 'v2/swipe',
    component: () => import('../markdown/v2/swipe.md'),
    meta: {
      title: 'Swipe',
      demo_url: `${demoUrlBase}/swipe`
    }
  },
  {
    path: 'v2/button',
    component: () => import('../markdown/v2/button.md'),
    meta: {
      title: 'Button',
      demo_url: `${demoUrlBase}/button`
    }
  },
  {
    path: 'v2/check_list',
    component: () => import('../markdown/v2/check_list.md'),
    meta: {
      title: 'CheckList',
      demo_url: `${demoUrlBase}/checklist`
    }
  },
  {
    path: 'v2/input',
    component: () => import('../markdown/v2/input.md'),
    meta: {
      title: 'Input',
      demo_url: `${demoUrlBase}/input`
    }
  },
  {
    path: 'v2/number_spinner',
    component: () => import('../markdown/v2/number_spinner.md'),
    meta: {
      title: 'NumberSpinner',
      demo_url: `${demoUrlBase}/number-spinner`
    }
  },
  {
    path: 'v2/radio',
    component: () => import('../markdown/v2/radio.md'),
    meta: {
      title: 'Radio',
      demo_url: `${demoUrlBase}/radio`
    }
  },
  {
    path: 'v2/switch',
    component: () => import('../markdown/v2/switch.md'),
    meta: {
      title: 'Switch',
      demo_url: `${demoUrlBase}/switch`
    }
  },
  {
    path: 'v2/textarea',
    component: () => import('../markdown/v2/textarea.md'),
    meta: {
      title: 'Textarea',
      demo_url: `${demoUrlBase}/textarea`
    }
  },
  {
    path: 'v2/form_preview',
    component: () => import('../markdown/v2/form_preview.md'),
    meta: {
      title: 'Preview',
      demo_url: `${demoUrlBase}/form-preview`
    }
  },
  {
    path: 'v2/action_sheet',
    component: () => import('../markdown/v2/action_sheet.md'),
    meta: {
      title: 'ActionSheet',
      demo_url: `${demoUrlBase}/actionsheet`
    }
  },
  {
    path: 'v2/dialog',
    component: () => import('../markdown/v2/dialog.md'),
    meta: {
      title: 'Dialog',
      demo_url: `${demoUrlBase}/dialog`
    }
  },
  {
    path: 'v2/infinite_scroll',
    component: () => import('../markdown/v2/infinite_scroll.md'),
    meta: {
      title: 'InfiniteScroll',
      demo_url: `${demoUrlBase}/infinite-scroll`
    }
  },
  {
    path: 'v2/toast',
    component: () => import('../markdown/v2/toast.md'),
    meta: {
      title: 'Toast',
      demo_url: `${demoUrlBase}/toast`
    }
  },
  {
    path: 'v2/top_tips',
    component: () => import('../markdown/v2/top_tips.md'),
    meta: {
      title: 'TopTips',
      demo_url: `${demoUrlBase}/top-tips`
    }
  },
  {
    path: 'v2/picker',
    component: () => import('../markdown/v2/picker.md'),
    meta: {
      title: 'Picker',
      demo_url: `${demoUrlBase}/picker`
    }
  },
  {
    path: 'v2/datetime_picker',
    component: () => import('../markdown/v2/datetime_picker.md'),
    meta: {
      title: 'DatetimePicker',
      demo_url: `${demoUrlBase}/datetime-picker`
    }
  },
  {
    path: 'v2/header',
    component: () => import('../markdown/v2/header.md'),
    meta: {
      title: 'Header',
      demo_url: `${demoUrlBase}/header`
    }
  },
  {
    path: 'v2/navbar',
    component: () => import('../markdown/v2/navbar.md'),
    meta: {
      title: 'Navbar',
      demo_url: `${demoUrlBase}/navbar`
    }
  },
  {
    path: 'v2/tabs',
    component: () => import('../markdown/v2/tabs.md'),
    meta: {
      title: 'Tabs',
      demo_url: `${demoUrlBase}/tabs`
    }
  },
  {
    path: 'v2/tabbar',
    component: () => import('../markdown/v2/tabbar.md'),
    meta: {
      title: 'Tabbar',
      demo_url: `${demoUrlBase}/tabbar`
    }
  },
  {
    path: 'v2/search-bar',
    component: () => import('../markdown/v2/search_bar.md'),
    meta: {
      title: 'SearchBar',
      demo_url: `${demoUrlBase}/search-bar`
    }
  },
  {
    path: 'v2/cell',
    component: () => import('../markdown/v2/cell.md'),
    meta: {
      title: 'Cell',
      demo_url: `${demoUrlBase}/cell`
    }
  },
  {
    path: 'v2/cell_swipe',
    component: () => import('../markdown/v2/cell_swipe.md'),
    meta: {
      title: 'CellSwipe',
      demo_url: `${demoUrlBase}/cell-swipe`
    }
  },
  {
    path: 'v2/flex',
    component: () => import('../markdown/v2/flex.md'),
    meta: {
      title: 'Flex',
      demo_url: `${demoUrlBase}/flex`
    }
  },
  {
    path: 'v2/footer',
    component: () => import('../markdown/v2/footer.md'),
    meta: {
      title: 'Footer',
      demo_url: `${demoUrlBase}/footer`
    }
  },
  {
    path: 'v2/grid',
    component: () => import('../markdown/v2/grid.md'),
    meta: {
      title: 'Grid',
      demo_url: `${demoUrlBase}/grid`
    }
  },
  {
    path: 'v2/loadmore',
    component: () => import('../markdown/v2/loadmore.md'),
    meta: {
      title: 'Loadmore',
      demo_url: `${demoUrlBase}/loadmore`
    }
  },
  {
    path: 'v2/panel',
    component: () => import('../markdown/v2/panel.md'),
    meta: {
      title: 'Panel',
      demo_url: `${demoUrlBase}/panel`
    }
  },
  {
    path: 'v2/popup',
    component: () => import('../markdown/v2/popup.md'),
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
  {
    path: 'changelog',
    component: () => import('../../../../CHANGELOG.md'),
    meta: {
      title: '变更记录'
    }
  }
]

v2 = v2.map(route => {
  route.meta.version = 'v2'

  return route
})

export default v2
