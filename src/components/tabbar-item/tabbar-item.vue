<template>
	<a class="weui-tabbar__item weui-bar__item_on" :href="href">
		<slot name="icon"></slot>
		<p class="weui-tabbar__label">
			<slot></slot>
		</p>
	</a>
</template>

<script type="text/babel">
import 'weui/dist/style/weui.min.css'

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

export default {
  name: 'wv-tabbar-item',

  props: {
    to: String
  },

  computed: {
    href () {
      let href

      if (this.$router && this.to) {
        const base = this.$router.history.base
        const resolved = this.$router.match(this.to)
        const fullPath = resolved.redirectedFrom || resolved.fullPath

        href = base ? cleanPath(base + fullPath) : fullPath
      } else {
        href = this.to
      }

      if (href && !this.added && this.$router) {
        this.$nextTick(() => {
          this.added = true
          this.$el.addEventListener('click', this.handleClick)
        })
      }
      return href
    }
  },

  methods: {
    handleClick ($event) {
      $event.preventDefault()

      console.log()
      this.$router.push(this.href)
    }
  }
}
</script>
