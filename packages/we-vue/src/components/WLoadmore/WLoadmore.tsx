import Vue from 'vue'
import '../../scss/loadmore.scss'

import WVSpinner from '../WSpinner'

export default Vue.extend({
  name: 'w-loadmore',

  props: {
    type: {
      type: String,
      default: 'default',
    },
    text: {
      type: String,
      default: '正在加载',
    },
  },

  render (h) {
    return (
      <div
        class={{
          'weui-loadmore': true,
          'weui-loadmore_line': (this.type === 'line' || this.type === 'lineDot'),
          'weui-loadmore_dot': this.type === 'lineDot' }}
      >
        { this.type === 'default' ? <WVSpinner type="default" /> : h() }
        <span class="weui-loadmore__tips" domPropsTextContent={this.type === 'lineDot' ? '' : this.text} />
      </div>
    )
  },
})
