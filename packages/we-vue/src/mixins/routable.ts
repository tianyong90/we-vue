import Vue from 'vue'

export default Vue.extend({
  name: 'routable',

  props: {
    href: String,
    replace: Boolean,
    to: [String, Object],
  },

  methods: {
    routeLink () {
      const { to, href, $router, replace } = this as any
      if (to && $router) {
        $router[replace ? 'replace' : 'push'](to)
      } else if (href) {
        replace ? location.replace(href) : location.href = href
      }
    },
  },
})
