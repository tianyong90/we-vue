require('shelljs/global')

var ora = require('ora')

var spinner = ora('building for examples...')
spinner.start()
rm('-rf', './lib')
mkdir('-p', './lib')
