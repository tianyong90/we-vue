const demoUrlBase = 'https://demo.wevue.org'

/* eslint-disable camelcase */
let v3 = [
  {
    path: 'v3/index',
    component: () => import('../markdown/v3/index.md'),
    meta: {
      title: '概述'
    }
  },
  {
    path: 'v3/quickstart',
    component: () => import('../markdown/v3/quickstart.md'),
    meta: {
      title: '快速上手'
    }
  },
  {
    path: 'v3/badge',
    component: () => import('../markdown/v3/badge.md'),
    meta: {
      title: 'Badge',
      demo_url: `${demoUrlBase}/badge`
    }
  },
  {
    path: 'v3/circle',
    component: () => import('../markdown/v3/circle.md'),
    meta: {
      title: 'Circle',
      demo_url: `${demoUrlBase}/circle`
    }
  },
  {
    path: 'v3/icons',
    component: () => import('../markdown/v3/icon.md'),
    meta: {
      title: 'Icons',
      demo_url: `${demoUrlBase}/icons`
    }
  },
  {
    path: 'v3/lazyload',
    component: () => import('../markdown/v3/lazyload.md'),
    meta: {
      title: 'Lazyload',
      demo_url: `${demoUrlBase}/lazyload`
    }
  },
  {
    path: 'v3/progress',
    component: () => import('../markdown/v3/progress.md'),
    meta: {
      title: 'Progress',
      demo_url: `${demoUrlBase}/progress`
    }
  },
  {
    path: 'v3/slider',
    component: () => import('../markdown/v3/slider.md'),
    meta: {
      title: 'Slider',
      demo_url: `${demoUrlBase}/slider`
    }
  },
  {
    path: 'v3/spinner',
    component: () => import('../markdown/v3/spinner.md'),
    meta: {
      title: 'Spinner',
      demo_url: `${demoUrlBase}/spinner`
    }
  },
  {
    path: 'v3/swipe',
    component: () => import('../markdown/v3/swipe.md'),
    meta: {
      title: 'Swipe',
      demo_url: `${demoUrlBase}/swipe`
    }
  },
  {
    path: 'v3/button',
    component: () => import('../markdown/v3/button.md'),
    meta: {
      title: 'Button',
      demo_url: `${demoUrlBase}/button`
    }
  },
  {
    path: 'v3/check_list',
    component: () => import('../markdown/v3/check_list.md'),
    meta: {
      title: 'CheckList',
      demo_url: `${demoUrlBase}/checklist`
    }
  },
  {
    path: 'v3/input',
    component: () => import('../markdown/v3/input.md'),
    meta: {
      title: 'Input',
      demo_url: `${demoUrlBase}/input`
    }
  },
  {
    path: 'v3/number_spinner',
    component: () => import('../markdown/v3/number_spinner.md'),
    meta: {
      title: 'NumberSpinner',
      demo_url: `${demoUrlBase}/number-spinner`
    }
  },
  {
    path: 'v3/radio',
    component: () => import('../markdown/v3/radio.md'),
    meta: {
      title: 'Radio',
      demo_url: `${demoUrlBase}/radio`
    }
  },
  {
    path: 'v3/switch',
    component: () => import('../markdown/v3/switch.md'),
    meta: {
      title: 'Switch',
      demo_url: `${demoUrlBase}/switch`
    }
  },
  {
    path: 'v3/textarea',
    component: () => import('../markdown/v3/textarea.md'),
    meta: {
      title: 'Textarea',
      demo_url: `${demoUrlBase}/textarea`
    }
  },
  {
    path: 'v3/form_preview',
    component: () => import('../markdown/v3/form_preview.md'),
    meta: {
      title: 'Preview',
      demo_url: `${demoUrlBase}/form-preview`
    }
  },
  {
    path: 'v3/action_sheet',
    component: () => import('../markdown/v3/action_sheet.md'),
    meta: {
      title: 'ActionSheet',
      demo_url: `${demoUrlBase}/actionsheet`
    }
  },
  {
    path: 'v3/area',
    component: () => import('../markdown/v3/area.md'),
    meta: {
      title: 'Area',
      demo_url: `${demoUrlBase}/area`
    }
  },
  {
    path: 'v3/dialog',
    component: () => import('../markdown/v3/dialog.md'),
    meta: {
      title: 'Dialog',
      demo_url: `${demoUrlBase}/dialog`
    }
  },
  {
    path: 'v3/infinite_scroll',
    component: () => import('../markdown/v3/infinite_scroll.md'),
    meta: {
      title: 'InfiniteScroll',
      demo_url: `${demoUrlBase}/infinite-scroll`
    }
  },
  {
    path: 'v3/toast',
    component: () => import('../markdown/v3/toast.md'),
    meta: {
      title: 'Toast',
      demo_url: `${demoUrlBase}/toast`
    }
  },
  {
    path: 'v3/top_tips',
    component: () => import('../markdown/v3/top_tips.md'),
    meta: {
      title: 'TopTips',
      demo_url: `${demoUrlBase}/top-tips`
    }
  },
  {
    path: 'v3/picker',
    component: () => import('../markdown/v3/picker.md'),
    meta: {
      title: 'Picker',
      demo_url: `${demoUrlBase}/picker`
    }
  },
  {
    path: 'v3/datetime_picker',
    component: () => import('../markdown/v3/datetime_picker.md'),
    meta: {
      title: 'DatetimePicker',
      demo_url: `${demoUrlBase}/datetime-picker`
    }
  },
  {
    path: 'v3/header',
    component: () => import('../markdown/v3/header.md'),
    meta: {
      title: 'Header',
      demo_url: `${demoUrlBase}/header`
    }
  },
  {
    path: 'v3/navbar',
    component: () => import('../markdown/v3/navbar.md'),
    meta: {
      title: 'Navbar',
      demo_url: `${demoUrlBase}/navbar`
    }
  },
  {
    path: 'v3/tabs',
    component: () => import('../markdown/v3/tabs.md'),
    meta: {
      title: 'Tabs',
      demo_url: `${demoUrlBase}/tabs`
    }
  },
  {
    path: 'v3/tabbar',
    component: () => import('../markdown/v3/tabbar.md'),
    meta: {
      title: 'Tabbar',
      demo_url: `${demoUrlBase}/tabbar`
    }
  },
  {
    path: 'v3/search-bar',
    component: () => import('../markdown/v3/search_bar.md'),
    meta: {
      title: 'SearchBar',
      demo_url: `${demoUrlBase}/search-bar`
    }
  },
  {
    path: 'v3/cell',
    component: () => import('../markdown/v3/cell.md'),
    meta: {
      title: 'Cell',
      demo_url: `${demoUrlBase}/cell`
    }
  },
  {
    path: 'v3/cell_swipe',
    component: () => import('../markdown/v3/cell_swipe.md'),
    meta: {
      title: 'CellSwipe',
      demo_url: `${demoUrlBase}/cell-swipe`
    }
  },
  {
    path: 'v3/flex',
    component: () => import('../markdown/v3/flex.md'),
    meta: {
      title: 'Flex',
      demo_url: `${demoUrlBase}/flex`
    }
  },
  {
    path: 'v3/footer',
    component: () => import('../markdown/v3/footer.md'),
    meta: {
      title: 'Footer',
      demo_url: `${demoUrlBase}/footer`
    }
  },
  {
    path: 'v3/grid',
    component: () => import('../markdown/v3/grid.md'),
    meta: {
      title: 'Grid',
      demo_url: `${demoUrlBase}/grid`
    }
  },
  {
    path: 'v3/loadmore',
    component: () => import('../markdown/v3/loadmore.md'),
    meta: {
      title: 'Loadmore',
      demo_url: `${demoUrlBase}/loadmore`
    }
  },
  {
    path: 'v3/panel',
    component: () => import('../markdown/v3/panel.md'),
    meta: {
      title: 'Panel',
      demo_url: `${demoUrlBase}/panel`
    }
  },
  {
    path: 'v3/popup',
    component: () => import('../markdown/v3/popup.md'),
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

v3 = v3.map(route => {
  route.meta.version = 'v3'

  return route
})

export default v3
