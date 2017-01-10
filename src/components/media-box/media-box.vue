<template>
  <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
    <div class="weui-media-box__hd">
      <img class="weui-media-box__thumb" :src="thumb" alt="">
    </div>
    <div class="weui-media-box__bd">
      <h4 class="weui-media-box__title" v-text="title"></h4>
      <p class="weui-media-box__desc" v-text="description"></p>
    </div>
  </a>
</div>
</template>

<script type="text/babel">
function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

export default {
  name: 'wv-media-box',

  props: {
    type: String,
    thumb: String,
    title: String,
    description: String,
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
