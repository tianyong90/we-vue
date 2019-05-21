const path = require('path')
const fs = require('fs-extra')
const matter = require('gray-matter')
const prependFile = require('prepend-file')
const changeCase = require('change-case')

const list = fs.readdirSync(path.resolve(__dirname, 'markdown/v3'))

const posts = list
  .filter(item => item.endsWith('.md'))
  .map(item => item.replace('.md', ''))

posts.forEach(post => {
  const title = changeCase.pascalCase(post.replace(/-/g, ' '))

  const frontmatterData = {
    title: title,
    keywords: `we-vue, ${post}`,
    description: '',
    demo_url: `//demo.wevue.org/${post}`
    // categories: ['2_WE-VUE 组件', '1_基础组件'],
    // sort: 1,
  }

  const mdContent = matter.stringify('', frontmatterData)

  prependFile(`markdown/v3/${post}.md`, mdContent, error => {
    console.log(error)
  })

  console.log(post, title)
})
