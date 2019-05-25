const path = require('path')
const fs = require('fs-extra')
const matter = require('gray-matter')
// const changeCase = require('change-case')
const _ = require('lodash')

const list = fs.readdirSync(path.resolve(__dirname, 'markdown/v2'))

const posts = list.filter(item => item.endsWith('.md')).map(item => item.replace('.md', ''))

let jsonData = posts.map(post => {
  // const title = changeCase.pascalCase(post.replace(/-/g, ' '))

  const frontmatterData = matter.read(`./markdown/v2/${post}.md`)

  return {
    file: post,
    ...frontmatterData.data,
  }
})

jsonData = _.groupBy(jsonData, item => {
  // console.log(item.categories['0'])
  return item.categories[0]
})

jsonData['2_WE-VUE 组件'] = _.groupBy(jsonData['2_WE-VUE 组件'], item => {
  return item.categories[1]
})

// jsonData = _.orderBy(jsonData)

// 写入 json
fs.writeJson('./test.json', jsonData, {
  spaces: 2,
})
