<template>
  <a class="weui-cell" :class="{'weui-cell_access': isLink}" :href="href" v-if="to">
    <div class="weui-cell_hd">
      <slot name="icon"></slot>
    </div>
    <div class="weui-cell__bd">
      <slot name="bd"><p>{{ title }}</p></slot>
    </div>
    <div class="weui-cell__ft"><slot name="ft">{{ value }}</slot></div>
  </a>
  <div class="weui-cell" :class="{'weui-cell_access': isLink}" v-else>
    <div class="weui-cell_hd">
      <slot name="icon"></slot>
    </div>
    <div class="weui-cell__bd">
      <slot name="bd"><p>{{ title }}</p></slot>
    </div>
    <div class="weui-cell__ft"><slot name="ft">{{ value }}</slot></div>
  </div>
</template>

<script type="text/babel">
import 'weui/dist/style/weui.min.css'

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

export default {
  name: 'wv-cell',

  props: {
    title: String,
    value: String,
    label: String,
    isLink: Boolean,
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