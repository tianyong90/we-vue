import Vue from 'vue'

export default Vue.extend({
  name: 'routable',

  props: {
    href: [String, Object],
    to: [String, Object],
    replace: Boolean,
  },

  methods: {
    // TODO
    // click (e: MouseEvent): void {},

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
