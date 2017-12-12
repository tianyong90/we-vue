const Components = require('./get-components')()
const fs = require('fs')
const uppercamelcase = require('uppercamelcase')
const path = require('path')
const version = process.env.VERSION || require('../../package.json').version
const tips = '// This file is auto gererated by build/bin/build-entry.js'

function buildWevueEntry () {
  const uninstallComponents = [
    'Lazyload',
    'InfiniteScroll',
    'Dialog',
    'Toast',
    'Indicator',
    'TopTips'
  ]

  const importList = Components.map(name => `import ${uppercamelcase(name)} from './components/${name}'`)
  const exportList = Components.map(name => `${uppercamelcase(name)}`)
  const intallList = exportList.filter(name => !~uninstallComponents.indexOf(uppercamelcase(name)))

  const content = `${tips}
import 'weui/dist/style/weui.min.css'
${importList.join('\n')}

const version = '${version}'
const components = [
  ${intallList.join(',\n  ')}
]

const install = Vue => {
  components.forEach(Component => {
    Vue.use(Component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  version,
  ${exportList.join(',\n  ')}
}

export default {
  install,
  version
}
`
  const OUTPUT_PATH = path.join(__dirname, '../../src/index.js')

  fs.writeFileSync(OUTPUT_PATH, content)
  console.log('[build entry] DONE:', OUTPUT_PATH)
}

buildWevueEntry()

// const OUTPUT_PATH = path.join(__dirname, '../src/index.js')
// const IMPORT_TEMPLATE = 'import {{name}} from \'./components/{{package}}/index\''
// const ISNTALL_COMPONENT_TEMPLATE = '  Vue.component({{name}}.name, {{name}})'
// const MAIN_TEMPLATE = `{{include}}
// import 'weui/dist/style/weui.min.css'
//
// const version = '{{version}}'
// const install = function (Vue, config = {}) {
//   if (install.installed) return
//
// {{install}}
//   Vue.use(InfiniteScroll)
//   Vue.use(Lazyload, {
//     loading: require('./assets/loading-spin.svg'),
//     attempt: 3,
//     ...config.lazyload
//   })
//
//   Vue.$dialog = Vue.prototype.$dialog = Dialog
//   Vue.$toast = Vue.prototype.$toast = Toast
//   Vue.$indicator = Vue.prototype.$indicator = Indicator
//   Vue.$toptips = Vue.prototype.$toptips = TopTips
// }
//
// // auto install
// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue)
// }
//
// export default {
//   install,
//   version,
// {{list}}
// }
// `
//
// const ComponentNames = Object.keys(Components)
//
// let includeComponentTemplate = []
// let installTemplate = []
// let listTemplate = []
//
// ComponentNames.forEach(name => {
//   let componentName = uppercamelcase(name)
//
//   includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
//     name: componentName,
//     package: name
//   }))
//
//   if ([
//       // directives
//       'InfiniteScroll',
//       'Lazyload',
//
//       // services
//       'Dialog',
//       'Toast',
//       'Indicator',
//       'TopTips'
//     ].indexOf(componentName) === -1) {
//     installTemplate.push(render(ISNTALL_COMPONENT_TEMPLATE, {
//       name: componentName,
//       component: name
//     }))
//   }
//
//   listTemplate.push(`  ${componentName}`)
// })
//
// let template = render(MAIN_TEMPLATE, {
//   include: includeComponentTemplate.join('\n'),
//   install: installTemplate.join('\n'),
//   version: process.env.VERSION || require('../package.json').version,
//   list: listTemplate.join(',\n')
// })
//
// fs.writeFileSync(OUTPUT_PATH, template)
// console.log('[build entry] DONE:', OUTPUT_PATH)
