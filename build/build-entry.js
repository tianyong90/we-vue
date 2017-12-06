const Components = require('../components.json')
const fs = require('fs')
const render = require('json-templater/string')
const uppercamelcase = require('uppercamelcase')
const path = require('path')

const OUTPUT_PATH = path.join(__dirname, '../src/index.js')
const IMPORT_TEMPLATE = 'import {{name}} from \'./components/{{package}}/index\''
const ISNTALL_COMPONENT_TEMPLATE = '  Vue.component({{name}}.name, {{name}})'
const MAIN_TEMPLATE = `{{include}}
import 'weui/dist/style/weui.min.css'

const version = '{{version}}'
const install = function (Vue, config = {}) {
  if (install.installed) return

{{install}}
  Vue.use(InfiniteScroll)
  Vue.use(Lazyload, {
    loading: require('./assets/loading-spin.svg'),
    attempt: 3,
    ...config.lazyload
  })

  Vue.$dialog = Vue.prototype.$dialog = Dialog
  Vue.$toast = Vue.prototype.$toast = Toast
  Vue.$indicator = Vue.prototype.$indicator = Indicator
  Vue.$toptips = Vue.prototype.$toptips = TopTips
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  version,
{{list}}
}
`

const ComponentNames = Object.keys(Components)

let includeComponentTemplate = []
let installTemplate = []
let listTemplate = []

ComponentNames.forEach(name => {
  let componentName = uppercamelcase(name)

  includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
    name: componentName,
    package: name
  }))

  if ([
    // directives
    'InfiniteScroll',
    'Lazyload',

    // services
    'Dialog',
    'Toast',
    'Indicator',
    'TopTips'
  ].indexOf(componentName) === -1) {
    installTemplate.push(render(ISNTALL_COMPONENT_TEMPLATE, {
      name: componentName,
      component: name
    }))
  }

  listTemplate.push(`  ${componentName}`)
})

let template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join('\n'),
  install: installTemplate.join('\n'),
  version: process.env.VERSION || require('../package.json').version,
  list: listTemplate.join(',\n')
})

fs.writeFileSync(OUTPUT_PATH, template)
console.log('[build entry] DONE:', OUTPUT_PATH)
