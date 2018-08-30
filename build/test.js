'use strict'

const fs = require('fs-extra')
const compiler = require('vue-sfc-compiler')
const path = require('path')
const babel = require('babel-core')

// const compilerOption = {
//   babel: {
//     extends: path.join(__dirname, '../.babelrc')
//   }
// }

const source = fs.readFileSync(path.resolve(__dirname, '../packages/actionsheet/index.vue'), 'utf-8')

let res = compiler(source, {})

fs.outputFileSync(path.resolve(__dirname, '../es/actionsheet/indexxx.js'), res.js)
fs.outputFileSync(path.resolve(__dirname, '../es/actionsheet/indexxx.css'), res.css)
