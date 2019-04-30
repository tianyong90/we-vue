/**
 * Build npm lib
 */
'use strict'
const shell = require('shelljs')

shell.rm('-rf', 'es5', 'lib', 'lib-temp')
shell.exec('yarn run tsc -p tsconfig.dist.json')
shell.exec('yarn run cross-env NODE_ENV=es5 babel lib-temp --out-dir es5 --source-maps -q')
shell.mv('./lib-temp/entry-lib.js', './lib-temp/index.js')
shell.exec('yarn run cross-env NODE_ENV=lib babel lib-temp --out-dir lib --source-maps -q')
