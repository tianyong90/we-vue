<template>
  <div>
  </div>
</template>

<script type="text/babel">
import 'weui/dist/style/weui.min.css'

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

export default {
  name: 'vui-input',

  props: {
    title: String,
    value: String,
    label: String,
    isLink: Boolean,
    to: String
  },

  computed: {
  },

  methods: {
    handleClick ($event) {
      $event.preventDefault()
      this.$router.push(this.href)
    }
  }
}
</script>