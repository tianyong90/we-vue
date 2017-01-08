<template>
	<a :href="href" class="weui-grid">
		<div class="weui-grid__icon">
			<slot name="icon"></slot>
		</div>
		<p class="weui-grid__label"><slot></slot></p>
	</a>
</template>

<script type="text/babel">
function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

export default {
  name: 'wv-grid-item',

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
      this.$router.push(this.href)
    }
  }
}
</script>
