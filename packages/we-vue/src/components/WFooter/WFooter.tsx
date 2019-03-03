import Vue from 'vue'
import '../../scss/footer.scss'
import WFooterLink from './WFooterLink'
import { PropValidator } from 'vue/types/options'

export default Vue.extend({
  name: 'w-footer',

  props: {
    text: String,
    links: {
      type: Array,
      default: () => [],
    } as PropValidator<Array<any>>,
  },

  render (h) {
    const footerLinks = this.links.map(item => (
      <WFooterLink
        key={item.text}
        text={item.text}
        to={item.link}
      />
    ))

    return (
      <div class="weui-footer">
        {this.links.length > 0 &&
          <p class="weui-footer__links">
            {footerLinks}
          </p>}
        <p class="weui-footer__text" domPropsInnerHTML={this.text} />
      </div>
    )
  },
})
