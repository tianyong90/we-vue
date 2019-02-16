import Vue from 'vue'

import WvVue, {
  WvBadge,
  WvButton,
  directives,
} from 'we-vue/lib'

WvVue.install(Vue, {
  components: {
    WvBadge,
    WvButton,
  },
  directives,
})
