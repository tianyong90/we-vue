import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/index')
    },
    // {
    //   path: '/doc',
    //   name: 'doc',
    //   component: () => import('../components/doc'),
    //   redirect: '/doc/index',
    //   children: [
    //     {
    //       name: 'index',
    //       path: 'index',
    //       component: () => import('../../docs/index.md'),
    //       meta: {
    //         title: '概述'
    //       }
    //     },
    //     {
    //       name: 'quickstart',
    //       path: 'quickstart',
    //       component: () => import('../../docs/quickstart.md'),
    //       meta: {
    //         title: '快速上手'
    //       }
    //     },
    //     {
    //       name: 'badge',
    //       path: 'badge',
    //       component: () => import('../../docs/badge.md'),
    //       meta: {
    //         title: 'Badge'
    //       }
    //     },
    //     {
    //       name: 'circle',
    //       path: 'circle',
    //       component: () => import('../../docs/circle.md'),
    //       meta: {
    //         title: 'Circle'
    //       }
    //     },
    //     {
    //       name: 'icons',
    //       path: 'icons',
    //       component: () => import('../../docs/icons.md'),
    //       meta: {
    //         title: 'Icons'
    //       }
    //     },
    //     {
    //       name: 'lazyload',
    //       path: 'lazyload',
    //       component: () => import('../../docs/lazyload.md'),
    //       meta: {
    //         title: 'Lazyload'
    //       }
    //     },
    //     {
    //       name: 'progress',
    //       path: 'progress',
    //       component: () => import('../../docs/progress.md'),
    //       meta: {
    //         title: 'Progress'
    //       }
    //     },
    //     {
    //       name: 'slider',
    //       path: 'slider',
    //       component: () => import('../../docs/slider.md'),
    //       meta: {
    //         title: 'Slider'
    //       }
    //     },
    //     {
    //       name: 'spinner',
    //       path: 'spinner',
    //       component: () => import('../../docs/spinner.md'),
    //       meta: {
    //         title: 'Spinner'
    //       }
    //     },
    //     {
    //       name: 'swipe',
    //       path: 'swipe',
    //       component: () => import('../../docs/swipe.md'),
    //       meta: {
    //         title: 'Swipe'
    //       }
    //     },
    //     {
    //       name: 'button',
    //       path: 'button',
    //       component: () => import('../../docs/button.md'),
    //       meta: {
    //         title: 'Button'
    //       }
    //     },
    //     {
    //       name: 'check_list',
    //       path: 'check_list',
    //       component: () => import('../../docs/check_list.md'),
    //       meta: {
    //         title: 'CheckList'
    //       }
    //     },
    //     {
    //       name: 'input',
    //       path: 'input',
    //       component: () => import('../../docs/input.md'),
    //       meta: {
    //         title: 'Input'
    //       }
    //     },
    //     {
    //       name: 'number_spinner',
    //       path: 'number_spinner',
    //       component: () => import('../../docs/number_spinner.md'),
    //       meta: {
    //         title: 'NumberSpinner'
    //       }
    //     },
    //     {
    //       name: 'radio',
    //       path: 'radio',
    //       component: () => import('../../docs/radio.md'),
    //       meta: {
    //         title: 'Radio'
    //       }
    //     },
    //     {
    //       name: 'switch',
    //       path: 'switch',
    //       component: () => import('../../docs/switch.md'),
    //       meta: {
    //         title: 'Switch'
    //       }
    //     },
    //     {
    //       name: 'textarea',
    //       path: 'textarea',
    //       component: () => import('../../docs/textarea.md'),
    //       meta: {
    //         title: 'Textarea'
    //       }
    //     },
    //     {
    //       name: 'preview',
    //       path: 'preview',
    //       component: () => import('../../docs/preview.md'),
    //       meta: {
    //         title: 'Preview'
    //       }
    //     },
    //     {
    //       name: 'action_sheet',
    //       path: 'action_sheet',
    //       component: () => import('../../docs/action_sheet.md'),
    //       meta: {
    //         title: 'ActionSheet'
    //       }
    //     },
    //     {
    //       name: 'dialog',
    //       path: 'dialog',
    //       component: () => import('../../docs/dialog.md'),
    //       meta: {
    //         title: 'Dialog'
    //       }
    //     },
    //     {
    //       name: 'indicator',
    //       path: 'indicator',
    //       component: () => import('../../docs/indicator.md'),
    //       meta: {
    //         title: 'Indicator'
    //       }
    //     },
    //     {
    //       name: 'infinite_scroll',
    //       path: 'infinite_scroll',
    //       component: () => import('../../docs/infinite_scroll.md'),
    //       meta: {
    //         title: 'InfiniteScroll'
    //       }
    //     },
    //     {
    //       name: 'toast',
    //       path: 'toast',
    //       component: () => import('../../docs/toast.md'),
    //       meta: {
    //         title: 'Toast'
    //       }
    //     },
    //     {
    //       name: 'top_tips',
    //       path: 'top_tips',
    //       component: () => import('../../docs/top_tips.md'),
    //       meta: {
    //         title: 'TopTips'
    //       }
    //     },
    //     {
    //       name: 'picker',
    //       path: 'picker',
    //       component: () => import('../../docs/picker.md'),
    //       meta: {
    //         title: 'Picker'
    //       }
    //     },
    //     {
    //       name: 'datetime_picker',
    //       path: 'datetime_picker',
    //       component: () => import('../../docs/datetime_picker.md'),
    //       meta: {
    //         title: 'DatetimePicker'
    //       }
    //     },
    //     {
    //       name: 'header',
    //       path: 'header',
    //       component: () => import('../../docs/header.md'),
    //       meta: {
    //         title: 'Header'
    //       }
    //     },
    //     {
    //       name: 'navbar',
    //       path: 'navbar',
    //       component: () => import('../../docs/navbar.md'),
    //       meta: {
    //         title: 'Navbar'
    //       }
    //     },
    //     {
    //       name: 'tabbar',
    //       path: 'tabbar',
    //       component: () => import('../../docs/tabbar.md'),
    //       meta: {
    //         title: 'Tabbar'
    //       }
    //     },
    //     {
    //       name: 'search',
    //       path: 'search',
    //       component: () => import('../../docs/search.md'),
    //       meta: {
    //         title: 'Search'
    //       }
    //     },
    //     {
    //       name: 'cell',
    //       path: 'cell',
    //       component: () => import('../../docs/cell.md'),
    //       meta: {
    //         title: 'Cell'
    //       }
    //     },
    //     {
    //       name: 'cell_swipe',
    //       path: 'cell_swipe',
    //       component: () => import('../../docs/cell_swipe.md'),
    //       meta: {
    //         title: 'CellSwipe'
    //       }
    //     },
    //     {
    //       name: 'flex',
    //       path: 'flex',
    //       component: () => import('../../docs/flex.md'),
    //       meta: {
    //         title: 'Flex'
    //       }
    //     },
    //     {
    //       name: 'footer',
    //       path: 'footer',
    //       component: () => import('../../docs/footer.md'),
    //       meta: {
    //         title: 'Footer'
    //       }
    //     },
    //     {
    //       name: 'grid',
    //       path: 'grid',
    //       component: () => import('../../docs/grid.md'),
    //       meta: {
    //         title: 'Grid'
    //       }
    //     },
    //     {
    //       name: 'loadmore',
    //       path: 'loadmore',
    //       component: () => import('../../docs/loadmore.md'),
    //       meta: {
    //         title: 'Loadmore'
    //       }
    //     },
    //     {
    //       name: 'panel',
    //       path: 'panel',
    //       component: () => import('../../docs/panel.md'),
    //       meta: {
    //         title: 'Panel'
    //       }
    //     },
    //     {
    //       name: 'popup',
    //       path: 'popup',
    //       component: () => import('../../docs/popup.md'),
    //       meta: {
    //         title: 'Popup'
    //       }
    //     },
    //     {
    //       name: 'troubleshooting',
    //       path: 'troubleshooting',
    //       component: () => import('../../docs/troubleshooting.md'),
    //       meta: {
    //         title: '问题解答'
    //       }
    //     },
    //     {
    //       name: 'contributing',
    //       path: 'contributing',
    //       component: () => import('../../docs/contributing.md'),
    //       meta: {
    //         title: '贡献'
    //       }
    //     }
    //   ]
    // },
    {
      path: '/changelog',
      name: 'changelog',
      component: () => import('../components/changelog')
    }
  ]
})
