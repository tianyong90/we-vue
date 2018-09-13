/**
 * Build npm lib
 */
const shell = require('shelljs');
const Listr = require('listr')

const tasksCli = [
  'build:entry',
  'build:components',
  'build:we-vue-css',
  'build:style-entry',
  'build:we-vue'
];

const tasks = new Listr()

tasksCli.forEach(item => {
  tasks.add({
    title: item,
    task: () => shell.exec(`npm run ${item} --silent`)
  })
})

tasks.run().catch(err => {
  console.error(err)
})
