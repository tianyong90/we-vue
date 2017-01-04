/**
 * 清理之前构建的组件
 */
require('shelljs/global')

var ora = require('ora')

var spinner = ora('clean lib folders')
spinner.start()
rm('-rf', './lib')
mkdir('-p', './lib')

spinner.stop()
