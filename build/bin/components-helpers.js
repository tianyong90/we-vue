const fs = require('fs')
const path = require('path')

function getComponents () {
  const dirs = fs.readdirSync(path.resolve(__dirname, '../../src/components'))
  const excludes = ['.DS_Store']
  return dirs.filter(dirName => excludes.indexOf(dirName) === -1)
}

function getComponentsEntry () {
  const dirs = getComponents()

  let entry = {}
  dirs.forEach((dir) => {
    entry[dir] = `./src/components/${dir}/`
  })
  return entry
}

module.exports = {
  getComponents,
  getComponentsEntry
}
