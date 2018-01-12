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
    {
      path: '/doc',
      name: 'doc',
      component: () => import('../components/doc'),
      redirect: '/doc/index',
      children: [
        {
          name: 'index',
          path: 'index',
          component: () => import('../markdown/index.md'),
          meta: {
            title: '概述'
          }
        },
        {
          name: 'quickstart',
          path: 'quickstart',
          component: () => import('../markdown/quickstart.md'),
          meta: {
            title: '快速上手'
          }
        },
        {
          name: 'badge',
          path: 'badge',
          component: () => import('../markdown/badge.md'),
          meta: {
            title: 'Badge'
          }
        },
        {
          name: 'circle',
          path: 'circle',
          component: () => import('../markdown/circle.md'),
          meta: {
            title: 'Circle'
          }
        },
        {
          name: 'icons',
          path: 'icons',
          component: () => import('../markdown/icons.md'),
          meta: {
            title: 'Icons'
          }
        },
        {
          name: 'lazyload',
          path: 'lazyload',
          component: () => import('../markdown/lazyload.md'),
          meta: {
            title: 'Lazyload'
          }
        },
        {
          name: 'progress',
          path: 'progress',
          component: () => import('../markdown/progress.md'),
          meta: {
            title: 'Progress'
          }
        },
        {
          name: 'slider',
          path: 'slider',
          component: () => import('../markdown/slider.md'),
          meta: {
            title: 'Slider'
          }
        },
        {
          name: 'spinner',
          path: 'spinner',
          component: () => import('../markdown/spinner.md'),
          meta: {
            title: 'Spinner'
          }
        },
        {
          name: 'swipe',
          path: 'swipe',
          component: () => import('../markdown/swipe.md'),
          meta: {
            title: 'Swipe'
          }
        },
        {
          name: 'button',
          path: 'button',
          component: () => import('../markdown/button.md'),
          meta: {
            title: 'Button'
          }
        },
        {
          name: 'check_list',
          path: 'check_list',
          component: () => import('../markdown/check_list.md'),
          meta: {
            title: 'CheckList'
          }
        },
        {
          name: 'input',
          path: 'input',
          component: () => import('../markdown/input.md'),
          meta: {
            title: 'Input'
          }
        },
        {
          name: 'number_spinner',
          path: 'number_spinner',
          component: () => import('../markdown/number_spinner.md'),
          meta: {
            title: 'NumberSpinner'
          }
        },
        {
          name: 'radio',
          path: 'radio',
          component: () => import('../markdown/radio.md'),
          meta: {
            title: 'Radio'
          }
        },
        {
          name: 'switch',
          path: 'switch',
          component: () => import('../markdown/switch.md'),
          meta: {
            title: 'Switch'
          }
        },
        {
          name: 'textarea',
          path: 'textarea',
          component: () => import('../markdown/textarea.md'),
          meta: {
            title: 'Textarea'
          }
        },
        {
          name: 'preview',
          path: 'preview',
          component: () => import('../markdown/preview.md'),
          meta: {
            title: 'Preview'
          }
        },
        {
          name: 'action_sheet',
          path: 'action_sheet',
          component: () => import('../markdown/action_sheet.md'),
          meta: {
            title: 'ActionSheet'
          }
        },
        {
          name: 'dialog',
          path: 'dialog',
          component: () => import('../markdown/dialog.md'),
          meta: {
            title: 'Dialog'
          }
        },
        {
          name: 'infinite_scroll',
          path: 'infinite_scroll',
          component: () => import('../markdown/infinite_scroll.md'),
          meta: {
            title: 'InfiniteScroll'
          }
        },
        {
          name: 'toast',
          path: 'toast',
          component: () => import('../markdown/toast.md'),
          meta: {
            title: 'Toast'
          }
        },
        {
          name: 'top_tips',
          path: 'top_tips',
          component: () => import('../markdown/top_tips.md'),
          meta: {
            title: 'TopTips'
          }
        },
        {
          name: 'picker',
          path: 'picker',
          component: () => import('../markdown/picker.md'),
          meta: {
            title: 'Picker'
          }
        },
        {
          name: 'datetime_picker',
          path: 'datetime_picker',
          component: () => import('../markdown/datetime_picker.md'),
          meta: {
            title: 'DatetimePicker'
          }
        },
        {
          name: 'header',
          path: 'header',
          component: () => import('../markdown/header.md'),
          meta: {
            title: 'Header'
          }
        },
        {
          name: 'navbar',
          path: 'navbar',
          component: () => import('../markdown/navbar.md'),
          meta: {
            title: 'Navbar'
          }
        },
        {
          name: 'tabbar',
          path: 'tabbar',
          component: () => import('../markdown/tabbar.md'),
          meta: {
            title: 'Tabbar'
          }
        },
        {
          name: 'search',
          path: 'search',
          component: () => import('../markdown/search.md'),
          meta: {
            title: 'Search'
          }
        },
        {
          name: 'cell',
          path: 'cell',
          component: () => import('../markdown/cell.md'),
          meta: {
            title: 'Cell'
          }
        },
        {
          name: 'cell_swipe',
          path: 'cell_swipe',
          component: () => import('../markdown/cell_swipe.md'),
          meta: {
            title: 'CellSwipe'
          }
        },
        {
          name: 'flex',
          path: 'flex',
          component: () => import('../markdown/flex.md'),
          meta: {
            title: 'Flex'
          }
        },
        {
          name: 'footer',
          path: 'footer',
          component: () => import('../markdown/footer.md'),
          meta: {
            title: 'Footer'
          }
        },
        {
          name: 'grid',
          path: 'grid',
          component: () => import('../markdown/grid.md'),
          meta: {
            title: 'Grid'
          }
        },
        {
          name: 'loadmore',
          path: 'loadmore',
          component: () => import('../markdown/loadmore.md'),
          meta: {
            title: 'Loadmore'
          }
        },
        {
          name: 'panel',
          path: 'panel',
          component: () => import('../markdown/panel.md'),
          meta: {
            title: 'Panel'
          }
        },
        {
          name: 'popup',
          path: 'popup',
          component: () => import('../markdown/popup.md'),
          meta: {
            title: 'Popup'
          }
        },
        {
          name: 'troubleshooting',
          path: 'troubleshooting',
          component: () => import('../markdown/troubleshooting.md'),
          meta: {
            title: '问题解答'
          }
        },
        {
          name: 'contributing',
          path: 'contributing',
          component: () => import('../markdown/contributing.md'),
          meta: {
            title: '贡献'
          }
        },
        {
          path: 'changelog',
          name: 'changelog',
          component: () => import('../../CHANGELOG.md')
        }
      ]
    }
  ]
})
