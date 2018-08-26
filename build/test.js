/**
 * 构建并发布
 */

const branch = require('git-branch')

console.log('branch:', branch.sync())
