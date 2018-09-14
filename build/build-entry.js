const fs = require('fs-extra')
const Components = require('./get-components')()
const uppercamelcase = require('uppercamelcase')
const path = require('path')
const version = process.env.VERSION || require('../package.json').version
const tips = '// This file is auto gererated by build/build-entry.js'

function buildWevueEntry () {
  const uninstallComponents = [
    'Lazyload',
    'InfiniteScroll'
  ]

  const importList = Components.map(name => `import ${uppercamelcase(name)} from './${name}'`)
  const exportList = Components.map(name => `${uppercamelcase(name)}`)
  const intallList = exportList.filter(name => !~uninstallComponents.indexOf(uppercamelcase(name)))

  const content = `${tips}
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

/* istanbul ignore if */
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
  fs.writeFileSync(path.join(__dirname, '../packages/index.js'), content)
}

buildWevueEntry()
