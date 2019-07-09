const postimport = require('postcss-import')
const posturl = require('postcss-url')
const autoprefixer = require('autoprefixer')

module.exports = ctx => ({
  plugins: [
    postimport(),
    posturl(),
    autoprefixer({}),
  ],
})
