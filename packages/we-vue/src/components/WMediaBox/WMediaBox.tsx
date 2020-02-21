import '@/scss/media-box.scss'

import Routeable from '@/mixins/routable'

import mixins from '@/utils/mixins'

export default mixins(
  Routeable,
  /* @vue/component */
).extend({
  name: 'w-media-box',

  props: {
    type: {
      type: String,
      default: 'appmsg',
    },
    thumb: String,
    title: String,
    description: String,
  },

  methods: {
    onClick () {
      this.$emit('click')
      this.routeLink()
    },
  },

  render () {
    const content = () => {
      if (this.type === 'appmsg') {
        return [
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb" src={this.thumb}/>
          </div>,
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title" domPropsInnerHTML={this.title}/>
            <p class="weui-media-box__desc" domPropsInnerHTML={this.description}/>
          </div>,
        ]
      } else {
        return [
          <h4 class="weui-media-box__title" domPropsInnerHTML={this.title} />,
          <p class="weui-media-box__desc" domPropsInnerHTML={this.description} />,
        ]
      }
    }

    return (
      <div
        class={{
          'weui-media-box': true,
          ['weui-media-box_' + this.type]: true,
        }}
        onClick={() => { this.onClick() }}
      >
        {content()}
        {this.type !== 'appmsg' && this.$slots.box_ft}
      </div>
    )
  },
})
