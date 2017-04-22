<template>
  <wv-cell class="weui-cell_swiped">
    <wv-cell slot="bd" :title="title" :value="value">
      <a slot="ft" class="weui-swiped-btn weui-swiped-btn_warn" href="javascript:">删除</a>
    </wv-cell>
  </wv-cell>
</template>

<script type="text/babel">
  import WvCell from '../cell/cell.vue'

  export default {
    name: 'wv-cell-swipe',

    components: {
      WvCell
    },

    props: {
      title: {
        type: String | Number
      },
      value: {
        type: String | Number
      },
      isLink: Boolean,
      to: String
    },

    computed: {
      href () {
        if (this.to && !this.added && this.$router) {
          const resolved = this.$router.match(this.to)
          if (!resolved.matched.length) return this.to

          this.$nextTick(() => {
            this.added = true
            this.$el.addEventListener('click', this.handleClick)
          })
          return resolved.path
        }
        return this.to
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
