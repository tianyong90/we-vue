const hash = require('hash-sum')
const LRU = require('lru-cache')
const hljs = require('highlight.js')

// markdown-it and plugins
const emoji = require('markdown-it-emoji')
const anchor = require('markdown-it-anchor')
const toc = require('markdown-it-table-of-contents')
const containers = require('./containers')

const md = require('markdown-it')({
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
      } catch (__) {}
    }

    return '<pre v-pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
})
  .use(emoji)
  .use(anchor, {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '#'
  })
  .use(toc, {
    includeLevel: [2, 3]
  })
  .use(containers)

const cache = LRU({ max: 1000 })

module.exports = function (src) {
  const isProd = process.env.NODE_ENV === 'production'

  const file = this.resourcePath
  const key = hash(file + src)
  const cached = cache.get(key)
  if (cached && (isProd || /\?vue/.test(this.resourceQuery))) {
    return cached
  }

  const html = md.render(src)

  const res = (
    `<template>\n` +
    `<div class="content">${html}</div>\n` +
    `</template>\n`
  )
  cache.set(key, res)
  return res
}
